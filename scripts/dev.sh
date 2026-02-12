#!/bin/bash

# 開発サーバー起動スクリプト

echo "Starting development servers..."

# Docker ComposeでPostgreSQLを起動
if [ -d "infra/compose" ]; then
  cd infra/compose
  docker-compose up -d
  cd ../..
  echo "PostgreSQL started"
fi

# 依存関係のインストール（初回のみ）
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  pnpm install
fi

# Prismaクライアント生成
echo "Generating Prisma client..."
pnpm db:generate

# マイグレーション実行（初回のみ、またはスキーマ変更時）
if [ "$AUTO_MIGRATE" != "false" ]; then
  echo "Running database migrations..."
  cd packages/db
  pnpm prisma migrate deploy || echo "Migration failed or no pending migrations"
  cd ../..
fi

# 開発サーバー起動
echo "Starting Next.js..."
pnpm dev
