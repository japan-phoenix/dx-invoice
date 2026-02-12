#!/bin/sh

# Prisma migrate deployを実行するスクリプト
# アプリケーション起動時に呼び出される

cd "$(dirname "$0")/.."
pnpm prisma migrate deploy
