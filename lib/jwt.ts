import * as jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
  sub: string;
  tel: string;
}

/**
 * JWTトークンを検証してペイロードを返す
 * @param request Next.jsのリクエストオブジェクト
 * @returns 検証成功時はペイロード、失敗時はnull
 */
export async function verifyToken(request: NextRequest): Promise<JWTPayload | null> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    if (!payload.sub) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * JWTトークンを生成する
 * @param payload ペイロード
 * @returns JWTトークン
 */
export function signToken(payload: JWTPayload): string {
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  // SignOptionsのexpiresInはStringValue | numberを期待するが、
  // 実際にはstring | numberも受け入れるため、型アサーションを使用
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as any);
}
