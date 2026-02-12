import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@phoenix-jpn/db';
import { requireAuth } from '@/lib/auth-middleware';
import { serializeBigInt } from '@/lib/prisma-utils';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

function calculateTotals(items: any[], membershipPaidAmount: number) {
  const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;
  const grandTotal = total - membershipPaidAmount;

  return {
    subtotal,
    tax,
    total,
    membershipPaidAmount,
    grandTotal: Math.max(0, grandTotal),
  };
}

export async function POST(request: NextRequest, props: { params: Promise<{ customerId: string }> }) {
  const params = await props.params;
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { customerId } = params;
    const data = await request.json();

    // 顧客を取得
    const customer = await prisma.customer.findUnique({
      where: { id: BigInt(customerId) },
      include: {
        memberships: true,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: '案件が見つかりません' },
        { status: 404 }
      );
    }

    const membershipPaidAmount = customer.memberships.reduce(
      (sum: number, m: any) => sum + (m.paymentAmount || 0),
      0,
    );

    const totals = calculateTotals(data.items || [], membershipPaidAmount);

    // enum型の値を検証・変換
    const validCremationProcessTypes = ['FAMILY', 'NEIGHBORHOOD', 'COMPANY'] as const;
    const cremationProcessType = data.cremationProcessType && validCremationProcessTypes.includes(data.cremationProcessType as any)
      ? data.cremationProcessType
      : null;

    const validAltarPlaceTypes = ['HOME', 'FUNERAL_HALL'] as const;
    const altarPlaceType = data.altarPlaceType && validAltarPlaceTypes.includes(data.altarPlaceType as any)
      ? data.altarPlaceType
      : null;

    const invoice = await prisma.invoice.create({
      data: {
        customerId: BigInt(customerId),
        docNo: data.docNo || null,
        status: data.status || 'DRAFT',
        subtotal: totals.subtotal,
        tax: totals.tax,
        total: totals.total,
        membershipPaidAmount,
        grandTotal: totals.grandTotal,
        fromEstimateId: data.fromEstimateId ? BigInt(data.fromEstimateId) : null,
        cremationProcessType,
        altarPlaceType,
        ceilingHeight: data.ceilingHeight || null,
        estimateStaff: data.estimateStaff || null,
        ceremonyStaff: data.ceremonyStaff || null,
        transportStaff: data.transportStaff || null,
        decorationStaff: data.decorationStaff || null,
        returnStaff: data.returnStaff || null,
        issuedAt: data.issuedAt ? new Date(data.issuedAt) : null,
        items: {
          create: (data.items || []).map((item: any, index: number) => ({
            productItemId: item.productItemId ? BigInt(item.productItemId) : null,
            productVariantId: item.productVariantId ? BigInt(item.productVariantId) : null,
            description: item.description,
            unitPriceGeneral: item.unitPriceGeneral || 0,
            unitPriceMember: item.unitPriceMember || 0,
            qty: item.qty || 0,
            amount: item.amount || 0,
            sortNo: item.sortNo ?? index,
          })),
        },
      },
      include: {
        customer: true,
        items: true,
      },
    });

    // レスポンスを返す
    return NextResponse.json(serializeBigInt({
      ...invoice,
      id: invoice.id.toString(),
      customerId: invoice.customerId.toString(),
      fromEstimateId: invoice.fromEstimateId?.toString(),
    }));
  } catch (error: any) {
    console.error('Create invoice error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
