'use client'

import { Control } from 'react-hook-form'
import { EstimateFormData } from '../schemas/EstimateFormSchema'
import { DocumentOtherFields } from '@/components/document/DocumentOtherFields'
import type { DocumentFormData } from '@/components/document/DocumentItemTable'

type Props = {
    control: Control<EstimateFormData>
}

export function EstimateOtherFields({ control }: Props) {
    return <DocumentOtherFields control={control as unknown as Control<DocumentFormData>} />
}
