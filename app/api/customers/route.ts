import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@phoenix-jpn/db';
import { requireAuth } from '@/lib/auth-middleware';
import { serializeBigInt } from '@/lib/prisma-utils';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    // クエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get('cityId') || undefined;
    const townId = searchParams.get('townId') || undefined;
    const lastName = searchParams.get('lastName') || undefined;
    const firstName = searchParams.get('firstName') || undefined;
    const receptionFrom = searchParams.get('receptionFrom') || undefined;
    const receptionTo = searchParams.get('receptionTo') || undefined;
    const funeralFrom = searchParams.get('funeralFrom') || undefined;
    const funeralTo = searchParams.get('funeralTo') || undefined;
    const paid = searchParams.get('paid') === 'true';
    const unpaid = searchParams.get('unpaid') === 'true';

    // 検索条件を構築
    const where: any = {};

    if (cityId) {
      where.chiefMournerCityId = BigInt(cityId);
    }
    if (townId) {
      where.chiefMournerTownId = BigInt(townId);
    }

    if (lastName || firstName) {
      where.OR = [];
      if (lastName) {
        where.OR.push({
          deceasedLastName: {
            contains: lastName,
          },
        });
      }
      if (firstName) {
        where.OR.push({
          deceasedFirstName: {
            contains: firstName,
          },
        });
      }
    }

    if (receptionFrom || receptionTo) {
      where.receptionAt = {};
      if (receptionFrom) {
        where.receptionAt.gte = new Date(receptionFrom);
      }
      if (receptionTo) {
        where.receptionAt.lte = new Date(receptionTo);
      }
    }

    if (funeralFrom || funeralTo) {
      where.funeralFrom = {};
      if (funeralFrom) {
        where.funeralFrom.gte = new Date(funeralFrom);
      }
      if (funeralTo) {
        where.funeralFrom.lte = new Date(funeralTo);
      }
    }

    // 顧客を取得
    const customers = await prisma.customer.findMany({
      where,
      include: {
        chiefMournerCity: true,
        chiefMournerTown: true,
        estimates: {
          select: { id: true },
        },
        invoices: {
          include: {
            payments: {
              where: {
                targetType: 'INVOICE' as const,
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
          },
        },
      },
      orderBy: [
        {
          receptionAt: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });

    console.log(`Found ${customers.length} customers`);
    
    // デバッグ: 見積書の有無を確認
    customers.forEach((customer: any) => {
      console.log(`Customer ${customer.id}: estimates count = ${customer.estimates.length}`);
    });

    // 入金状態でフィルタリング
    let filteredCustomers = customers;

    if (paid || unpaid) {
      filteredCustomers = customers.filter((customer: any) => {
        const invoice = customer.invoices[0];
        if (!invoice) {
          return unpaid === true;
        }

        const latestPayment = invoice.payments[0];
        const isPaid = latestPayment?.status === 'PAID';

        if (paid) {
          return isPaid;
        }
        if (unpaid) {
          return !isPaid;
        }
        return true;
      });
    }

    // レスポンス形式に変換
    const result = filteredCustomers.map((customer: any) => {
      const invoice = customer.invoices[0];
      const latestPayment = invoice?.payments[0];
      const isPaid = latestPayment?.status === 'PAID';

      return {
        id: customer.id.toString(),
        deceasedName: customer.deceasedName,
        age: customer.age,
        address: customer.chiefMournerAddress || '',
        receptionAt: customer.receptionAt ? customer.receptionAt.toISOString() : null,
        funeralFrom: customer.funeralFrom ? customer.funeralFrom.toISOString() : null,
        hasEstimate: customer.estimates.length > 0,
        hasInvoice: customer.invoices.length > 0,
        invoiceId: invoice?.id.toString(),
        isPaid: isPaid,
        chiefMournerCity: customer.chiefMournerCity
          ? {
              id: customer.chiefMournerCity.id.toString(),
              name: customer.chiefMournerCity.name,
            }
          : null,
        chiefMournerTown: customer.chiefMournerTown
          ? {
              id: customer.chiefMournerTown.id.toString(),
              name: customer.chiefMournerTown.name,
            }
          : null,
      };
    });

    return NextResponse.json(serializeBigInt(result));
  } catch (error: any) {
    console.error('Get customers error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // JWT認証
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const data = await request.json();

    // 空文字列をnullに変換するヘルパー関数
    const toNullIfEmpty = (value: any) => {
      if (value === '' || value === undefined) return null;
      return value;
    };

    // 数値に変換するヘルパー関数
    const toIntOrNull = (value: any) => {
      if (value === '' || value === undefined || value === null) return null;
      const num = parseInt(value, 10);
      return isNaN(num) ? null : num;
    };

    // Gender enumの値を検証
    const validGenders = ['MALE', 'FEMALE', 'OTHER'];
    const gender = data.gender && validGenders.includes(data.gender) ? data.gender : null;

    // 顧客データを準備
    const customerData: any = {
      deceasedName: data.deceasedName || '',
      deceasedLastName: toNullIfEmpty(data.deceasedLastName),
      deceasedFirstName: toNullIfEmpty(data.deceasedFirstName),
      gender: gender,
      age: toIntOrNull(data.age),
      religion: toNullIfEmpty(data.religion),
      receptionAt: data.receptionAt ? new Date(data.receptionAt) : null,
      chiefMournerName: toNullIfEmpty(data.chiefMournerName),
      chiefMournerRelation: toNullIfEmpty(data.chiefMournerRelation),
      chiefMournerCityId: data.chiefMournerCityId
        ? BigInt(data.chiefMournerCityId)
        : null,
      chiefMournerTownId: data.chiefMournerTownId
        ? BigInt(data.chiefMournerTownId)
        : null,
      chiefMournerAddress: toNullIfEmpty(data.chiefMournerAddress),
      chiefMournerTel: toNullIfEmpty(data.chiefMournerTel),
      payerName: toNullIfEmpty(data.payerName),
      payerRelation: toNullIfEmpty(data.payerRelation),
      payerAddress: toNullIfEmpty(data.payerAddress),
      payerTel: toNullIfEmpty(data.payerTel),
      pickupPlace: toNullIfEmpty(data.pickupPlace),
      wakeAt: data.wakeAt ? new Date(data.wakeAt) : null,
      wakePlace: toNullIfEmpty(data.wakePlace),
      departureAt: data.departureAt ? new Date(data.departureAt) : null,
      departurePlace: toNullIfEmpty(data.departurePlace),
      funeralFrom: data.funeralFrom ? new Date(data.funeralFrom) : null,
      funeralTo: data.funeralTo ? new Date(data.funeralTo) : null,
      funeralPlace: toNullIfEmpty(data.funeralPlace),
      returnAt: data.returnAt ? new Date(data.returnAt) : null,
      returnPlace: toNullIfEmpty(data.returnPlace),
      notes: toNullIfEmpty(data.notes),
      memberCardNote: toNullIfEmpty(data.memberCardNote),
    };

    // 顧客を作成
    const customer = await prisma.customer.create({
      data: customerData,
      include: {
        chiefMournerCity: true,
        chiefMournerTown: true,
      },
    });

    // 会員情報（3行固定）を作成
    if (data.memberships) {
      await Promise.all(
        [1, 2, 3].map((rowNo) => {
          const membership = data.memberships.find((m: any) => m.rowNo === rowNo);
          if (membership) {
            return prisma.customerMembership.create({
              data: {
                customerId: customer.id,
                rowNo,
                memberNo: toNullIfEmpty(membership.memberNo),
                joinedAt: membership.joinedAt
                  ? new Date(membership.joinedAt)
                  : null,
                memberName: toNullIfEmpty(membership.memberName),
                courseUnits: toIntOrNull(membership.courseUnits),
                maturityAmount: toIntOrNull(membership.maturityAmount),
                paymentTimes: toIntOrNull(membership.paymentTimes),
                paymentAmount: toIntOrNull(membership.paymentAmount),
                salesStaffName: toNullIfEmpty(membership.salesStaffName),
                relationToDeceased: toNullIfEmpty(membership.relationToDeceased),
              },
            });
          }
          return null;
        }),
      );
    }

    // レスポンスを返す
    return NextResponse.json(serializeBigInt({
      ...customer,
      id: customer.id.toString(),
      chiefMournerCityId: customer.chiefMournerCityId?.toString(),
      chiefMournerTownId: customer.chiefMournerTownId?.toString(),
    }));
  } catch (error: any) {
    console.error('Create customer error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
