'use client'

import { useFormContext } from 'react-hook-form'
import { FormInput } from '@/components/form/FormInput'
import { FormSelect } from '@/components/form/FormSelect'
import { CompanyFormData } from '../schemas/CompanyFormSchema'
import { BANK_TYPE_OPTIONS } from '../constants/companyOptions'

export function BasicInfoSection() {
    const {
        control,
        formState: { errors },
    } = useFormContext<CompanyFormData>()

    return (
        <section className="mb-6 rounded-lg border bg-white p-8">
            <h2 className="mb-6 text-xl font-semibold">基本情報</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <FormInput name="companyNo" control={control} label="会社番号" error={errors.companyNo} />
                </div>
                <div />
                <div className="col-span-2">
                    <FormInput
                        name="companyName"
                        control={control}
                        label="会社名"
                        required
                        error={errors.companyName}
                    />
                </div>
                <div className="col-span-2">
                    <FormInput
                        name="companyAddress"
                        control={control}
                        label="住所"
                        required
                        error={errors.companyAddress}
                    />
                </div>
                <div>
                    <FormInput
                        name="companyTel"
                        control={control}
                        label="TEL"
                        type="tel"
                        required
                        error={errors.companyTel}
                    />
                </div>
                <div>
                    <FormInput name="companyFax" control={control} label="FAX" type="tel" error={errors.companyFax} />
                </div>
                <div>
                    <FormInput name="repTitle" control={control} label="代表者役職" error={errors.repTitle} />
                </div>
                <div>
                    <FormInput name="repName" control={control} label="代表者名" error={errors.repName} />
                </div>
            </div>
        </section>
    )
}

type BankNumber = 1 | 2 | 3 | 4

function BankSection({ bankNumber }: { bankNumber: BankNumber }) {
    const {
        control,
        formState: { errors },
    } = useFormContext<CompanyFormData>()

    const prefix = `bank${bankNumber}` as const

    return (
        <div className="mb-4 rounded-lg border p-6">
            <h3 className="mb-4 font-semibold">振込先{bankNumber}</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <FormInput
                        name={`${prefix}Name`}
                        control={control}
                        label="銀行名"
                        error={errors[`${prefix}Name`]}
                    />
                </div>
                <div>
                    <FormInput
                        name={`${prefix}Branch`}
                        control={control}
                        label="支店名"
                        error={errors[`${prefix}Branch`]}
                    />
                </div>
                <div>
                    <FormSelect
                        name={`${prefix}Type`}
                        control={control}
                        label="口座種別"
                        options={BANK_TYPE_OPTIONS}
                        placeholder="選択してください"
                        error={errors[`${prefix}Type`]}
                    />
                </div>
                <div>
                    <FormInput
                        name={`${prefix}Account`}
                        control={control}
                        label="口座番号"
                        error={errors[`${prefix}Account`]}
                    />
                </div>
                <div className="col-span-2">
                    <FormInput
                        name={`${prefix}Holder`}
                        control={control}
                        label="口座名義"
                        error={errors[`${prefix}Holder`]}
                    />
                </div>
            </div>
        </div>
    )
}

export function BankInfoSection() {
    return (
        <section className="mb-6 rounded-lg border bg-white p-8">
            <h2 className="mb-6 text-xl font-semibold">振込先情報（最大4件）</h2>
            {([1, 2, 3, 4] as BankNumber[]).map((n) => (
                <BankSection key={n} bankNumber={n} />
            ))}
        </section>
    )
}
