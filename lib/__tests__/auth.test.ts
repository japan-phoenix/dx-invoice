import { describe, it, expect } from 'vitest'
import * as jsonwebtoken from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { signToken, verifyToken, type JWTPayload } from '../jwt'
import { requireAuth } from '../auth-middleware'

const SECRET = 'your-secret-key' // jwt.ts のデフォルト値
const PAYLOAD: JWTPayload = { sub: 'user-001', tel: '090-1234-5678' }

// NextRequest ヘルパー
function makeRequest(
    options: {
        authorization?: string
        cookie?: string
        xUserPayload?: string
    } = {}
): NextRequest {
    const headers: Record<string, string> = {}
    if (options.authorization) headers['authorization'] = options.authorization
    if (options.cookie) headers['cookie'] = options.cookie
    if (options.xUserPayload) headers['x-user-payload'] = options.xUserPayload
    return new NextRequest('http://localhost/api/test', { headers })
}

// -------------------------------------------------------
// signToken
// -------------------------------------------------------
describe('signToken', () => {
    it('文字列のトークンを返す', () => {
        const token = signToken(PAYLOAD)
        expect(typeof token).toBe('string')
        expect(token.split('.')).toHaveLength(3) // header.payload.signature
    })

    it('トークンのペイロードに sub と tel が含まれる', () => {
        const token = signToken(PAYLOAD)
        const decoded = jsonwebtoken.decode(token) as Record<string, unknown>
        expect(decoded.sub).toBe(PAYLOAD.sub)
        expect(decoded.tel).toBe(PAYLOAD.tel)
    })
})

// -------------------------------------------------------
// verifyToken
// -------------------------------------------------------
describe('verifyToken', () => {
    it('Authorization ヘッダの Bearer トークンを検証して payload を返す', async () => {
        const token = signToken(PAYLOAD)
        const req = makeRequest({ authorization: `Bearer ${token}` })
        const result = await verifyToken(req)
        expect(result?.sub).toBe(PAYLOAD.sub)
        expect(result?.tel).toBe(PAYLOAD.tel)
    })

    it('Cookie の access_token を検証して payload を返す', async () => {
        const token = signToken(PAYLOAD)
        const req = makeRequest({ cookie: `access_token=${token}` })
        const result = await verifyToken(req)
        expect(result?.sub).toBe(PAYLOAD.sub)
    })

    it('Authorization ヘッダが優先される（両方ある場合）', async () => {
        const headerToken = signToken({ sub: 'header-user', tel: '111' })
        const cookieToken = signToken({ sub: 'cookie-user', tel: '222' })
        const req = makeRequest({
            authorization: `Bearer ${headerToken}`,
            cookie: `access_token=${cookieToken}`,
        })
        const result = await verifyToken(req)
        expect(result?.sub).toBe('header-user')
    })

    it('トークンがない場合は null を返す', async () => {
        const req = makeRequest()
        const result = await verifyToken(req)
        expect(result).toBeNull()
    })

    it('不正なトークンは null を返す', async () => {
        const req = makeRequest({ authorization: 'Bearer invalid.token.here' })
        const result = await verifyToken(req)
        expect(result).toBeNull()
    })

    it('有効期限切れトークンは null を返す', async () => {
        const expired = jsonwebtoken.sign(PAYLOAD, SECRET, { expiresIn: -1 })
        const req = makeRequest({ authorization: `Bearer ${expired}` })
        const result = await verifyToken(req)
        expect(result).toBeNull()
    })

    it('sub フィールドがないトークンは null を返す', async () => {
        const noSub = jsonwebtoken.sign({ tel: '090-0000-0000' }, SECRET)
        const req = makeRequest({ authorization: `Bearer ${noSub}` })
        const result = await verifyToken(req)
        expect(result).toBeNull()
    })

    it('異なる秘密鍵で署名されたトークンは null を返す', async () => {
        const wrongKey = jsonwebtoken.sign(PAYLOAD, 'wrong-secret')
        const req = makeRequest({ authorization: `Bearer ${wrongKey}` })
        const result = await verifyToken(req)
        expect(result).toBeNull()
    })
})

// -------------------------------------------------------
// requireAuth
// -------------------------------------------------------
describe('requireAuth', () => {
    it('x-user-payload ヘッダがある場合、トークン検証なしで payload を返す', async () => {
        const encoded = encodeURIComponent(JSON.stringify(PAYLOAD))
        const req = makeRequest({ xUserPayload: encoded })
        const result = await requireAuth(req)
        expect(result).toHaveProperty('payload')
        expect((result as { payload: JWTPayload }).payload.sub).toBe(PAYLOAD.sub)
    })

    it('x-user-payload が壊れている場合は Bearer トークンにフォールバックする', async () => {
        const token = signToken(PAYLOAD)
        const req = makeRequest({
            xUserPayload: '%%%invalid%%%',
            authorization: `Bearer ${token}`,
        })
        const result = await requireAuth(req)
        expect(result).toHaveProperty('payload')
    })

    it('認証情報がない場合は 401 レスポンスを返す', async () => {
        const req = makeRequest()
        const result = await requireAuth(req)
        expect(result instanceof NextResponse).toBe(true)
        expect((result as NextResponse).status).toBe(401)
    })

    it('無効なトークンの場合は 401 レスポンスを返す', async () => {
        const req = makeRequest({ authorization: 'Bearer invalid.token' })
        const result = await requireAuth(req)
        expect(result instanceof NextResponse).toBe(true)
        expect((result as NextResponse).status).toBe(401)
    })

    it('有効なトークンの場合は payload を返す', async () => {
        const token = signToken(PAYLOAD)
        const req = makeRequest({ authorization: `Bearer ${token}` })
        const result = await requireAuth(req)
        expect(result).toHaveProperty('payload')
        expect((result as { payload: JWTPayload }).payload.sub).toBe(PAYLOAD.sub)
    })
})
