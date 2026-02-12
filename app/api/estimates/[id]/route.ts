import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@phoenix-jpn/db';
import { requireAuth } from '@/lib/auth-middleware';
import { serializeBigInt } from '@/lib/prisma-utils';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

function calculateTotals(items: any[], membershipPaidAmount: number) {
  const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const tax = Math.round(subtotal * 0.1); // 10% 四捨五入
  const total = subtotal + tax;
  const grandTotal = total - membershipPaidAmount;

  return {
    subtotal,
    tax,
    total,
    membershipPaidAmount,
    grandTotal: Math.max(0, grandTotal), // 負の値にならないように
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

    // 見積を取得
    const estimate = await prisma.estimate.findUnique({
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

    if (!estimate) {
      return NextResponse.json(
        { error: '見積が見つかりません' },
        { status: 404 }
      );
    }

    // 会費入金額を計算（会員情報から）
    const membershipPaidAmount = estimate.customer.memberships.reduce(
      (sum: number, m: any) => sum + (m.paymentAmount || 0),
      0,
    );

    // レスポンスを返す
    return NextResponse.json(serializeBigInt({
      ...estimate,
      id: estimate.id.toString(),
      customerId: estimate.customerId.toString(),
      customer: {
        ...estimate.customer,
        id: estimate.customer.id.toString(),
        memberships: estimate.customer.memberships.map((m: any) => ({
          ...m,
          id: m.id.toString(),
          customerId: m.customerId.toString(),
        })),
      },
      membershipPaidAmount,
      items: estimate.items.map((item: any) => ({
        ...item,
        id: item.id.toString(),
        estimateId: item.estimateId.toString(),
        productItemId: item.productItemId?.toString(),
        productVariantId: item.productVariantId?.toString(),
        productItem: item.productItem
          ? {
              ...item.productItem,
              id: item.productItem.id.toString(),
            }
          : null,
        productVariant: item.productVariant
          ? {
              ...item.productVariant,
              id: item.productVariant.id.toString(),
              productItemId: item.productVariant.productItemId.toString(),
            }
          : null,
      })),
    }));
  } catch (error: any) {
    console.error('Get estimate error:', error);
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

    // 見積を取得
    const estimate = await prisma.estimate.findUnique({
      where: { id: BigInt(id) },
      include: {
        customer: {
          include: {
            memberships: true,
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

    // 会費入金額を再計算
    const membershipPaidAmount = estimate.customer.memberships.reduce(
      (sum: number, m: any) => sum + (m.paymentAmount || 0),
      0,
    );

    // 合計を再計算
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

    // 既存の明細を削除
    await prisma.estimateItem.deleteMany({
      where: { estimateId: BigInt(id) },
    });

    // 見積を更新
    const updated = await prisma.estimate.update({
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
        items: {
          include: {
            productItem: true,
            productVariant: true,
          },
        },
      },
    });

    // レスポンスを返す
    return NextResponse.json(serializeBigInt({
      ...updated,
      id: updated.id.toString(),
      customerId: updated.customerId.toString(),
    }));
  } catch (error: any) {
    console.error('Update estimate error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
