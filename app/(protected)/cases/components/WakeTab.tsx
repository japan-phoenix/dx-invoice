import { useFormContext } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormAutocomplete } from '@/components/form/FormAutocomplete'
import { PICKUP_PLACE_OPTIONS } from '../constants/casesOptions'

export function WakeTab() {
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
        </div>
    )
}
