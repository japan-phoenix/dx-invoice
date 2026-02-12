// Next.js起動時にマイグレーションを実行するユーティリティ
// サーバーサイドでのみ実行

import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execAsync = promisify(exec);

export async function runMigrations() {
  // クライアントサイドでは実行しない
  if (typeof window !== 'undefined') {
    return;
  }

  // 環境変数でマイグレーション自動実行を制御
  const autoMigrate = process.env.AUTO_MIGRATE !== 'false';
  
  if (!autoMigrate) {
    console.log('Auto migration is disabled (AUTO_MIGRATE=false)');
    return;
  }

  try {
    console.log('Running database migrations...');
    
    // パスを解決（実行時のカレントディレクトリに依存しない）
    const dbPath = path.resolve(process.cwd(), './packages/db');
    
    // まず、失敗したマイグレーションを解決を試みる
    try {
      console.log('Checking for failed migrations...');
      await execAsync(
        `cd ${dbPath} && pnpm prisma migrate resolve --applied 20260202020902_init`,
        {
          env: {
            ...process.env,
            DATABASE_URL: process.env.DATABASE_URL,
          },
          cwd: process.cwd(),
        }
      );
    } catch (resolveError: any) {
      // マイグレーションが既に解決されているか、存在しない場合は無視
      if (!resolveError.message.includes('not found') && !resolveError.message.includes('already')) {
        console.warn('Failed to resolve migration (may already be resolved):', resolveError.message);
      }
    }
    
    // マイグレーションをデプロイ
    const { stdout, stderr } = await execAsync(
      `cd ${dbPath} && pnpm prisma migrate deploy`,
      {
        env: {
          ...process.env,
          DATABASE_URL: process.env.DATABASE_URL,
        },
        cwd: process.cwd(),
      }
    );

    if (stdout) {
      console.log(stdout);
    }
    if (stderr && !stderr.includes('No pending migrations')) {
      console.warn(stderr);
    }

    console.log('Database migrations completed successfully');
  } catch (error: any) {
    console.error('Failed to run migrations:', error.message);
    console.warn('Application will continue to start, but database may not be up to date');
  }
}
