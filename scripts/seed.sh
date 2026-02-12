#!/bin/bash

# シードデータを投入するスクリプト

echo "シードデータを投入します..."

cd packages/db
pnpm seed

echo "シードデータの投入が完了しました。"
