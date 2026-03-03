'use client'

import { Control } from 'react-hook-form'
import { FlowerFormData } from '../schemas/FlowerFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormCurrencyInput } from '@/components/form/FormCurrencyInput'
import { FormSelect } from '@/components/form/FormSelect'
import { DELIVERY_OPTIONS } from '../constants/flowerOptions'

type Props = {
    control: Control<FlowerFormData>
}

export function FlowerFormFields({ control }: Props) {
    return (
        <div className="mb-8">
            <h3 className="mb-4">供花情報</h3>
            <div className="grid grid-cols-2 gap-4">
                <FormInput name="requesterName" control={control} label="依頼主" placeholder="例: 山田 太郎" required />
                <FormInput name="labelName" control={control} label="名札" placeholder="例: 山田 太郎" />
                <div className="col-span-2">
                    <FormInput
                        name="jointNames"
                        control={control}
                        label="連名"
                        placeholder="例: 山田 花子、山田 次郎"
                    />
                </div>
                <FormInput name="billToName" control={control} label="請求先名" placeholder="例: 山田 太郎" required />
                <FormInput name="billToTel" control={control} label="請求先TEL" placeholder="例: 090-1234-5678" />
                <div className="col-span-2">
                    <FormInput
                        name="billToAddress"
                        control={control}
                        label="請求先住所"
                        placeholder="例: 東京都〇〇区〇〇1-1-1"
                        required
                    />
                </div>
                <FormSelect
                    name="deliveryTo"
                    control={control}
                    label="配送先"
                    options={DELIVERY_OPTIONS}
                    placeholder="選択してください"
                />
                <FormCurrencyInput name="amount" control={control} label="金額" placeholder="例: 10000" />
            </div>
        </div>
    )
}
