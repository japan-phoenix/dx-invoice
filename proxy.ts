import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/jwt'

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Only handle API routes
    if (!pathname.startsWith('/api')) {
        return NextResponse.next()
    }

    // Paths to exclude from auth (login and logout endpoints)
    const excludePaths = ['/api/auth/login', '/api/auth/logout']

    const isExcluded = excludePaths.some((p) => pathname === p || pathname.startsWith(`${p}/`))
    if (isExcluded) {
        return NextResponse.next()
    }

    // /api/auth/me も認証が必要
    console.log('proxy: Checking auth for', pathname)
    const payload = await verifyToken(request)
    if (!payload) {
        console.log('proxy: No valid token found for', pathname)
        return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }
    console.log('proxy: Auth successful for', pathname, 'user:', payload.sub)

    const headers = new Headers(request.headers)
    headers.set('x-user-payload', encodeURIComponent(JSON.stringify(payload)))

    return NextResponse.next({ request: { headers } })
}

export const config = {
    matcher: ['/api/:path*'],
}
