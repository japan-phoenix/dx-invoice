import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@phoenix-jpn/db';
import { requireAuth } from '@/lib/auth-middleware';
import { serializeBigInt } from '@/lib/prisma-utils';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = params;

    // 商品バリエーションを取得
    const variants = await prisma.productVariant.findMany({
      where: {
        productItemId: BigInt(id),
        isActive: true,
      },
    });

    // BigIntを文字列に変換してレスポンスを返す
    return NextResponse.json(serializeBigInt(variants));
  } catch (error: any) {
    console.error('Get product variants error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
