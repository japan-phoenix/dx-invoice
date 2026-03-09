import { z } from 'zod'

export const invoiceItemFieldSchema = z.object({
    qty: z.coerce.number().min(1, '必須です').max(99, '数量オーバー'),
    description: z.string(),
})

export const invoiceFormSchema = z.object({
    docNo: z.string(),
    status: z.string(),
    cremationProcessType: z.string(),
    altarPlaceType: z.string(),
    altarPlaceOther: z.string(),
    ceilingHeight: z.string(),
    estimateStaff: z.string(),
    ceremonyStaff: z.string(),
    transportStaff: z.string(),
    decorationStaff: z.string(),
    returnStaff: z.string(),
    items: z.array(invoiceItemFieldSchema).min(1, '明細を選択してください'),
})

export type InvoiceItemField = z.infer<typeof invoiceItemFieldSchema>
export type InvoiceFormData = z.infer<typeof invoiceFormSchema>

export const DEFAULT_INVOICE_FORM_VALUES: InvoiceFormData = {
    docNo: '',
    status: 'DRAFT',
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
