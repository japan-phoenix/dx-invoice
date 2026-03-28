import { useFormContext } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormSelect } from '@/components/form/FormSelect'
import { FormAutocomplete } from '@/components/form/FormAutocomplete'
import { GENDER_OPTIONS, RELIGION_OPTIONS } from '../constants/casesOptions'

export function DeceasedInfoTab() {
    const {
        control,
        formState: { errors },
    } = useFormContext<CaseFormData>()

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {/* 受付日 */}
            <FormInput<CaseFormData>
                name="receptionAt"
                control={control}
                label="受付日"
                type="datetime-local"
                minYear={1950}
                maxYear={new Date().getFullYear()}
                error={errors.receptionAt}
            />

            {/* 故人名 */}
            <FormInput<CaseFormData>
                name="deceasedName"
                control={control}
                label="故人名"
                error={errors.deceasedName}
                prefix="故"
                suffix="様"
            />

            {/* 故人姓（フリガナ） */}
            <FormInput<CaseFormData>
                name="deceasedLastName"
                control={control}
                label="故人姓（フリガナ）"
                error={errors.deceasedLastName}
            />

            {/* 故人名（フリガナ） */}
            <FormInput<CaseFormData>
                name="deceasedFirstName"
                control={control}
                label="故人名（フリガナ）"
                error={errors.deceasedFirstName}
            />

            {/* 性別 */}
            <FormSelect<CaseFormData>
                name="gender"
                control={control}
                label="性別"
                options={[...GENDER_OPTIONS]}
                error={errors.gender}
                placeholder="選択してください"
            />

            {/* 行年 */}
            <FormInput<CaseFormData>
                name="age"
                control={control}
                label="行年"
                type="number"
                prefix="満"
                suffix="歳"
                min={0}
                max={999}
                error={errors.age}
            />

            {/* 御宗旨 */}
            <FormAutocomplete<CaseFormData>
                name="religion"
                control={control}
                label="御宗旨"
                options={[...RELIGION_OPTIONS]}
                error={errors.religion}
            />
        </div>
    )
}
