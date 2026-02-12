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

    // 市区町村を取得
    const cities = await prisma.addressCity.findMany({
      where: { isActive: true },
      orderBy: { sortNo: 'asc' },
    });

    // BigIntを文字列に変換してレスポンスを返す
    return NextResponse.json(serializeBigInt(cities));
  } catch (error: any) {
    console.error('Get cities error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
