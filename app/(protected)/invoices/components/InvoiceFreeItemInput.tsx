'use client'

import { DocumentFreeItemInput } from '@/components/document/DocumentFreeItemInput'
import { InvoiceFreeItem } from '@/lib/invoices'

type Props = {
    onAdd: (item: Omit<InvoiceFreeItem, 'id' | 'invoiceItemId' | 'sortNo'>) => void
    count: number
}

export function InvoiceFreeItemInput({ onAdd, count }: Props) {
    return <DocumentFreeItemInput onAdd={onAdd} count={count} />
}
