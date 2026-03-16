import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'
import { FormAutocomplete } from '@/components/form/FormAutocomplete'
import { PICKUP_PLACE_OPTIONS } from '../constants/casesOptions'

export function FuneralTab() {
    const {
        control,
        formState: { errors },
    } = useFormContext<CaseFormData>()

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {/* 引取場所 */}
            <div style={{ gridColumn: '1 / -1' }}>
                <FormAutocomplete<CaseFormData>
                    name="pickupPlace"
                    control={control}
                    label="引取場所"
                    options={[...PICKUP_PLACE_OPTIONS]}
                    error={errors.pickupPlace}
                />
            </div>

            {/* 通夜日時 */}
            <FormInput<CaseFormData>
                name="wakeAt"
                control={control}
                label="通夜日時"
                type="datetime-local"
                minYear={1950}
                maxYear={new Date().getFullYear()}
                error={errors.wakeAt}
            />

            {/* 通夜場所 */}
            <FormInput<CaseFormData> name="wakePlace" control={control} label="通夜場所" error={errors.wakePlace} />

            {/* 出棺日時 */}
            <FormInput<CaseFormData>
                name="departureAt"
                control={control}
                label="出棺日時"
                type="datetime-local"
                minYear={1950}
                maxYear={new Date().getFullYear()}
                error={errors.departureAt}
            />

            {/* 出棺場所 */}
            <FormInput<CaseFormData>
                name="departurePlace"
                control={control}
                label="出棺場所"
                error={errors.departurePlace}
            />

            {/* 葬儀・告別式開始日時 */}
            <FormInput<CaseFormData>
                name="funeralFrom"
                control={control}
                label="葬儀・告別式開始日時"
                type="datetime-local"
                minYear={1950}
                maxYear={new Date().getFullYear()}
                error={errors.funeralFrom}
            />

            {/* 葬儀・告別式終了日時 */}
            <FormInput<CaseFormData>
                name="funeralTo"
                control={control}
                label="葬儀・告別式終了日時"
                type="datetime-local"
                minYear={1950}
                maxYear={new Date().getFullYear()}
                error={errors.funeralTo}
            />

            {/* 葬儀・告別式会場 */}
            <FormInput<CaseFormData>
                name="funeralPlace"
                control={control}
                label="葬儀・告別式会場"
                error={errors.funeralPlace}
            />

            {/* 引上日時 */}
            <FormInput<CaseFormData>
                name="returnAt"
                control={control}
                label="引上日時"
                type="datetime-local"
                error={errors.returnAt}
            />

            {/* 引上場所 */}
            <FormInput<CaseFormData> name="returnPlace" control={control} label="引上場所" error={errors.returnPlace} />

            {/* 備考 */}
            <div style={{ gridColumn: '1 / -1' }}>
                <FormTextarea<CaseFormData> name="notes" control={control} label="備考" rows={4} error={errors.notes} />
            </div>

            {/* 会員証 */}
            <FormInput<CaseFormData>
                name="memberCardNote"
                control={control}
                label="会員証"
                error={errors.memberCardNote}
            />
        </div>
    )
}
