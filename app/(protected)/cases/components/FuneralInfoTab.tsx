import { useFormContext } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'

export function FuneralInfoTab() {
    const {
        control,
        formState: { errors },
    } = useFormContext<CaseFormData>()

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
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
        </div>
    )
}
