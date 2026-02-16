import * as jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface JWTPayload {
    sub: string
    tel: string
}

/**
 * JWTトークンを検証してペイロードを返す
 * @param request Next.jsのリクエストオブジェクト
 * @returns 検証成功時はペイロード、失敗時はnull
 */
export async function verifyToken(request: NextRequest): Promise<JWTPayload | null> {
    // まず Authorization ヘッダを確認
    const authHeader = request.headers.get('authorization')
    let token: string | null = null
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
    }

    // Authorization がなければクッキーを確認（ブラウザのナビゲーションやSSR時に有効）
    if (!token) {
        const cookie = request.cookies.get('access_token')
        if (cookie) {
            token = cookie.value
        }
    }

    if (!token) {
        return null
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as JWTPayload
        if (!payload.sub) {
            return null
        }
        return payload
    } catch (error) {
        return null
    }
}

/**
 * JWTトークンを生成する
 * @param payload ペイロード
 * @returns JWTトークン
 */
export function signToken(payload: JWTPayload): string {
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
    return jwt.sign(payload, JWT_SECRET, { expiresIn } as any)
}
