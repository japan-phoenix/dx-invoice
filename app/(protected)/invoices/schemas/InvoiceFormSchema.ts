import { z } from 'zod'

export const invoiceItemFieldSchema = z.object({
    qty: z.coerce.number().min(1, '必須です').max(99, '数量オーバー'),
    description: z.string(),
})

export const invoiceFreeItemFieldSchema = z.object({
    description: z.string(),
    qty: z.coerce.number().min(1),
})

export const invoiceFormSchema = z.object({
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
    items: z.array(invoiceItemFieldSchema).min(1, '明細を選択してください'),
    freeItems: z.array(invoiceFreeItemFieldSchema),
})

export type InvoiceItemField = z.infer<typeof invoiceItemFieldSchema>
export type InvoiceFreeItemField = z.infer<typeof invoiceFreeItemFieldSchema>
export type InvoiceFormData = z.infer<typeof invoiceFormSchema>

export const DEFAULT_INVOICE_FORM_VALUES: InvoiceFormData = {
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
    freeItems: [],
}
