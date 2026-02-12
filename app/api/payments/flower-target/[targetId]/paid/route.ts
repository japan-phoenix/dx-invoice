import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@phoenix-jpn/db';
import { requireAuth } from '@/lib/auth-middleware';
import { serializeBigInt } from '@/lib/prisma-utils';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function POST(request: NextRequest, props: { params: Promise<{ targetId: string }> }) {
  const params = await props.params;
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { targetId } = params;
    const userId = authResult.payload.sub;

    // 供花請求先を取得
    const target = await prisma.flowerBillingTarget.findUnique({
      where: { id: BigInt(targetId) },
      include: {
        customer: true,
        items: {
          include: {
            flower: true,
          },
        },
      },
    });

    if (!target) {
      return NextResponse.json(
        { error: '供花請求先が見つかりません' },
        { status: 404 }
      );
    }

    // 合計金額を計算
    const totalAmount = target.items.reduce(
      (sum: number, item: any) => sum + item.flower.amount,
      0,
    );

    // 入金を作成
    const payment = await prisma.payment.create({
      data: {
        customerId: target.customerId,
        targetType: 'FLOWER_TARGET' as const,
        status: 'PAID' as const,
        flowerBillingTargetId: BigInt(targetId),
        paidAt: new Date(),
        amount: totalAmount,
        createdById: userId ? BigInt(userId) : null,
      },
    });

    // レスポンスを返す
    return NextResponse.json(serializeBigInt({
      ...payment,
      id: payment.id.toString(),
      customerId: payment.customerId.toString(),
      flowerBillingTargetId: payment.flowerBillingTargetId?.toString(),
      createdById: payment.createdById?.toString(),
    }));
  } catch (error: any) {
    console.error('Create flower target payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
