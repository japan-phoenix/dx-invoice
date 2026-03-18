'use client'

import { DocumentFreeItemInput } from '@/components/document/DocumentFreeItemInput'
import { EstimateFreeItem } from '@/lib/estimates'

type Props = {
    onAdd: (item: Omit<EstimateFreeItem, 'id' | 'estimateItemId' | 'sortNo'>) => void
    count: number
}

export function EstimateFreeItemInput({ onAdd, count }: Props) {
    return <DocumentFreeItemInput onAdd={onAdd} count={count} />
}
