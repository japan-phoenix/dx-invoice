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

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = params;

    // 請求書を取得
    const invoice = await prisma.invoice.findUnique({
      where: { id: BigInt(id) },
      include: {
        customer: {
          include: {
            memberships: {
              orderBy: { rowNo: 'asc' },
            },
          },
        },
        items: {
          include: {
            productItem: true,
            productVariant: true,
          },
          orderBy: { sortNo: 'asc' },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json(
        { error: '請求書が見つかりません' },
        { status: 404 }
      );
    }

    // 会費入金額を計算
    const membershipPaidAmount = invoice.customer.memberships.reduce(
      (sum: number, m: any) => sum + (m.paymentAmount || 0),
      0,
    );

    // レスポンスを返す
    return NextResponse.json(serializeBigInt({
      ...invoice,
      id: invoice.id.toString(),
      customerId: invoice.customerId.toString(),
      fromEstimateId: invoice.fromEstimateId?.toString(),
      customer: {
        ...invoice.customer,
        id: invoice.customer.id.toString(),
        memberships: invoice.customer.memberships.map((m: any) => ({
          ...m,
          id: m.id.toString(),
          customerId: m.customerId.toString(),
        })),
      },
      membershipPaidAmount,
      items: invoice.items.map((item: any) => ({
        ...item,
        id: item.id.toString(),
        invoiceId: item.invoiceId.toString(),
        productItemId: item.productItemId?.toString(),
        productVariantId: item.productVariantId?.toString(),
      })),
    }));
  } catch (error: any) {
    console.error('Get invoice error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = params;
    const data = await request.json();

    // 請求書を取得
    const invoice = await prisma.invoice.findUnique({
      where: { id: BigInt(id) },
      include: {
        customer: {
          include: {
            memberships: true,
          },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json(
        { error: '請求書が見つかりません' },
        { status: 404 }
      );
    }

    const membershipPaidAmount = invoice.customer.memberships.reduce(
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

    await prisma.invoiceItem.deleteMany({
      where: { invoiceId: BigInt(id) },
    });

    const updated = await prisma.invoice.update({
      where: { id: BigInt(id) },
      data: {
        docNo: data.docNo || null,
        status: data.status,
        subtotal: totals.subtotal,
        tax: totals.tax,
        total: totals.total,
        membershipPaidAmount,
        grandTotal: totals.grandTotal,
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
      ...updated,
      id: updated.id.toString(),
      customerId: updated.customerId.toString(),
      fromEstimateId: updated.fromEstimateId?.toString(),
    }));
  } catch (error: any) {
    console.error('Update invoice error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
