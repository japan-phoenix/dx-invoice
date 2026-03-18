import { useFormContext, useWatch } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormCheckbox } from '@/components/form/FormCheckbox'
import { FormAutocomplete } from '@/components/form/FormAutocomplete'
import { FormInputWithPostalSearch } from '@/components/form/FormInputWithPostalSearch'
import { RELATION_OPTIONS } from '../constants/casesOptions'

export function PayerTab() {
    const {
        control,
        formState: { errors },
    } = useFormContext<CaseFormData>()

    const sameAsChiefMourner = useWatch({
        control,
        name: 'sameAsChiefMourner',
    })

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {/* 喪主と同じ */}
            <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
                <FormCheckbox<CaseFormData> name="sameAsChiefMourner" control={control} label="喪主と同じ" />
            </div>

            {/* 支払者名 */}
            <FormInput<CaseFormData>
                name="payerName"
                control={control}
                label="支払者名"
                error={errors.payerName}
                disabled={sameAsChiefMourner}
            />

            {/* 支払者との関係 */}
            <FormAutocomplete<CaseFormData>
                name="payerRelation"
                control={control}
                label="支払者との関係"
                options={[...RELATION_OPTIONS]}
                error={errors.payerRelation}
                disabled={sameAsChiefMourner}
            />

            {/* 支払者住所 */}
            <div style={{ gridColumn: '1 / -1' }}>
                <FormInputWithPostalSearch<CaseFormData>
                    name="payerAddress"
                    control={control}
                    label="支払者住所"
                    error={errors.payerAddress}
                    disabled={sameAsChiefMourner}
                />
            </div>

            {/* 支払者電話番号 */}
            <FormInput<CaseFormData>
                name="payerTel"
                control={control}
                label="支払者電話番号"
                type="tel"
                error={errors.payerTel}
                disabled={sameAsChiefMourner}
            />
        </div>
    )
}
