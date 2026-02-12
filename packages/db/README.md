# Database Package

Prismaスキーマとマイグレーションを管理するパッケージです。

## セットアップ

### 1. 環境変数の設定

ルートディレクトリの`.env`ファイルに以下を設定してください：

```
DATABASE_URL="postgresql://user:password@localhost:5432/funeral_system?schema=public"
```

### 2. Prismaクライアントの生成

```bash
pnpm db:generate
```

### 3. マイグレーションの実行

#### 開発環境（マイグレーションファイルも生成）

```bash
pnpm db:migrate
```

または

```bash
cd packages/db
pnpm prisma migrate dev --name migration_name
```

#### 本番環境（マイグレーションファイルのみ実行）

```bash
cd packages/db
pnpm prisma migrate deploy
```

### 4. シードデータの投入

```bash
pnpm db:seed
```

## マイグレーションの作成方法

### スキーマを変更した後

1. スキーマファイル（`prisma/schema.prisma`）を編集
2. マイグレーションを作成・適用：

```bash
cd packages/db
pnpm prisma migrate dev --name describe_your_changes
```

例：
```bash
pnpm prisma migrate dev --name add_user_email_index
```

### マイグレーションファイルの確認

マイグレーションファイルは `prisma/migrations/` ディレクトリに作成されます。

## Prisma Studio

データベースの内容を確認・編集するには：

```bash
pnpm db:studio
```

ブラウザで http://localhost:5555 が開きます。

## 注意事項

- **マイグレーションは必ず作成してから適用してください**
- 本番環境では `migrate deploy` を使用してください
- マイグレーションファイルはGitにコミットしてください
