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

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ customerId: string; estimateId: string }> }
) {
  const params = await props.params;
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { customerId, estimateId } = params;

    // 見積を取得
    const estimate = await prisma.estimate.findUnique({
      where: { id: BigInt(estimateId) },
      include: {
        customer: {
          include: {
            memberships: true,
          },
        },
        items: {
          include: {
            productItem: true,
            productVariant: true,
          },
        },
      },
    });

    if (!estimate) {
      return NextResponse.json(
        { error: '見積が見つかりません' },
        { status: 404 }
      );
    }

    if (estimate.customerId.toString() !== customerId) {
      return NextResponse.json(
        { error: '案件IDが一致しません' },
        { status: 400 }
      );
    }

    const membershipPaidAmount = estimate.customer.memberships.reduce(
      (sum: number, m: any) => sum + (m.paymentAmount || 0),
      0,
    );

    const totals = calculateTotals(estimate.items, membershipPaidAmount);

    const invoice = await prisma.invoice.create({
      data: {
        customerId: estimate.customerId,
        docNo: null, // 請求番号は後で設定
        status: 'DRAFT',
        subtotal: totals.subtotal,
        tax: totals.tax,
        total: totals.total,
        membershipPaidAmount,
        grandTotal: totals.grandTotal,
        fromEstimateId: BigInt(estimateId),
        cremationProcessType: estimate.cremationProcessType,
        altarPlaceType: estimate.altarPlaceType,
        ceilingHeight: estimate.ceilingHeight,
        estimateStaff: estimate.estimateStaff,
        ceremonyStaff: estimate.ceremonyStaff,
        transportStaff: estimate.transportStaff,
        decorationStaff: estimate.decorationStaff,
        returnStaff: estimate.returnStaff,
        items: {
          create: estimate.items.map((item: any, index: number) => ({
            productItemId: item.productItemId,
            productVariantId: item.productVariantId,
            description: item.description,
            unitPriceGeneral: item.unitPriceGeneral,
            unitPriceMember: item.unitPriceMember,
            qty: item.qty,
            amount: item.amount,
            sortNo: item.sortNo,
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
    console.error('Create invoice from estimate error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
