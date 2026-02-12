#!/bin/bash

# データベースをリセットして初期化するスクリプト

echo "データベースをリセットします..."

cd packages/db

# マイグレーションをリセット
echo "マイグレーションをリセット中..."
pnpm prisma migrate reset --force

# マイグレーションを実行
echo "マイグレーションを実行中..."
pnpm prisma migrate dev

# シードデータを投入
echo "シードデータを投入中..."
pnpm seed

echo "データベースのリセットが完了しました。"
