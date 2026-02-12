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

export async function GET(request: NextRequest, props: { params: Promise<{ customerId: string }> }) {
  const params = await props.params;
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { customerId } = params;

    // 供花を取得
    const flowers = await prisma.flower.findMany({
      where: { customerId: BigInt(customerId) },
      include: {
        billingTargetItems: {
          include: {
            flowerBillingTarget: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // 請求先単位にグループ化
    const targetMap = new Map<string, any>();

    for (const flower of flowers) {
      const billToKey = generateBillToKey(
        flower.billToName,
        flower.billToAddress,
        flower.billToTel || undefined,
      );

      if (!targetMap.has(billToKey)) {
        // 請求先単位を作成または取得
        const target = await prisma.flowerBillingTarget.upsert({
          where: {
            customerId_billToKey: {
              customerId: BigInt(customerId),
              billToKey,
            },
          },
          update: {},
          create: {
            customerId: BigInt(customerId),
            billToName: flower.billToName,
            billToAddress: flower.billToAddress,
            billToTel: flower.billToTel,
            billToKey,
          },
        });

        targetMap.set(billToKey, {
          ...target,
          id: target.id.toString(),
          customerId: target.customerId.toString(),
          flowers: [],
        });
      }

      const target = targetMap.get(billToKey);
      target.flowers.push({
        ...flower,
        id: flower.id.toString(),
        customerId: flower.customerId.toString(),
      });
    }

    // レスポンスを返す
    return NextResponse.json(serializeBigInt(Array.from(targetMap.values())));
  } catch (error: any) {
    console.error('Get flowers error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, props: { params: Promise<{ customerId: string }> }) {
  const params = await props.params;
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { customerId } = params;
    const data = await request.json();

    // 顧客を取得
    const customer = await prisma.customer.findUnique({
      where: { id: BigInt(customerId) },
    });

    if (!customer) {
      return NextResponse.json(
        { error: '案件が見つかりません' },
        { status: 404 }
      );
    }

    const billToKey = generateBillToKey(
      data.billToName,
      data.billToAddress,
      data.billToTel,
    );

    // 請求先単位を取得または作成
    const target = await prisma.flowerBillingTarget.upsert({
      where: {
        customerId_billToKey: {
          customerId: BigInt(customerId),
          billToKey,
        },
      },
      update: {},
      create: {
        customerId: BigInt(customerId),
        billToName: data.billToName,
        billToAddress: data.billToAddress,
        billToTel: data.billToTel,
        billToKey,
      },
    });

    // 供花を作成
    const flower = await prisma.flower.create({
      data: {
        customerId: BigInt(customerId),
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

    // 請求先単位との紐付け
    await prisma.flowerBillingTargetItem.create({
      data: {
        flowerBillingTargetId: target.id,
        flowerId: flower.id,
      },
    });

    // レスポンスを返す
    return NextResponse.json(serializeBigInt({
      ...flower,
      id: flower.id.toString(),
      customerId: flower.customerId.toString(),
    }));
  } catch (error: any) {
    console.error('Create flower error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
