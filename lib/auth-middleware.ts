import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './jwt';

/**
 * JWT認証ミドルウェア
 * 認証が必要なAPI Routesで使用
 */
export async function requireAuth(
  request: NextRequest
): Promise<{ payload: any } | NextResponse> {
  const payload = await verifyToken(request);
  if (!payload) {
    return NextResponse.json(
      { error: '認証が必要です' },
      { status: 401 }
    );
  }
  return { payload };
}
