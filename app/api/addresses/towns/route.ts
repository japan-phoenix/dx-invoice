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
    const cityId = searchParams.get('city');

    if (!cityId) {
      return NextResponse.json(
        { error: 'cityパラメータが必要です' },
        { status: 400 }
      );
    }

    // 町字を取得
    const towns = await prisma.addressTown.findMany({
      where: {
        cityId: BigInt(cityId),
        isActive: true,
      },
      orderBy: { sortNo: 'asc' },
    });

    // BigIntを文字列に変換してレスポンスを返す
    return NextResponse.json(serializeBigInt(towns));
  } catch (error: any) {
    console.error('Get towns error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
