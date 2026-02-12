#!/bin/bash

# Vercel CLIを使用したローカル開発環境起動スクリプト

echo "Starting Vercel local development environment..."

# Docker ComposeでPostgreSQLを起動
if [ -d "infra/compose" ]; then
  cd infra/compose
  docker-compose up -d postgres
  echo "Waiting for PostgreSQL to be ready..."
  sleep 5
  cd ../..
fi

# Vercel CLIがインストールされているか確認
if ! command -v vercel &> /dev/null; then
  echo "Vercel CLI is not installed. Installing..."
  npm install -g vercel@latest
fi

# 依存関係のインストール（初回のみ）
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  pnpm install
fi

# Prismaクライアント生成
echo "Generating Prisma client..."
pnpm db:generate

# 環境変数の確認
if [ ! -f ".env.local" ]; then
  echo "Creating .env.local from .env.example..."
  if [ -f ".env.example" ]; then
    cp .env.example .env.local
    echo "Please edit .env.local and set your environment variables"
  fi
fi

# Vercel開発サーバー起動
echo "Starting Vercel dev server..."
vercel dev --listen 3000
