import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@phoenix-jpn/db';
import { requireAuth } from '@/lib/auth-middleware';
import { serializeBigInt } from '@/lib/prisma-utils';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    // クエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId') || undefined;

    console.log('GET /api/estimates - customerId:', customerId);

    // 検索条件を構築
    const where: any = {};
    if (customerId) {
      where.customerId = BigInt(customerId);
      console.log('Searching estimates for customerId:', customerId, 'as BigInt:', where.customerId.toString());
    }

    // 見積を取得
    const estimates = await prisma.estimate.findMany({
      where,
      include: {
        customer: {
          select: {
            id: true,
            deceasedName: true,
            receptionAt: true,
            chiefMournerName: true,
            chiefMournerAddress: true,
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
      orderBy: { createdAt: 'desc' },
    });

    console.log(`Found ${estimates.length} estimates for customerId: ${customerId || 'all'}`);

    // レスポンス形式に変換
    const result = estimates.map((estimate: any) => ({
      ...estimate,
      id: estimate.id.toString(),
      customerId: estimate.customerId.toString(),
      customer: {
        ...estimate.customer,
        id: estimate.customer.id.toString(),
      },
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

    return NextResponse.json(serializeBigInt(result));
  } catch (error: any) {
    console.error('Get estimates error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
