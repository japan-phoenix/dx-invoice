# マイグレーションガイド

このドキュメントでは、データベーススキーマの変更をマイグレーションで管理する方法を説明します。

## 基本方針

- **すべてのDBテーブルの変更はマイグレーションで行う**
- スキーマファイル（`packages/db/prisma/schema.prisma`）を編集したら、必ずマイグレーションを作成
- マイグレーションファイルはGitにコミットする

## マイグレーションの作成手順

### 1. スキーマファイルを編集

`packages/db/prisma/schema.prisma` を編集します。

例：新しいカラムを追加する場合

```prisma
model Customer {
  id        BigInt   @id @default(autoincrement())
  name      String   @db.VarChar(100)
  // 新しいカラムを追加
  memo      String?  @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 2. マイグレーションを作成・適用

```bash
cd packages/db
pnpm prisma migrate dev --name add_customer_memo
```

`--name` オプションには、変更内容を表す名前を付けます。

例：
- `add_customer_memo` - カラム追加
- `add_user_email_index` - インデックス追加
- `update_invoice_status_enum` - 列挙型の更新
- `rename_customer_to_client` - テーブル名変更

### 3. マイグレーションファイルの確認

マイグレーションファイルは `packages/db/prisma/migrations/YYYYMMDDHHMMSS_migration_name/migration.sql` に作成されます。

内容を確認して、意図した変更になっているか確認してください。

## よくある操作

### テーブルの追加

```prisma
model NewTable {
  id        BigInt   @id @default(autoincrement())
  name      String   @db.VarChar(100)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("new_table")
}
```

```bash
pnpm prisma migrate dev --name add_new_table
```

### カラムの追加

```prisma
model Customer {
  // ... 既存のカラム
  newField String? @db.VarChar(255)
}
```

```bash
pnpm prisma migrate dev --name add_customer_new_field
```

### カラムの削除

```prisma
model Customer {
  // oldField を削除
  // oldField String? @db.VarChar(255)  // コメントアウトまたは削除
}
```

```bash
pnpm prisma migrate dev --name remove_customer_old_field
```

### インデックスの追加

```prisma
model Customer {
  email String @unique @db.VarChar(255)
  
  @@index([email])
  @@map("customers")
}
```

```bash
pnpm prisma migrate dev --name add_customer_email_index
```

### 外部キー制約の追加

```prisma
model Order {
  customerId BigInt
  customer   Customer @relation(fields: [customerId], references: [id])
  
  @@map("orders")
}
```

```bash
pnpm prisma migrate dev --name add_order_customer_fk
```

## 本番環境でのマイグレーション

本番環境では、マイグレーションファイルを生成せず、既存のマイグレーションファイルを適用します：

```bash
cd packages/db
pnpm prisma migrate deploy
```

## マイグレーションのリセット（開発環境のみ）

開発環境でデータベースを完全にリセットする場合：

```bash
cd packages/db
pnpm prisma migrate reset
```

このコマンドは：
1. データベースを削除
2. 再作成
3. すべてのマイグレーションを適用
4. シードデータを投入

## トラブルシューティング

### マイグレーションが失敗した場合

1. マイグレーションファイルを確認
2. 手動でSQLを修正する必要がある場合は、マイグレーションファイルを直接編集
3. 再度 `prisma migrate dev` を実行

### スキーマとデータベースが不一致の場合

```bash
cd packages/db
pnpm prisma migrate reset
```

**注意**: このコマンドはすべてのデータを削除します。本番環境では使用しないでください。

### マイグレーション履歴を確認

```bash
cd packages/db
pnpm prisma migrate status
```

## ベストプラクティス

1. **マイグレーション名は明確に**: 変更内容が分かる名前を付ける
2. **小さな変更に分割**: 大きな変更は複数のマイグレーションに分割
3. **マイグレーションファイルをレビュー**: 作成後、必ず内容を確認
4. **バックアップ**: 本番環境のマイグレーション前にバックアップを取得
5. **テスト**: 開発環境で十分にテストしてから本番環境に適用

## 参考リンク

- [Prisma Migrate ドキュメント](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Prisma Schema リファレンス](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
