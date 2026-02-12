import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@phoenix-jpn/db';
import { requireAuth } from '@/lib/auth-middleware';
import { serializeBigInt } from '@/lib/prisma-utils';
import * as crypto from 'crypto';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

function generateBillToKey(name: string, address: string, tel?: string): string {
  const data = `${name}|${address}|${tel || ''}`;
  return crypto.createHash('sha256').update(data).digest('hex');
}

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = params;

    // 供花を取得
    const flower = await prisma.flower.findUnique({
      where: { id: BigInt(id) },
    });

    if (!flower) {
      return NextResponse.json(
        { error: '供花が見つかりません' },
        { status: 404 }
      );
    }

    // レスポンスを返す
    return NextResponse.json(serializeBigInt({
      ...flower,
      id: flower.id.toString(),
      customerId: flower.customerId.toString(),
    }));
  } catch (error: any) {
    console.error('Get flower error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = params;
    const data = await request.json();

    // 供花を取得
    const flower = await prisma.flower.findUnique({
      where: { id: BigInt(id) },
    });

    if (!flower) {
      return NextResponse.json(
        { error: '供花が見つかりません' },
        { status: 404 }
      );
    }

    // 供花を更新
    const updated = await prisma.flower.update({
      where: { id: BigInt(id) },
      data: {
        requesterName: data.requesterName,
        labelName: data.labelName,
        jointNames: data.jointNames,
        billToName: data.billToName,
        billToAddress: data.billToAddress,
        billToTel: data.billToTel,
        deliveryTo: data.deliveryTo,
        amount: data.amount || 0,
      },
    });

    // 請求先が変更された場合、紐付けを更新
    const billToKey = generateBillToKey(
      data.billToName,
      data.billToAddress,
      data.billToTel,
    );

    const target = await prisma.flowerBillingTarget.upsert({
      where: {
        customerId_billToKey: {
          customerId: flower.customerId,
          billToKey,
        },
      },
      update: {},
      create: {
        customerId: flower.customerId,
        billToName: data.billToName,
        billToAddress: data.billToAddress,
        billToTel: data.billToTel,
        billToKey,
      },
    });

    // 既存の紐付けを削除
    await prisma.flowerBillingTargetItem.deleteMany({
      where: { flowerId: BigInt(id) },
    });

    // 新しい紐付けを作成
    await prisma.flowerBillingTargetItem.create({
      data: {
        flowerBillingTargetId: target.id,
        flowerId: BigInt(id),
      },
    });

    // レスポンスを返す
    return NextResponse.json(serializeBigInt({
      ...updated,
      id: updated.id.toString(),
      customerId: updated.customerId.toString(),
    }));
  } catch (error: any) {
    console.error('Update flower error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = params;

    // 供花を取得
    const flower = await prisma.flower.findUnique({
      where: { id: BigInt(id) },
    });

    if (!flower) {
      return NextResponse.json(
        { error: '供花が見つかりません' },
        { status: 404 }
      );
    }

    // 紐付けを削除
    await prisma.flowerBillingTargetItem.deleteMany({
      where: { flowerId: BigInt(id) },
    });

    // 供花を削除
    await prisma.flower.delete({
      where: { id: BigInt(id) },
    });

    // レスポンスを返す
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete flower error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
