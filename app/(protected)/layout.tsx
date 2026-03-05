import type { Metadata } from 'next'
import '../globals.css'
import AuthGuard from '@/components/AuthGuard'
import Navigation from '@/components/Navigation'
import { Providers } from '@/components/QueryProvider'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
    title: '葬儀業務システム',
    description: '葬儀案件管理システム',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <head>
                {/* マテリアルアイコン */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
                    rel="stylesheet"
                />
                {/* Webフォント */}
                {/* Notoゴシック: 請求書のゴシック体部分に使用 */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700;900&display=swap"
                    rel="stylesheet"
                />
                {/* Noto明朝: 請求書の明朝体 部分に使用 */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
                    rel="stylesheet"
                ></link>
            </head>
            <body>
                <Providers>
                    <AuthGuard>
                        <Navigation />
                        {children}
                    </AuthGuard>
                    <Toaster />
                </Providers>
            </body>
        </html>
    )
}
