# 本番環境でのマイグレーション実行ガイド

本番環境でのマイグレーション実行方法と推奨設定を説明します。

## 実行方法の比較

### 方法1: アプリ起動時に自動実行

**設定**:
```bash
AUTO_MIGRATE=true
```

**メリット**:
- ✅ デプロイ時に自動的にDBが最新化される
- ✅ 手動操作が不要
- ✅ シンプル

**デメリット**:
- ⚠️ 複数インスタンスが同時起動すると、マイグレーションが競合する可能性
- ⚠️ マイグレーションエラー時の対応が難しい
- ⚠️ ロールバックが困難

**推奨**: 小規模アプリケーション、単一インスタンス、またはVercelのようなシングルインスタンス環境

### 方法2: CI/CDパイプラインで実行（推奨）

**設定**:
```bash
AUTO_MIGRATE=false
```

**メリット**:
- ✅ マイグレーションを確実に1回だけ実行
- ✅ デプロイ前にマイグレーションを確認できる
- ✅ ロールバックが容易
- ✅ 複数インスタンス環境でも安全

**デメリット**:
- ⚠️ CI/CDの設定が必要

**推奨**: 大規模アプリケーション、複数インスタンス環境、本番環境

### 方法3: 手動実行（最も安全）

**設定**:
```bash
AUTO_MIGRATE=false
```

**メリット**:
- ✅ 完全な制御
- ✅ デプロイ前にテスト可能
- ✅ 最も安全

**デメリット**:
- ⚠️ 手動操作が必要
- ⚠️ 忘れる可能性

**推奨**: 重要な本番環境、慎重な運用が必要な場合

## 推奨構成

### Vercel（Next.js）の場合

**推奨**: 方法2（CI/CDパイプライン）

1. GitHub Actionsでマイグレーションを実行
2. 成功後にVercelにデプロイ
3. アプリ起動時の自動マイグレーションは無効化

```bash
# Vercel環境変数
AUTO_MIGRATE=false
```

### その他のホスティングサービスの場合

**推奨**: 方法1（アプリ起動時）または方法2（CI/CD）

- 単一インスタンス: 方法1（`AUTO_MIGRATE=true`）
- 複数インスタンス: 方法2（`AUTO_MIGRATE=false` + CI/CD）

## 実装例

### GitHub Actionsでの自動マイグレーション

`.github/workflows/deploy.yml` を参照してください。

```yaml
jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - name: Run database migrations
        run: cd packages/db && pnpm prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
  
  deploy:
    needs: migrate  # マイグレーション成功後にデプロイ
    # ...
```

### アプリ起動時の自動マイグレーション

現在の実装では、`AUTO_MIGRATE=true` の場合、アプリ起動時に自動実行されます。

## ベストプラクティス

1. **開発環境**: `AUTO_MIGRATE=true`（自動実行）
2. **本番環境**: `AUTO_MIGRATE=false` + CI/CDパイプライン（推奨）
3. **ステージング環境**: 本番環境と同じ設定でテスト

## トラブルシューティング

### マイグレーション競合エラー

複数インスタンスが同時にマイグレーションを実行した場合：

```
Error: Migration engine error: migration `xxx` is already applied
```

**対処法**:
- `AUTO_MIGRATE=false` に設定
- CI/CDパイプラインで実行

### マイグレーション失敗時のロールバック

1. マイグレーションファイルを確認
2. 必要に応じて手動で修正
3. 再度デプロイ

## 参考

- [自動マイグレーション機能](AUTO_MIGRATION.md)
- [マイグレーションガイド](MIGRATION_GUIDE.md)
