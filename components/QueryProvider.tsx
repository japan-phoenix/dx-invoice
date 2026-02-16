'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import QueryClient from '@/lib/queryClient'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={QueryClient}>{children}</QueryClientProvider>
}
