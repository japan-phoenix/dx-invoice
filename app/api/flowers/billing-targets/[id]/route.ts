import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-middleware'
import { serializeBigInt } from '@/lib/prisma-utils'
import * as crypto from 'crypto'

function generateBillToKey(name: string, address: string, tel?: string): string {
    const data = `${name}|${address}|${tel || ''}`
    return crypto.createHash('sha256').update(data).digest('hex')
}

// 請求先の更新
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    try {
        const authResult = await requireAuth(request)
        if (authResult instanceof NextResponse) return authResult

        const { id } = params
        const data = await request.json()

        const target = await prisma.flowerBillingTarget.findUnique({
            where: { id: BigInt(id) },
        })
        if (!target) {
            return NextResponse.json({ error: '請求先が見つかりません' }, { status: 404 })
        }

        const billToKey = generateBillToKey(data.billToName, data.billToAddress, data.billToTel)

        const updated = await prisma.flowerBillingTarget.update({
            where: { id: BigInt(id) },
            data: {
                billToName: data.billToName,
                billToAddress: data.billToAddress,
                billToTel: data.billToTel ?? null,
                billToKey,
            },
        })

        return NextResponse.json(
            serializeBigInt({
                id: updated.id.toString(),
                customerId: updated.customerId.toString(),
                billToName: updated.billToName,
                billToAddress: updated.billToAddress,
                billToTel: updated.billToTel,
            })
        )
    } catch (error: any) {
        console.error('Update billing target error:', error)
        return NextResponse.json({ error: 'Internal server error', message: error.message }, { status: 500 })
    }
}

// 請求先の削除（cascade で items も削除）
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    try {
        const authResult = await requireAuth(request)
        if (authResult instanceof NextResponse) return authResult

        const { id } = params

        const target = await prisma.flowerBillingTarget.findUnique({
            where: { id: BigInt(id) },
        })
        if (!target) {
            return NextResponse.json({ error: '請求先が見つかりません' }, { status: 404 })
        }

        await prisma.flowerBillingTarget.delete({
            where: { id: BigInt(id) },
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Delete billing target error:', error)
        return NextResponse.json({ error: 'Internal server error', message: error.message }, { status: 500 })
    }
}
