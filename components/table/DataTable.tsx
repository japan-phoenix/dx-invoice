import React, { useState, useMemo } from 'react'
import { usePagination } from './usePagination'

export type SortDirection = 'asc' | 'desc'

export interface ColumnDef<T> {
    key: string
    label: string
    width?: string
    sortable?: boolean
    sortValue?: (item: T) => string | number | null | undefined
    render?: (item: T) => React.ReactNode
}

export interface ActionColumn<T> {
    key: string
    label?: string
    width?: string
    render: (item: T, index: number) => React.ReactNode
}

export interface DataTableProps<T> {
    columns: ColumnDef<T>[]
    actionColumn?: ActionColumn<T>
    data: T[]
    itemsPerPage?: number
    onRowClick?: (item: T) => void
    emptyMessage?: string
    rowKey: (item: T, index: number) => string | number
}

/**
 * ページング対応の汎用テーブルコンポーネント
 * 右側の操作カラムは固定化、その他のカラムは横スクロール対応
 */
export function DataTable<T>({
    columns,
    actionColumn,
    data,
    itemsPerPage = 10,
    onRowClick,
    emptyMessage = 'データがありません',
    rowKey,
}: DataTableProps<T>) {
    const [sortKey, setSortKey] = useState<string | null>(null)
    const [sortDir, setSortDir] = useState<SortDirection>('asc')

    const handleSortClick = (col: ColumnDef<T>) => {
        if (!col.sortable) return
        if (sortKey === col.key) {
            setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
        } else {
            setSortKey(col.key)
            setSortDir('asc')
        }
    }

    const sortedData = useMemo(() => {
        if (!sortKey) return data
        const col = columns.find((c) => c.key === sortKey)
        if (!col) return data
        return [...data].sort((a, b) => {
            const va = col.sortValue ? col.sortValue(a) : (a as any)[sortKey]
            const vb = col.sortValue ? col.sortValue(b) : (b as any)[sortKey]
            if (va == null && vb == null) return 0
            if (va == null) return 1
            if (vb == null) return -1
            if (va < vb) return sortDir === 'asc' ? -1 : 1
            if (va > vb) return sortDir === 'asc' ? 1 : -1
            return 0
        })
    }, [data, sortKey, sortDir, columns])

    const { currentPage, totalPages, paginatedItems, goToPage, prevPage, nextPage } = usePagination({
        items: sortedData,
        itemsPerPage,
    })

    return (
        <div className="flex flex-col">
            {/* テーブル部分 */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* 横スクロール可能エリア */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full border-collapse bg-white">
                        <thead>
                            <tr className="sticky top-0 z-10 bg-gray-100">
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        className={`border-b border-gray-200 px-3 py-3 text-left ${
                                            col.sortable ? 'cursor-pointer select-none hover:bg-gray-200' : ''
                                        }`}
                                        style={{
                                            width: col.width,
                                            minWidth: '100px',
                                        }}
                                        onClick={() => handleSortClick(col)}
                                    >
                                        <span className="inline-flex items-center gap-1">
                                            {col.label}
                                            {col.sortable && (
                                                <span className="text-xs text-gray-400">
                                                    {sortKey === col.key ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}
                                                </span>
                                            )}
                                        </span>
                                    </th>
                                ))}
                                {actionColumn && (
                                    <th
                                        className="sticky right-0 z-20 border-b border-l border-gray-200 bg-gray-100 px-3 py-3 text-center"
                                        style={{
                                            width: actionColumn.width || '150px',
                                            minWidth: '150px',
                                        }}
                                    >
                                        {actionColumn.label || '操作'}
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedItems.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length + (actionColumn ? 1 : 0)}
                                        className="border-0 px-8 py-8 text-center text-gray-500"
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            ) : (
                                paginatedItems.map((item, index) => (
                                    <tr
                                        key={rowKey(item, index)}
                                        onClick={() => onRowClick?.(item)}
                                        className={`transition-colors duration-200 ${onRowClick ? 'cursor-pointer hover:bg-blue-50' : ''}`}
                                    >
                                        {columns.map((col) => (
                                            <td
                                                key={`${rowKey(item, index)}-${col.key}`}
                                                className="border-b border-gray-200 px-3 py-3"
                                                style={{
                                                    width: col.width,
                                                }}
                                            >
                                                {col.render ? col.render(item) : (item as any)[col.key]}
                                            </td>
                                        ))}
                                        {actionColumn && (
                                            <td
                                                className="sticky right-0 z-10 border-b border-l border-gray-200 bg-white px-3 py-3 text-center"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {actionColumn.render(item, index)}
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ページネーション部分 */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 border-t border-gray-200 bg-gray-50 px-4 py-4">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`rounded px-4 py-2 transition-colors ${
                            currentPage === 1
                                ? 'cursor-not-allowed bg-gray-300 text-white'
                                : 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        前へ
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`rounded px-3 py-2 text-sm transition-colors ${
                                    currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-black hover:bg-gray-300'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`rounded px-4 py-2 transition-colors ${
                            currentPage === totalPages
                                ? 'cursor-not-allowed bg-gray-300 text-white'
                                : 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        次へ
                    </button>

                    <span className="ml-4 text-sm text-gray-600">
                        {currentPage} / {totalPages} ページ
                    </span>
                </div>
            )}
        </div>
    )
}
