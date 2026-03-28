'use client'

import { Control, FieldArrayWithId } from 'react-hook-form'
import { EstimateItem, EstimateFreeItem } from '@/lib/estimates'
import { EstimateFormData } from '../schemas/EstimateFormSchema'
import { DocumentItemTable } from '@/components/document/DocumentItemTable'
import type { DocumentFormData } from '@/components/document/DocumentItemTable'

type Props = {
    items: EstimateItem[]
    fields: FieldArrayWithId<EstimateFormData, 'items', 'id'>[]
    control: Control<EstimateFormData>
    handleRemoveItem: (index: number) => void
    isMember: boolean
    freeItems?: EstimateFreeItem[]
    freeFields?: FieldArrayWithId<EstimateFormData, 'freeItems', 'id'>[]
    handleRemoveFreeItem?: (index: number) => void
    readOnly?: boolean
}

export function EstimateItemTable({ control, fields, freeFields, ...rest }: Props) {
    return (
        <DocumentItemTable
            {...rest}
            control={control as unknown as Control<DocumentFormData>}
            fields={fields as unknown as FieldArrayWithId<DocumentFormData, 'items', 'id'>[]}
            freeFields={freeFields as unknown as FieldArrayWithId<DocumentFormData, 'freeItems', 'id'>[]}
        />
    )
}
