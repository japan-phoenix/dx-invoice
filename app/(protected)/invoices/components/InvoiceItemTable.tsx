'use client'

import { Control, FieldArrayWithId } from 'react-hook-form'
import { InvoiceItem, InvoiceFreeItem } from '@/lib/invoices'
import { InvoiceFormData } from '../schemas/InvoiceFormSchema'
import { DocumentItemTable } from '@/components/document/DocumentItemTable'
import type { DocumentFormData } from '@/components/document/DocumentItemTable'

type Props = {
    items: InvoiceItem[]
    fields: FieldArrayWithId<InvoiceFormData, 'items', 'id'>[]
    control: Control<InvoiceFormData>
    handleRemoveItem: (index: number) => void
    isMember: boolean
    freeItems?: InvoiceFreeItem[]
    freeFields?: FieldArrayWithId<InvoiceFormData, 'freeItems', 'id'>[]
    handleRemoveFreeItem?: (index: number) => void
}

export function InvoiceItemTable({ control, fields, freeFields, ...rest }: Props) {
    return (
        <DocumentItemTable
            {...rest}
            control={control as unknown as Control<DocumentFormData>}
            fields={fields as unknown as FieldArrayWithId<DocumentFormData, 'items', 'id'>[]}
            freeFields={freeFields as unknown as FieldArrayWithId<DocumentFormData, 'freeItems', 'id'>[]}
        />
    )
}
