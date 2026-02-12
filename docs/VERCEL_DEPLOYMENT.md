# Vercelデプロイメントガイド

このドキュメントでは、葬儀業務システムをVercelにデプロイする方法を説明します。

## 構成

- **Next.js**: VercelのNext.jsランタイムで自動デプロイ ✅
- **Next.js API Routes**: `app/api/` に配置されたAPI Routesが自動的にデプロイされます ✅
- **PostgreSQL**: Neon（外部サービス）を使用

**重要**: 本システムは、Next.jsとNext.js API Routesを使用する構成になっています。

## セットアップ手順

### 1. NeonでPostgreSQLデータベースを作成

1. [Neon](https://neon.tech) にサインアップ
2. 新しいプロジェクトを作成
3. 接続文字列をコピー

### 2. Vercelプロジェクトの作成

#### Vercel Dashboard経由

1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. "Add New Project" をクリック
3. GitHubリポジトリを選択
4. プロジェクト設定：
   - **Framework Preset**: Next.js
   - **Root Directory**: 空白（プロジェクトルート）⚠️ 重要
   - **Build Command**: `pnpm install && cd packages/db && pnpm generate && pnpm prisma migrate deploy && cd ../.. && pnpm build`
   - **Output Directory**: `.next`（自動設定）
   - **Install Command**: `pnpm install`

### 3. 環境変数の設定

Vercel Dashboardで以下の環境変数を設定：

```
# データベース（Neon）
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# JWT認証
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# マイグレーション自動実行（オプション）
AUTO_MIGRATE=true

# Prisma Client Query Engine（Vercel用、通常は不要）
# PRISMA_QUERY_ENGINE_LIBRARY=/var/task/node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node

# CORS設定（オプション、自動設定されます）
FRONTEND_URL=https://your-vercel-app.vercel.app
```

**注意**: `NEXT_PUBLIC_API_URL`は設定不要です。Vercel環境では自動的に`/api`にルーティングされます。

### 4. データベースマイグレーション

#### 本番環境でのマイグレーション実行方法

**推奨: Vercelビルド時に自動実行**

`vercel.json`の`buildCommand`に`pnpm db:migrate:deploy`が含まれているため、Vercelデプロイ時に自動的にマイグレーションが実行されます。

**重要**: Vercel Dashboardで`DATABASE_URL`環境変数が設定されている必要があります。

**オプション1: CI/CDパイプラインで実行**

`.github/workflows/deploy.yml` がデプロイ前に自動的にマイグレーションを実行します。

**オプション2: アプリ起動時に自動実行（フォールバック）**

Vercelの環境変数で `AUTO_MIGRATE=true` を設定すると、アプリ起動時にも自動実行されます（ビルド時のマイグレーションが失敗した場合のフォールバック）。

**注意**: 
- 複数インスタンスが同時起動する場合、競合の可能性があります
- 小規模なアプリケーションや単一インスタンスの場合は問題ありません

#### 初回デプロイ時（手動）

```bash
# ローカルから実行（Neonの接続文字列を使用）
cd packages/db
DATABASE_URL="your-neon-connection-string" pnpm prisma migrate deploy
```

### 5. デプロイ

GitHubにプッシュすると自動的にデプロイされます。

## Next.js API Routesの動作

Next.js API Routesは`app/api/`に配置されており、Vercel Serverless Functionsとして自動的にデプロイされます。

- **エンドポイント**: `/api/*`（例: `/api/auth/login`, `/api/customers`）
- **自動ルーティング**: Next.jsが自動的に`/api/*`のリクエストを`app/api/`内の対応する`route.ts`ファイルにルーティングします
- **キャッシュ**: アプリケーションインスタンスはキャッシュされ、コールドスタートを最小限に抑えます

## 注意事項

### Vercelの制限

- **関数タイムアウト**: 10秒（Hobby）、60秒（Pro）
- **メモリ**: 1024MB（Hobby）、3008MB（Pro）
- **コールドスタート**: 初回リクエストが遅い場合がある

### 推奨事項

1. **環境変数の管理**: 本番環境の環境変数はVercel Dashboardで管理
2. **データベース接続**: Neonの接続文字列はSSLモードを使用
3. **マイグレーション**: CI/CDパイプラインで実行することを推奨（`AUTO_MIGRATE=false`）
4. **コールドスタート**: 初回リクエストが遅い場合があるため、必要に応じてProプランを検討

## トラブルシューティング

### ビルドエラー

```bash
# ローカルでビルドテスト
pnpm build
```

### API接続エラー

- Vercel環境では`/api`への相対パスが自動的に使用されます
- ローカル開発環境では`NEXT_PUBLIC_API_URL=/api`または`http://localhost:3000`を使用
- CORS設定は自動的に行われます

### データベース接続エラー

- `DATABASE_URL` が正しいか確認
- Neonの接続文字列がSSLモードになっているか確認

## 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Railway Documentation](https://docs.railway.app)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
