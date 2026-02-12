# 葬儀業務システム

葬儀案件を中心に、見積・請求・供花・入金管理を一元管理する業務システム。

## 技術スタック

- フロントエンド: Next.js (TypeScript)
- バックエンド: Next.js API Routes
- DB: PostgreSQL
- ORM: Prisma
- 認証: JWT (TEL + パスワード)

## セットアップ

### 0. pnpmのインストール（未インストールの場合）

このプロジェクトは`pnpm`を使用しています。未インストールの場合は、以下のいずれかの方法でインストールしてください：

#### 方法1: Corepackを使用（推奨、Node.js 16.10以降）

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

#### 方法2: npmを使用

```bash
npm install -g pnpm@latest
```

#### 方法3: Homebrewを使用（macOS）

```bash
brew install pnpm
```

インストール後、バージョンを確認：

```bash
pnpm --version
```

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

```bash
# テンプレートファイルをコピーして .env を作成
cp env.example .env

# .env を編集してデータベース接続情報を設定（通常はデフォルト値で動作）
# Docker ComposeでPostgreSQLを起動している場合、デフォルト値で問題ありません
```

**環境変数の説明**:
- `DATABASE_URL`: PostgreSQL接続文字列（Docker Composeのデフォルト値を使用）
- `JWT_SECRET`: JWT認証用のシークレットキー（本番環境では必ず変更）
- `JWT_EXPIRES_IN`: JWTトークンの有効期限（デフォルト: 7d）
- `NEXT_PUBLIC_API_URL`: フロントエンドからAPIへのURL（ローカル: `/api` または `http://localhost:3000`）
- `AUTO_MIGRATE`: マイグレーション自動実行フラグ（開発環境: true、本番環境: false推奨）

### 3. データベースのセットアップ

#### Docker ComposeでPostgreSQLを起動

```bash
cd infra/compose
docker-compose up -d
```

#### Prismaクライアントの生成

```bash
pnpm db:generate
```

#### マイグレーションの実行

**重要**: データベーススキーマの変更は必ずマイグレーションで行います。

```bash
# 開発環境（マイグレーションファイルを生成・適用）
pnpm db:migrate

# または、マイグレーション名を指定
cd packages/db
pnpm prisma migrate dev --name migration_name
```

**注意**: アプリケーション起動時に自動的にマイグレーションが実行されます（`AUTO_MIGRATE=true`の場合）。
開発環境で新しいマイグレーションを作成する場合は、上記コマンドを手動で実行してください。

#### シードデータ投入

```bash
pnpm db:seed
```

#### データベースのリセット（開発環境のみ）

```bash
./scripts/reset-db.sh
# または
pnpm db:reset
```

### 4. 開発サーバーの起動

#### 通常の開発環境

```bash
# Next.js を起動（API Routes含む）
pnpm dev
```

- Next.js: http://localhost:3000
- API Routes: http://localhost:3000/api/*

#### Vercel CLIを使用した開発環境

```bash
# Vercel CLIでローカル開発（Vercel環境を再現）
./scripts/dev-vercel.sh
```

または

```bash
# Docker ComposeでVercel環境を起動
cd infra/compose
docker-compose -f docker-compose.yml -f docker-compose.vercel.yml up
```

詳細は [ローカル開発環境ガイド](docs/LOCAL_DEVELOPMENT.md) を参照してください。

## プロジェクト構成

```
├── app/              # Next.js App Router（ページ・API Routes）
├── components/       # Reactコンポーネント
├── lib/              # ユーティリティ・APIクライアント
├── packages/
│   └── db/           # Prisma スキーマ・マイグレーション
├── infra/
│   └── compose/      # Docker Compose設定
└── docs/             # 仕様書・ドキュメント
```

## データベース管理

### マイグレーション

**すべてのDBテーブルの変更はマイグレーションで行います。**

詳細は [マイグレーションガイド](docs/MIGRATION_GUIDE.md) を参照してください。

#### マイグレーションの作成

1. `packages/db/prisma/schema.prisma` を編集
2. マイグレーションを作成・適用：

```bash
cd packages/db
pnpm prisma migrate dev --name describe_your_changes
```

例：
```bash
pnpm prisma migrate dev --name add_customer_memo_field
```

#### 本番環境でのマイグレーション

**推奨: CI/CDパイプラインで実行**

`.github/workflows/deploy.yml` がデプロイ前に自動的にマイグレーションを実行します。

**オプション: アプリ起動時に自動実行**

環境変数 `AUTO_MIGRATE=true` を設定すると、アプリ起動時に自動実行されます。

**注意**: 複数インスタンス環境では、CI/CDパイプラインでの実行を推奨します。

詳細は [本番環境マイグレーションガイド](docs/PRODUCTION_MIGRATION.md) を参照してください。

### Prisma Studio

データベースの内容を確認・編集：

```bash
pnpm db:studio
```

ブラウザで http://localhost:5555 が開きます。

## 開発

### データベース操作

```bash
# Prisma Studio起動
pnpm db:studio

# マイグレーション作成
cd packages/db
pnpm prisma migrate dev --name migration_name

# マイグレーション状態確認
pnpm prisma migrate status
```

### スクリプト

- `./scripts/dev.sh` - 開発サーバー起動（Docker Compose + Next.js）
- `./scripts/reset-db.sh` - データベースリセット
- `./scripts/seed.sh` - シードデータ投入

## 主要機能

- ✅ ログイン認証
- ✅ 葬儀案件管理（登録・編集・検索）
- ✅ 見積書作成・編集・PDFプレビュー
- ✅ 請求書作成・編集・PDFプレビュー（見積からのコピー対応）
- ✅ 供花管理（請求先単位）
- ✅ 入金管理（履歴型）

## デプロイメント

### Vercel

Next.jsアプリケーションはVercelでデプロイ可能です。

詳細は [Vercelデプロイメントガイド](docs/VERCEL_DEPLOYMENT.md) を参照してください。

## ライセンス

Private
