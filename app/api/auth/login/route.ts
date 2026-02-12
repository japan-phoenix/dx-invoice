import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@phoenix-jpn/db';
import * as bcrypt from 'bcryptjs';
import { signToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tel, password } = body;

    // バリデーション
    if (!tel || !password) {
      return NextResponse.json(
        { error: 'ログインIDとパスワードを入力してください' },
        { status: 400 }
      );
    }

    // ユーザーを検索
    const user = await prisma.user.findUnique({
      where: { tel },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'ログインIDまたはパスワードが正しくありません' },
        { status: 401 }
      );
    }

    // パスワードを検証
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'ログインIDまたはパスワードが正しくありません' },
        { status: 401 }
      );
    }

    // JWTトークンを生成
    const payload = { sub: user.id.toString(), tel: user.tel };
    const access_token = signToken(payload);

    // レスポンスを返す
    return NextResponse.json({
      access_token,
      user: {
        id: user.id.toString(),
        name: user.name,
        tel: user.tel,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
