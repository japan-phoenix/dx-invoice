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
    hideTargetFields?: boolean
}

export function FlowerFormFields({ control, billingTargets, hideTargetFields = false }: Props) {
    const { setValue } = useFormContext<FlowerFormData>()
    const selectedTargetId = useWatch({ control, name: 'flowerBillingTargetId' })

    // 請求先選択変更時: 選択→自動補完、未選択に戻した→クリア
    // hideTargetFields=true（編集or追加ボタン経由）のときはフィールドを操作しない
    useEffect(() => {
        if (hideTargetFields) return
        if (!selectedTargetId) {
            setValue('billToName', '')
            setValue('billToAddress', '')
            setValue('billToTel', '')
            return
        }
        const target = billingTargets.find((t) => t.id === selectedTargetId)
        if (target) {
            setValue('billToName', target.billToName)
            setValue('billToAddress', target.billToAddress)
            setValue('billToTel', target.billToTel || '')
        }
    }, [selectedTargetId, billingTargets, setValue, hideTargetFields])

    return (
        <div className="mb-4">
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

                {/* 請求先選択 / 請求先情報: hideTargetFields=true のとき非表示 */}
                {!hideTargetFields && (
                    <>
                        <div className="col-span-2">
                            <FormSelect
                                name="flowerBillingTargetId"
                                control={control}
                                label="請求先"
                                options={billingTargets.map((t) => ({
                                    value: t.id,
                                    label: `${t.billToName}　${t.billToAddress}`,
                                }))}
                                placeholder="登録済みの請求先を選択"
                            />
                        </div>
                        <FormInput
                            name="billToName"
                            control={control}
                            label="請求先名"
                            placeholder="例: 山田 太郎"
                            required
                        />
                        <FormInput
                            name="billToTel"
                            control={control}
                            label="請求先TEL"
                            placeholder="例: 090-1234-5678"
                        />
                        <div className="col-span-2">
                            <FormInputWithPostalSearch
                                name="billToAddress"
                                control={control}
                                label="請求先住所"
                                placeholder="例: 沖縄県那覇市○○1-1-1（郵便番号から検索）"
                                required
                            />
                        </div>
                    </>
                )}

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
