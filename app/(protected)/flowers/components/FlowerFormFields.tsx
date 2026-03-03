'use client'

import { useEffect } from 'react'
import { Control, useFormContext, useWatch } from 'react-hook-form'
import { FlowerFormData } from '../schemas/FlowerFormSchema'
import { FlowerBillingTarget } from '@/lib/flowers'
import { FormInput } from '@/components/form/FormInput'
import { FormCurrencyInput } from '@/components/form/FormCurrencyInput'
import { FormSelect } from '@/components/form/FormSelect'
import { FormInputWithPostalSearch } from '@/components/form/FormInputWithPostalSearch'
import { DELIVERY_OPTIONS } from '../constants/flowerOptions'

type Props = {
    control: Control<FlowerFormData>
    billingTargets: FlowerBillingTarget[]
}

export function FlowerFormFields({ control, billingTargets }: Props) {
    const { setValue } = useFormContext<FlowerFormData>()
    const selectedTargetId = useWatch({ control, name: 'flowerBillingTargetId' })

    // 請求先が選択されたとき、表示用フィールドを自動補完
    useEffect(() => {
        if (!selectedTargetId) return
        const target = billingTargets.find((t) => t.id === selectedTargetId)
        if (target) {
            setValue('billToName', target.billToName)
            setValue('billToAddress', target.billToAddress)
            setValue('billToTel', target.billToTel || '')
        }
    }, [selectedTargetId, billingTargets, setValue])

    return (
        <div className="mb-4">
            <h3 className="mb-4">供花情報</h3>
            <div className="grid grid-cols-2 gap-4">
                {/* 請求先選択 */}
                <div className="col-span-2">
                    <FormSelect
                        name="flowerBillingTargetId"
                        control={control}
                        label="請求先"
                        options={billingTargets.map((t) => ({
                            value: t.id,
                            label: `${t.billToName}　${t.billToAddress}`,
                        }))}
                        placeholder="請求先を選択してください"
                        required
                    />
                </div>

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

                {/* 表示用請求先情報（請求先選択から自動入力・変更可） */}
                <div className="col-span-2">
                    <p className="mb-2 text-sm text-gray-500">
                        ※ 以下は請求書に印刷される表示用の情報です。選択した請求先から自動入力されますが、変更可能です。
                    </p>
                </div>

                <FormInput
                    name="billToName"
                    control={control}
                    label="請求先名（表示用）"
                    placeholder="例: 山田 太郎"
                    required
                />
                <FormInput
                    name="billToTel"
                    control={control}
                    label="請求先TEL（表示用）"
                    placeholder="例: 090-1234-5678"
                />
                <div className="col-span-2">
                    <FormInputWithPostalSearch
                        name="billToAddress"
                        control={control}
                        label="請求先住所（表示用）"
                        placeholder="例: 沖縄県那覇市○○1-1-1（郵便番号から検索）"
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
                <FormCurrencyInput name="amount" control={control} label="金額" suffix="円" />
            </div>
        </div>
    )
}
