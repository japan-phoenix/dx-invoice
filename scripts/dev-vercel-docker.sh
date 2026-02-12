#!/bin/bash

# Docker ComposeでVercel CLI開発環境を起動するスクリプト

echo "Starting Vercel development environment with Docker..."

cd infra/compose

# 古いコンテナとネットワークをクリーンアップ
echo "Cleaning up old containers and networks..."
docker-compose -f docker-compose.yml -f docker-compose.vercel.yml down 2>/dev/null || true
docker network prune -f

# PostgreSQL + Vercel CLIを起動
echo "Starting containers..."
docker-compose -f docker-compose.yml -f docker-compose.vercel.yml up
