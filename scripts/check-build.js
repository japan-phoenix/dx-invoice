#!/usr/bin/env node

/**
 * ビルド後のディレクトリ構成を確認するスクリプト
 * Prisma Clientのバイナリが正しく含まれているかをチェック
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkDirectory(dir, description) {
  log(`\n${description}`, 'cyan');
  log('─'.repeat(50), 'cyan');
  
  if (!fs.existsSync(dir)) {
    log(`❌ ディレクトリが存在しません: ${dir}`, 'red');
    return false;
  }
  
  log(`✅ ディレクトリが存在します: ${dir}`, 'green');
  return true;
}

function findFiles(dir, pattern, maxDepth = 3, currentDepth = 0) {
  const files = [];
  
  if (currentDepth >= maxDepth || !fs.existsSync(dir)) {
    return files;
  }
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        files.push(...findFiles(fullPath, pattern, maxDepth, currentDepth + 1));
      } else if (entry.isFile()) {
        if (pattern.test(entry.name) || pattern.test(fullPath)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    // 権限エラーなどは無視
  }
  
  return files;
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// メイン処理
log('🔍 ビルド後のディレクトリ構成を確認中...', 'blue');
log('='.repeat(50), 'blue');

const projectRoot = path.resolve(__dirname, '..');
const nextDir = path.join(projectRoot, '.next');
const serverDir = path.join(nextDir, 'server');

// 1. .next ディレクトリの確認
if (!checkDirectory(nextDir, '1. .next ディレクトリ')) {
  log('\n❌ ビルドが実行されていません。`pnpm build` を実行してください。', 'red');
  process.exit(1);
}

// 2. .next/server ディレクトリの確認
if (!checkDirectory(serverDir, '2. .next/server ディレクトリ')) {
  log('\n❌ .next/server ディレクトリが存在しません。', 'red');
  process.exit(1);
}

// 3. Prisma Clientのバイナリファイルを検索
log('\n3. Prisma Clientのバイナリファイルを検索中...', 'cyan');
log('─'.repeat(50), 'cyan');

const prismaBinaryPatterns = [
  /libquery_engine.*\.so\.node$/,
  /query-engine.*\.node$/,
  /query-engine.*\.exe$/,
];

let foundBinaries = [];

// .next/server 内を検索
for (const pattern of prismaBinaryPatterns) {
  const files = findFiles(serverDir, pattern, 5);
  foundBinaries.push(...files);
}

// node_modules 内も検索（参考用）
const nodeModulesDir = path.join(projectRoot, 'node_modules');
if (fs.existsSync(nodeModulesDir)) {
  for (const pattern of prismaBinaryPatterns) {
    const files = findFiles(nodeModulesDir, pattern, 4);
    if (files.length > 0) {
      log(`\n📦 node_modules内で見つかったPrismaバイナリ（参考）:`, 'yellow');
      files.slice(0, 5).forEach(file => {
        const size = getFileSize(file);
        log(`   ${path.relative(projectRoot, file)} (${formatSize(size)})`, 'yellow');
      });
    }
  }
}

if (foundBinaries.length > 0) {
  log(`\n✅ .next/server内で${foundBinaries.length}個のPrismaバイナリが見つかりました:`, 'green');
  foundBinaries.forEach(file => {
    const size = getFileSize(file);
    const relativePath = path.relative(projectRoot, file);
    log(`   ✅ ${relativePath} (${formatSize(size)})`, 'green');
  });
} else {
  log(`\n⚠️  .next/server内でPrismaバイナリが見つかりませんでした。`, 'yellow');
  log('   outputFileTracingIncludesの設定を確認してください。', 'yellow');
}

// 4. API Routesの確認
log('\n4. API Routesの確認', 'cyan');
log('─'.repeat(50), 'cyan');

const appApiDir = path.join(serverDir, 'app', 'api');
if (fs.existsSync(appApiDir)) {
  log(`✅ API Routesディレクトリが存在します: ${appApiDir}`, 'green');
  
  // API Routesの一覧を表示
  try {
    const apiRoutes = findFiles(appApiDir, /route\.js$/, 3);
    if (apiRoutes.length > 0) {
      log(`\n   見つかったAPI Routes (${apiRoutes.length}個):`, 'blue');
      apiRoutes.slice(0, 10).forEach(route => {
        const relativePath = path.relative(serverDir, route);
        log(`   - ${relativePath}`, 'blue');
      });
      if (apiRoutes.length > 10) {
        log(`   ... 他 ${apiRoutes.length - 10}個`, 'blue');
      }
    }
  } catch (error) {
    log(`   ⚠️  API Routesの一覧取得に失敗: ${error.message}`, 'yellow');
  }
} else {
  log(`⚠️  API Routesディレクトリが存在しません: ${appApiDir}`, 'yellow');
}

// 5. Prisma Clientの生成確認
log('\n5. Prisma Clientの生成確認', 'cyan');
log('─'.repeat(50), 'cyan');

const prismaClientPaths = [
  path.join(projectRoot, 'node_modules', '.pnpm', '@prisma+client@*', 'node_modules', '.prisma', 'client'),
  path.join(projectRoot, 'packages', 'db', 'node_modules', '.prisma', 'client'),
];

let prismaClientFound = false;
for (const basePath of prismaClientPaths) {
  // ワイルドカードを処理
  if (basePath.includes('*')) {
    const parentDir = path.dirname(basePath.split('*')[0]);
    if (fs.existsSync(parentDir)) {
      try {
        const entries = fs.readdirSync(parentDir);
        for (const entry of entries) {
          if (entry.startsWith('@prisma+client@')) {
            const clientPath = path.join(parentDir, entry, 'node_modules', '.prisma', 'client');
            if (fs.existsSync(clientPath)) {
              log(`✅ Prisma Clientが見つかりました: ${path.relative(projectRoot, clientPath)}`, 'green');
              prismaClientFound = true;
              
              // バイナリファイルを確認
              const binaryFiles = findFiles(clientPath, /\.(so|node|exe)$/, 2);
              if (binaryFiles.length > 0) {
                log(`   バイナリファイル (${binaryFiles.length}個):`, 'blue');
                binaryFiles.forEach(binary => {
                  const size = getFileSize(binary);
                  log(`   - ${path.basename(binary)} (${formatSize(size)})`, 'blue');
                });
              }
            }
          }
        }
      } catch (error) {
        // 無視
      }
    }
  } else {
    if (fs.existsSync(basePath)) {
      log(`✅ Prisma Clientが見つかりました: ${path.relative(projectRoot, basePath)}`, 'green');
      prismaClientFound = true;
    }
  }
}

if (!prismaClientFound) {
  log(`⚠️  Prisma Clientが見つかりませんでした。`, 'yellow');
  log('   `pnpm db:generate` を実行してください。', 'yellow');
}

// 6. サマリー
log('\n' + '='.repeat(50), 'blue');
log('📊 サマリー', 'blue');
log('='.repeat(50), 'blue');

const issues = [];
if (foundBinaries.length === 0) {
  issues.push('Prismaバイナリが.next/server内に見つかりません');
}
if (!prismaClientFound) {
  issues.push('Prisma Clientが生成されていません');
}

if (issues.length === 0) {
  log('\n✅ すべてのチェックが成功しました！', 'green');
  log('   Vercelでのデプロイ準備が整っています。', 'green');
} else {
  log('\n⚠️  以下の問題が見つかりました:', 'yellow');
  issues.forEach((issue, index) => {
    log(`   ${index + 1}. ${issue}`, 'yellow');
  });
  log('\n   対処方法:', 'yellow');
  log('   1. `pnpm db:generate` を実行してPrisma Clientを生成', 'yellow');
  log('   2. `pnpm build` を再実行', 'yellow');
  log('   3. next.config.jsのoutputFileTracingIncludesを確認', 'yellow');
}

process.exit(issues.length === 0 ? 0 : 1);
