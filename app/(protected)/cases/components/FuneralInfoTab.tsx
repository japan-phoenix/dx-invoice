import { useFormContext } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'
import { FormAutocomplete } from '@/components/form/FormAutocomplete'
import { FUNERAL_PLACE_OPTIONS } from '../constants/casesOptions'

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
            <FormAutocomplete<CaseFormData>
                name="funeralPlace"
                control={control}
                label="葬儀・告別式会場"
                options={[...FUNERAL_PLACE_OPTIONS]}
                error={errors.funeralPlace}
            />

            {/* 備考 */}
            <div style={{ gridColumn: '1 / -1' }}>
                <FormTextarea<CaseFormData> name="notes" control={control} label="備考" rows={8} error={errors.notes} />
            </div>
        </div>
    )
}
