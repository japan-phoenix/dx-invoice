import { useState, useMemo } from 'react'

export interface UsePaginationOptions {
    items: any[]
    itemsPerPage: number
}

export interface UsePaginationReturn {
    currentPage: number
    totalPages: number
    paginatedItems: any[]
    goToPage: (page: number) => void
    nextPage: () => void
    prevPage: () => void
}

/**
 * ページング処理用のカスタムhook
 */
export function usePagination({ items, itemsPerPage }: UsePaginationOptions): UsePaginationReturn {
    const [currentPage, setCurrentPage] = useState(1)

    const { totalPages, paginatedItems } = useMemo(() => {
        const total = Math.ceil(items.length / itemsPerPage)
        const start = (currentPage - 1) * itemsPerPage
        const end = start + itemsPerPage
        const paginated = items.slice(start, end)

        return { totalPages: total, paginatedItems: paginated }
    }, [items, itemsPerPage, currentPage])

    const goToPage = (page: number) => {
        const pageNum = Math.max(1, Math.min(page, totalPages || 1))
        setCurrentPage(pageNum)
    }

    const nextPage = () => {
        goToPage(currentPage + 1)
    }

    const prevPage = () => {
        goToPage(currentPage - 1)
    }

    return {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
        nextPage,
        prevPage,
    }
}
