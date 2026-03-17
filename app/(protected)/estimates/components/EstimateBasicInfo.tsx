'use client'

import { Control } from 'react-hook-form'
import { EstimateFormData } from '../schemas/EstimateFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormSelect } from '@/components/form/FormSelect'
import { STATUS_OPTIONS } from '../constants/estimateOptions'

type Props = {
    control: Control<EstimateFormData>
}

export function EstimateBasicInfo({ control }: Props) {
    return (
        <div className="mb-8">
            <h3 className="mb-4">基本情報</h3>
            <div className="grid grid-cols-2 gap-4">
                <FormInput name="docNo" control={control} label="見積番号" placeholder="例: EST-0001" />
                <FormSelect
                    name="isMember"
                    control={control}
                    label="一般・会員"
                    options={[
                        { value: 'false', label: '一般' },
                        { value: 'true', label: '会員' },
                    ]}
                />
                <FormSelect name="status" control={control} label="見積区分" options={STATUS_OPTIONS} />
            </div>
        </div>
    )
}
