import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        include: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],
        exclude: ['node_modules', '.next', 'packages/db'],
        coverage: {
            provider: 'v8',
            include: ['lib/**/*.ts', 'app/**/schemas/*.ts', 'app/**/utils/*.ts'],
            exclude: ['lib/prisma.ts', 'lib/puppeteer.ts', 'lib/migrate.ts'],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
        },
    },
})
