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

    // 会社プロフィールを取得
    const profile = await prisma.companyProfile.findFirst();

    // BigIntを文字列に変換してレスポンスを返す
    return NextResponse.json(serializeBigInt(profile));
  } catch (error: any) {
    console.error('Get company profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const data = await request.json();

    // 会社プロフィールを更新
    const profile = await prisma.companyProfile.upsert({
      where: { id: 1n },
      update: data,
      create: {
        id: 1n,
        ...data,
      },
    });

    // BigIntを文字列に変換してレスポンスを返す
    return NextResponse.json(serializeBigInt(profile));
  } catch (error: any) {
    console.error('Update company profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
