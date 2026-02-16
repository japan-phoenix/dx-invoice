import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './jwt'

/**
 * JWT認証ミドルウェア
 * 認証が必要なAPI Routesで使用
 *
 * Middlewareで検証済みの場合は `x-user-payload` ヘッダを参照して高速化します。
 */
export async function requireAuth(request: NextRequest): Promise<{ payload: any } | NextResponse> {
    // Middlewareが設定したヘッダからペイロードを取得（存在すれば検証済み）
    const header = request.headers.get('x-user-payload')
    if (header) {
        try {
            const payload = JSON.parse(decodeURIComponent(header))
            return { payload }
        } catch (e) {
            // ヘッダが壊れている場合はフォールバックして再検証
        }
    }

    const payload = await verifyToken(request)
    if (!payload) {
        return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }
    return { payload }
}
