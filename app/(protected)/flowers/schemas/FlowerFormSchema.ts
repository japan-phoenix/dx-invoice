import { z } from 'zod'

export const flowerFormSchema = z.object({
    requesterName: z.string().min(1, '依頼主は必須です'),
    labelName: z.string(),
    jointNames: z.string(),
    billToName: z.string().min(1, '請求先名は必須です'),
    billToAddress: z.string().min(1, '請求先住所は必須です'),
    billToTel: z.string(),
    deliveryTo: z.string(),
    amount: z.coerce.number().min(0, '金額は0以上で入力してください'),
})

export type FlowerFormData = z.infer<typeof flowerFormSchema>

export const DEFAULT_FORM_VALUES: FlowerFormData = {
    requesterName: '',
    labelName: '',
    jointNames: '',
    billToName: '',
    billToAddress: '',
    billToTel: '',
    deliveryTo: '',
    amount: 0,
}
