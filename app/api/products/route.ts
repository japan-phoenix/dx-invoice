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
    const name = searchParams.get('name') || undefined;

    // 検索条件を構築
    const where = name
      ? {
          name: {
            contains: name,
          },
          isActive: true,
        }
      : { isActive: true };

    // 商品を取得
    const products = await prisma.productItem.findMany({
      where,
      include: {
        variants: {
          where: { isActive: true },
        },
      },
    });

    // BigIntを文字列に変換してレスポンスを返す
    return NextResponse.json(serializeBigInt(products));
  } catch (error: any) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
