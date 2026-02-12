# 自動マイグレーション機能

アプリケーション起動時に、データベーステーブルを最新の状態に自動更新する機能です。

## 動作

- **Next.js起動時**: `instrumentation.ts` が自動的に `prisma migrate deploy` を実行

## 本番環境での推奨設定

### オプション1: アプリ起動時に自動実行（小規模・シンプル）

**メリット**:
- デプロイ時に自動的にDBが最新化される
- 手動操作が不要

**デメリット**:
- 複数インスタンス同時起動時に競合の可能性
- マイグレーションエラー時の対応が難しい

**設定**:
```bash
# 本番環境の環境変数
AUTO_MIGRATE=true
```

### オプション2: CI/CDパイプラインで実行（推奨・大規模）

**メリット**:
- マイグレーションを確実に1回だけ実行
- デプロイ前にマイグレーションを確認できる
- ロールバックが容易

**設定**:
```bash
# 本番環境の環境変数
AUTO_MIGRATE=false
```

GitHub Actionsで実行（`.github/workflows/deploy.yml` を参照）

### オプション3: 手動実行（最も安全）

**メリット**:
- 完全な制御
- デプロイ前にテスト可能

**設定**:
```bash
# 本番環境の環境変数
AUTO_MIGRATE=false
```

デプロイ後に手動で実行：
```bash
cd packages/db
DATABASE_URL="your-production-db-url" pnpm prisma migrate deploy
```

## 設定

### 環境変数

`.env` ファイルで制御できます：

```bash
# 自動マイグレーションを有効化（デフォルト）
AUTO_MIGRATE=true

# 自動マイグレーションを無効化
AUTO_MIGRATE=false
```

### 動作モード

- **`prisma migrate deploy`**: 既存のマイグレーションファイルを適用（本番環境用）
- 新しいマイグレーションを作成する場合は、手動で `pnpm db:migrate` を実行

## 使用例

### 開発環境

```bash
# 1. スキーマを変更
# packages/db/prisma/schema.prisma を編集

# 2. マイグレーションファイルを作成
cd packages/db
pnpm prisma migrate dev --name add_new_field

# 3. アプリケーションを起動（自動的にマイグレーションが適用される）
pnpm dev
```

### 本番環境

```bash
# 1. アプリケーションをデプロイ
# 2. 起動時に自動的にマイグレーションが実行される
# 3. 既存のマイグレーションファイルがすべて適用される
```

## 注意事項

1. **開発環境**: 新しいマイグレーションを作成する場合は、`pnpm db:migrate` を手動で実行
2. **本番環境**: 起動時に既存のマイグレーションファイルが自動適用される
3. **エラーハンドリング**: マイグレーションに失敗してもアプリケーションは起動を続ける（ログに警告が出力される）

## トラブルシューティング

### マイグレーションが実行されない

- `AUTO_MIGRATE` 環境変数が `false` になっていないか確認
- ログを確認（`PrismaMigrateService` のログ）

### マイグレーションエラー

- データベース接続が正しいか確認
- マイグレーションファイルが正しいか確認
- 手動でマイグレーションを実行してエラー内容を確認

```bash
cd packages/db
pnpm prisma migrate deploy
```

## 無効化

自動マイグレーションを無効化する場合：

```bash
# .env ファイルに追加
AUTO_MIGRATE=false
```

または、環境変数として設定：

```bash
export AUTO_MIGRATE=false
pnpm dev
```
