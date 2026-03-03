import { z } from 'zod'

// 請求先フォームスキーマ
export const billingTargetFormSchema = z.object({
    billToName: z.string().min(1, '請求先名は必須です'),
    billToAddress: z.string().min(1, '請求先住所は必須です'),
    billToTel: z.string(),
})

export type BillingTargetFormData = z.infer<typeof billingTargetFormSchema>

export const BILLING_TARGET_DEFAULT: BillingTargetFormData = {
    billToName: '',
    billToAddress: '',
    billToTel: '',
}

// 供花フォームスキーマ
export const flowerFormSchema = z.object({
    flowerBillingTargetId: z.string().min(1, '請求先を選択してください'),
    requesterName: z.string().min(1, '依頼主は必須です'),
    labelName: z.string(),
    jointNames: z.string(),
    billToName: z.string().min(1, '請求先名（表示用）は必須です'),
    billToAddress: z.string().min(1, '請求先住所（表示用）は必須です'),
    billToTel: z.string(),
    deliveryTo: z.string(),
    amount: z.coerce.number().min(0, '金額は0以上で入力してください'),
})

export type FlowerFormData = z.infer<typeof flowerFormSchema>

export const DEFAULT_FORM_VALUES: FlowerFormData = {
    flowerBillingTargetId: '',
    requesterName: '',
    labelName: '',
    jointNames: '',
    billToName: '',
    billToAddress: '',
    billToTel: '',
    deliveryTo: '',
    amount: 0,
}
