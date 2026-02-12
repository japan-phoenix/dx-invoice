const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // ワークスペースパッケージをトランスパイル
  transpilePackages: ['@phoenix-jpn/db'],
  
  // Prismaのバイナリファイル(.so.node)をVercelデプロイ時に確実に含めるための設定
  // schema.prismaの binaryTargets で生成されたファイルがデプロイパッケージに含まれるようにする
  outputFileTracingIncludes: {
    '/api/**/*': [
      './node_modules/.prisma/client/**/*',
    ],
    '/*': [
      './node_modules/.prisma/client/**/*',
    ],
  },
  
  // 環境変数
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || (process.env.VERCEL 
      ? '/api'
      : 'http://localhost:3000'),
  },
  
  // Turbopack設定（Next.js 16でTurbopackがデフォルトのため）
  turbopack: {},
  
  // Webpackの設定
  webpack: (config, { isServer }) => {
    // パスエイリアスの設定
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '.'),
    };
    
    // サーバーサイドのみ
    if (isServer) {
      // ワークスペースパッケージの解決
      config.resolve.alias['@phoenix-jpn/db'] = path.resolve(
        __dirname,
        './packages/db/src/index.ts'
      );
    }
    
    return config;
  },
};

module.exports = nextConfig;
