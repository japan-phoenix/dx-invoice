# Docker Compose設定

## 基本的な使用方法

### PostgreSQLのみ起動

```bash
docker-compose up -d
```

### PostgreSQL + Vercel CLI開発環境

```bash
docker-compose -f docker-compose.yml -f docker-compose.vercel.yml up
```

## サービス

### postgres

PostgreSQLデータベースサーバー

- ポート: 5432
- ユーザー: user
- パスワード: password
- データベース: funeral_system

### vercel-dev

Vercel CLIを使用したローカル開発環境

- ポート: 3000 (Next.js)
- 自動的に依存関係をインストール
- Prismaクライアントを生成
- Vercel開発サーバーを起動

## 環境変数

環境変数は `docker-compose.vercel.yml` で設定されています。

ローカルで変更する場合は、`.env` ファイルを作成して上書きできます。

## トラブルシューティング

### コンテナが起動しない

```bash
# ログを確認
docker-compose logs vercel-dev

# コンテナを再起動
docker-compose restart vercel-dev
```

### ボリュームのクリア

```bash
# データベースボリュームを削除
docker-compose down -v
```

### ポートが使用中

`docker-compose.yml` のポート番号を変更してください。
