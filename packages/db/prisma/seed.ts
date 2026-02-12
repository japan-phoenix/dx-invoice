import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // ユーザー作成（テスト用）
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { tel: '09012345678' },
    update: {},
    create: {
      name: 'テストユーザー',
      tel: '09012345678',
      password: hashedPassword,
      email: 'test@example.com',
    },
  });
  console.log('Created user:', user);

  // 市区町村・町字のサンプルデータ
  const city = await prisma.addressCity.upsert({
    where: { id: 1n },
    update: {},
    create: {
      id: 1n,
      name: '東京都',
      sortNo: 1,
      isActive: true,
    },
  });

  await prisma.addressTown.upsert({
    where: { id: 1n },
    update: {},
    create: {
      id: 1n,
      cityId: city.id,
      name: '千代田区',
      sortNo: 1,
      isActive: true,
    },
  });

  // 商品マスタのサンプル
  const productItem = await prisma.productItem.create({
    data: {
      name: '祭壇',
      isActive: true,
      variants: {
        create: [
          {
            name: '基本型',
            priceGeneral: 50000,
            priceMember: 45000,
            isActive: true,
          },
          {
            name: '上級型',
            priceGeneral: 80000,
            priceMember: 72000,
            isActive: true,
          },
        ],
      },
    },
  });
  console.log('Created product item:', productItem);

  // 自社情報の初期データ
  await prisma.companyProfile.upsert({
    where: { id: 1n },
    update: {},
    create: {
      id: 1n,
      companyName: '日本フェニックス',
      companyAddress: '東京都千代田区1-1-1',
      companyTel: '03-1234-5678',
      repTitle: '代表取締役',
      repName: '山田太郎',
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
