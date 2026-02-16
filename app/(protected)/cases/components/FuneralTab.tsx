import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'

export function FuneralTab() {
    const {
        control,
        formState: { errors },
    } = useFormContext<CaseFormData>()

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {/* 迎送場所 */}
            <div style={{ gridColumn: '1 / -1' }}>
                <FormInput<CaseFormData>
                    name="pickupPlace"
                    control={control}
                    label="迎送場所"
                    error={errors.pickupPlace}
                />
            </div>

            {/* 通夜日時 */}
            <FormInput<CaseFormData>
                name="wakeAt"
                control={control}
                label="通夜日時"
                type="datetime-local"
                error={errors.wakeAt}
            />

            {/* 通夜場所 */}
            <FormInput<CaseFormData> name="wakePlace" control={control} label="通夜場所" error={errors.wakePlace} />

            {/* 国への出棺日時 */}
            <FormInput<CaseFormData>
                name="departureAt"
                control={control}
                label="国への出棺日時"
                type="datetime-local"
                error={errors.departureAt}
            />

            {/* 国への出棺場所 */}
            <FormInput<CaseFormData>
                name="departurePlace"
                control={control}
                label="国への出棺場所"
                error={errors.departurePlace}
            />

            {/* 葬儀・告別式開始日時 */}
            <FormInput<CaseFormData>
                name="funeralFrom"
                control={control}
                label="葬儀・告別式開始日時"
                type="datetime-local"
                error={errors.funeralFrom}
            />

            {/* 葬儀・告別式終了日時 */}
            <FormInput<CaseFormData>
                name="funeralTo"
                control={control}
                label="葬儀・告別式終了日時"
                type="datetime-local"
                error={errors.funeralTo}
            />

            {/* 葬儀・告別式会場 */}
            <FormInput<CaseFormData>
                name="funeralPlace"
                control={control}
                label="葬儀・告別式会場"
                error={errors.funeralPlace}
            />

            {/* 火葬場到着日時 */}
            <FormInput<CaseFormData>
                name="returnAt"
                control={control}
                label="火葬場到着日時"
                type="datetime-local"
                error={errors.returnAt}
            />

            {/* 火葬場 */}
            <FormInput<CaseFormData> name="returnPlace" control={control} label="火葬場" error={errors.returnPlace} />

            {/* 備考 */}
            <div style={{ gridColumn: '1 / -1' }}>
                <FormTextarea<CaseFormData> name="notes" control={control} label="備考" rows={4} error={errors.notes} />
            </div>

            {/* 会員カードメモ */}
            <FormInput<CaseFormData>
                name="memberCardNote"
                control={control}
                label="会員カードメモ"
                error={errors.memberCardNote}
            />
        </div>
    )
}
