# データベース接続エラー: `database "user" does not exist`

## エラーの説明

このエラーは、PostgreSQLが`user`というデータベース名を探していることを示しています。

```
phoenix-jpn-db | FATAL: database "user" does not exist
```

## 原因

PostgreSQLの接続文字列（DATABASE_URL）のパースに問題がある可能性があります。

正しい形式：
```
postgresql://username:password@host:port/database?schema=public
```

例：
```
postgresql://user:password@postgres:5432/funeral_system?schema=public
```

ここで：
- `user` = ユーザー名（username）
- `password` = パスワード
- `postgres` = ホスト名
- `5432` = ポート番号
- `funeral_system` = **データベース名**

## 解決方法

### 1. DATABASE_URLの形式を確認

環境変数`DATABASE_URL`が正しく設定されているか確認してください：

```bash
echo $DATABASE_URL
```

正しい形式：
```
postgresql://user:password@postgres:5432/funeral_system?schema=public
```

### 2. データベースが存在するか確認

```bash
# Docker ComposeでPostgreSQLに接続
docker exec -it phoenix-jpn-db psql -U user -d funeral_system -c "\l"
```

### 3. データベースを再作成（必要に応じて）

```bash
# Docker Composeを停止
cd infra/compose
docker-compose down -v

# 再起動
docker-compose up -d
```

### 4. 環境変数を明示的に設定

Docker Composeの設定で、環境変数を明示的に設定してください：

```yaml
environment:
  - DATABASE_URL=postgresql://user:password@postgres:5432/funeral_system?schema=public
```

## よくある間違い

### ❌ 間違った形式

```
postgresql://user:password@postgres:5432/user?schema=public
```
→ データベース名が`user`になっている（間違い）

### ✅ 正しい形式

```
postgresql://user:password@postgres:5432/funeral_system?schema=public
```
→ データベース名が`funeral_system`（正しい）

## トラブルシューティング

### PrismaがDATABASE_URLを読み取れない場合

```bash
# 環境変数を明示的にエクスポート
export DATABASE_URL='postgresql://user:password@postgres:5432/funeral_system?schema=public'

# Prismaコマンドを実行
cd packages/db
pnpm prisma migrate dev
```

### 接続をテスト

```bash
# PostgreSQLに直接接続してテスト
docker exec -it phoenix-jpn-db psql -U user -d funeral_system -c "SELECT 1;"
```

## 参考

- [PostgreSQL接続文字列の形式](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
- [Prisma DATABASE_URL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
