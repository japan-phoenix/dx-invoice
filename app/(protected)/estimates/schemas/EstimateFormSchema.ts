import { z } from 'zod'

export const estimateItemFieldSchema = z.object({
    qty: z.coerce.number().min(1, '必須です').max(99, '数量オーバー'),
    description: z.string(),
})

export const estimateFormSchema = z.object({
    docNo: z.string(),
    status: z.string(),
    isMember: z.string(),
    cremationProcessType: z.string(),
    altarPlaceType: z.string(),
    altarPlaceOther: z.string(),
    ceilingHeight: z.string(),
    estimateStaff: z.string(),
    ceremonyStaff: z.string(),
    transportStaff: z.string(),
    decorationStaff: z.string(),
    returnStaff: z.string(),
    items: z.array(estimateItemFieldSchema).min(1, '明細を選択してください'),
})

export type EstimateItemField = z.infer<typeof estimateItemFieldSchema>
export type EstimateFormData = z.infer<typeof estimateFormSchema>

export const DEFAULT_FORM_VALUES: EstimateFormData = {
    docNo: '',
    status: 'DRAFT',
    isMember: 'false',
    cremationProcessType: '',
    altarPlaceType: '',
    altarPlaceOther: '',
    ceilingHeight: '',
    estimateStaff: '',
    ceremonyStaff: '',
    transportStaff: '',
    decorationStaff: '',
    returnStaff: '',
    items: [],
}
