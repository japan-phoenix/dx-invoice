#!/bin/bash

# Docker Composeのクリーンアップスクリプト

echo "Cleaning up Docker Compose..."

# コンテナを停止・削除
docker-compose -f docker-compose.yml -f docker-compose.vercel.yml down

# 古いネットワークを削除
docker network prune -f

# 未使用のボリュームを削除（オプション、データが削除されます）
# docker volume prune -f

echo "Cleanup complete!"
