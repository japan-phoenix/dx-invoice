# ローカル開発環境ガイド

このドキュメントでは、ローカル開発環境のセットアップ方法を説明します。

## 開発環境の選択

### オプション1: 通常の開発環境（推奨）

Next.jsを起動する方法。

```bash
# PostgreSQL起動
cd infra/compose
docker-compose up -d

# 開発サーバー起動
cd ../..
pnpm dev
```

- Next.js: http://localhost:3000
- API Routes: http://localhost:3000/api/*

### オプション2: Vercel CLIを使用した開発環境

Vercelのローカル環境を再現する方法。

#### 方法A: スクリプトを使用（推奨）

```bash
./scripts/dev-vercel.sh
```

#### 方法B: Docker Composeを使用

```bash
cd infra/compose
docker-compose -f docker-compose.yml -f docker-compose.vercel.yml up
```

#### 方法C: 手動でVercel CLIを起動

```bash
# Vercel CLIをインストール（初回のみ）
npm install -g vercel

# 依存関係のインストール
pnpm install

# Prismaクライアント生成
pnpm db:generate

# Vercel開発サーバー起動
vercel dev
```

## Vercel CLIの初期設定

初回起動時、Vercel CLIの設定が必要です：

1. Vercelアカウントでログイン
2. プロジェクトをリンク（既存プロジェクトがある場合）
3. 環境変数を設定

```bash
vercel login
vercel link
```

## 環境変数

### ローカル開発用（.env.local）

```bash
# データベース
DATABASE_URL="postgresql://user:password@localhost:5432/funeral_system?schema=public"

# JWT
JWT_SECRET="local-dev-secret-key"
JWT_EXPIRES_IN="7d"

# API
NEXT_PUBLIC_API_URL="/api"
FRONTEND_URL="http://localhost:3000"
```

### Vercel CLI使用時

Vercel CLIは `.vercel` ディレクトリに設定を保存します。

環境変数は `vercel env` コマンドで管理するか、`.env.local` ファイルを使用します。

## データベース操作

### マイグレーション

```bash
# 開発環境
cd packages/db
pnpm prisma migrate dev --name migration_name

# 本番環境（Neonなど）
DATABASE_URL="your-neon-connection-string" pnpm prisma migrate deploy
```

### Prisma Studio

```bash
pnpm db:studio
```

## トラブルシューティング

### Vercel CLIが起動しない

```bash
# Vercel CLIを再インストール
npm uninstall -g vercel
npm install -g vercel@latest

# キャッシュをクリア
vercel logout
vercel login
```

### ポートが既に使用されている

```bash
# 別のポートで起動
vercel dev --listen 3001
```

### データベース接続エラー

- Docker ComposeでPostgreSQLが起動しているか確認
- `DATABASE_URL` が正しいか確認

## 参考リンク

- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Prisma Documentation](https://www.prisma.io/docs)
