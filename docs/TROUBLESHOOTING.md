# トラブルシューティングガイド

## http://localhost:3000/ に接続できない

### 確認事項

1. **開発サーバーが起動しているか確認**

#### 通常の開発環境（Next.js）の場合

```bash
# プロセスを確認
ps aux | grep next

# または、ポートが使用されているか確認
lsof -i :3000
```

**起動方法**:
```bash
pnpm dev
```

#### Vercel CLIを使用した開発環境の場合

```bash
# Docker Composeの状態を確認
cd infra/compose
docker-compose ps

# ログを確認
docker-compose logs vercel-dev
```

**起動方法**:
```bash
# 方法1: Docker Composeを使用
cd infra/compose
docker-compose -f docker-compose.yml -f docker-compose.vercel.yml up

# 方法2: スクリプトを使用
./scripts/dev-vercel.sh

# 方法3: 手動でVercel CLIを起動
vercel dev
```

### よくある問題と解決方法

#### 1. ポート3000が既に使用されている

```bash
# ポート3000を使用しているプロセスを確認
lsof -i :3000

# プロセスを終了
kill -9 <PID>
```

または、別のポートを使用：
```bash
# Next.js
PORT=3001 pnpm dev

# Vercel CLI
vercel dev --listen 3001
```

#### 2. Docker Composeのコンテナが起動していない

```bash
cd infra/compose

# コンテナの状態を確認
docker-compose ps

# コンテナを起動
docker-compose -f docker-compose.yml -f docker-compose.vercel.yml up

# バックグラウンドで起動
docker-compose -f docker-compose.yml -f docker-compose.vercel.yml up -d

# ログを確認
docker-compose logs -f vercel-dev
```

#### 3. データベース接続エラー

```bash
# PostgreSQLが起動しているか確認
cd infra/compose
docker-compose ps postgres

# PostgreSQLを起動
docker-compose up -d postgres

# 接続を確認
docker-compose exec postgres psql -U user -d funeral_system -c "SELECT 1;"
```

#### 4. マイグレーションが適用されていない

```bash
# マイグレーションを手動で実行
cd packages/db
export DATABASE_URL='postgresql://user:password@localhost:5432/funeral_system?schema=public'
pnpm prisma migrate dev --name init
```

#### 5. 依存関係がインストールされていない

```bash
# 依存関係を再インストール
pnpm install

# Prismaクライアントを再生成
pnpm db:generate
```

### デバッグ手順

1. **ログを確認**
   ```bash
   # Docker Composeの場合
   docker-compose logs -f vercel-dev
   
   # 通常の開発環境の場合
   # ターミナルにエラーメッセージが表示されます
   ```

2. **環境変数を確認**
   ```bash
   # .envファイルが存在するか確認
   ls -la .env
   
   # 環境変数が正しく設定されているか確認
   cat .env
   ```

3. **ネットワーク接続を確認**
   ```bash
   # ローカルホストに接続できるか確認
   curl http://localhost:3000
   
   # またはブラウザで直接アクセス
   open http://localhost:3000
   ```

### 完全なリセット

問題が解決しない場合、完全にリセット：

```bash
# Docker Composeを停止・削除
cd infra/compose
docker-compose down -v

# 依存関係を再インストール
cd ../..
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
pnpm install

# Prismaクライアントを再生成
pnpm db:generate

# データベースをリセット（データが削除されます）
cd packages/db
pnpm prisma migrate reset
pnpm prisma migrate dev --name init
pnpm prisma db seed
```

### サポート

問題が解決しない場合は、以下を確認してください：

1. エラーメッセージの全文
2. 使用している起動方法（`pnpm dev` / `vercel dev` / Docker Compose）
3. 環境（OS、Node.jsバージョン、Dockerバージョン）
