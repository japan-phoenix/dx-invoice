import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    // HttpOnlyクッキーを削除するために、Max-Age=0を設定
    const secure = process.env.NODE_ENV === 'production'
    const cookie = `access_token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; ${
        secure ? 'Secure;' : ''
    }`

    return NextResponse.json(
        { message: 'ログアウトしました' },
        {
            headers: {
                'Set-Cookie': cookie,
            },
        }
    )
}
