import type { Metadata } from 'next'
import '../globals.css'
import AuthGuard from '@/components/AuthGuard'
import Navigation from '@/components/Navigation'
import { Providers } from '@/components/QueryProvider'

export const metadata: Metadata = {
    title: '葬儀業務システム',
    description: '葬儀案件管理システム',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
            </head>
            <body>
                <Providers>
                    <AuthGuard>
                        <Navigation />
                        {children}
                    </AuthGuard>
                </Providers>
            </body>
        </html>
    )
}
