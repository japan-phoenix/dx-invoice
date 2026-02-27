import { defineConfig, globalIgnores } from 'eslint/config'
import { createRequire } from 'node:module'
import globals from 'globals'

const require = createRequire(import.meta.url)
const nextConfig = require('eslint-config-next')

export default defineConfig([
    globalIgnores(['node_modules/**', '.next/**', 'dist/**']),
    ...nextConfig,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                },
            ],
            'react-hooks/set-state-in-effect': 'warn',
        },
    },
    {
        files: ['**/*.js', '**/*.cjs'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
])
