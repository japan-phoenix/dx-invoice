import { z } from 'zod'

export const estimateItemFieldSchema = z.object({
    qty: z.coerce.number().min(0),
    description: z.string(),
})

export const estimateFormSchema = z.object({
    docNo: z.string(),
    status: z.string(),
    cremationProcessType: z.string(),
    altarPlaceType: z.string(),
    ceilingHeight: z.string(),
    estimateStaff: z.string(),
    ceremonyStaff: z.string(),
    transportStaff: z.string(),
    decorationStaff: z.string(),
    returnStaff: z.string(),
    items: z.array(estimateItemFieldSchema),
})

export type EstimateItemField = z.infer<typeof estimateItemFieldSchema>
export type EstimateFormData = z.infer<typeof estimateFormSchema>

export const DEFAULT_FORM_VALUES: EstimateFormData = {
    docNo: '',
    status: 'DRAFT',
    cremationProcessType: '',
    altarPlaceType: '',
    ceilingHeight: '',
    estimateStaff: '',
    ceremonyStaff: '',
    transportStaff: '',
    decorationStaff: '',
    returnStaff: '',
    items: [],
}
