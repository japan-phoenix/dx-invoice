import { useFormContext } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormCurrencyInput } from '@/components/form/FormCurrencyInput'
import { FormAutocomplete } from '@/components/form/FormAutocomplete'
import { RELATION_OPTIONS } from '../constants/casesOptions'

const INDEX = 1

export function Membership2Tab() {
    const {
        control,
        formState: { errors },
    } = useFormContext<CaseFormData>()

    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>会員2</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {/* 会員番号 */}
                <FormInput<CaseFormData>
                    name={`memberships.${INDEX}.memberNo`}
                    control={control}
                    label="会員番号"
                    error={errors.memberships?.[INDEX]?.memberNo}
                />

                {/* 加入日 */}
                <FormInput<CaseFormData>
                    name={`memberships.${INDEX}.joinedAt`}
                    control={control}
                    label="加入日"
                    type="date"
                    minYear={1950}
                    maxYear={new Date().getFullYear()}
                    error={errors.memberships?.[INDEX]?.joinedAt}
                />

                {/* 会員名 */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <FormInput<CaseFormData>
                        name={`memberships.${INDEX}.memberName`}
                        control={control}
                        label="会員名"
                        error={errors.memberships?.[INDEX]?.memberName}
                    />
                </div>

                {/* コース口数 */}
                <FormInput<CaseFormData>
                    name={`memberships.${INDEX}.courseUnits`}
                    control={control}
                    label="コース口数"
                    type="number"
                    suffix="万口"
                    error={errors.memberships?.[INDEX]?.courseUnits}
                />

                {/* 満期額 */}
                <FormCurrencyInput<CaseFormData>
                    name={`memberships.${INDEX}.maturityAmount`}
                    control={control}
                    label="満期額"
                    prefix="¥"
                    suffix="万"
                    error={errors.memberships?.[INDEX]?.maturityAmount}
                />

                {/* 入金回数 */}
                <FormInput<CaseFormData>
                    name={`memberships.${INDEX}.paymentTimes`}
                    control={control}
                    label="入金回数"
                    type="number"
                    suffix="回"
                    error={errors.memberships?.[INDEX]?.paymentTimes}
                />

                {/* 入金額 */}
                <FormCurrencyInput<CaseFormData>
                    name={`memberships.${INDEX}.paymentAmount`}
                    control={control}
                    label="入金額"
                    prefix="¥"
                    error={errors.memberships?.[INDEX]?.paymentAmount}
                />

                {/* 営業担当者名 */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <FormInput<CaseFormData>
                        name={`memberships.${INDEX}.salesStaffName`}
                        control={control}
                        label="営業担当者名"
                        error={errors.memberships?.[INDEX]?.salesStaffName}
                    />
                </div>

                {/* 故人との関係 */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <FormAutocomplete<CaseFormData>
                        name={`memberships.${INDEX}.relationToDeceased`}
                        control={control}
                        label="故人との関係"
                        options={[...RELATION_OPTIONS]}
                        error={errors.memberships?.[INDEX]?.relationToDeceased}
                    />
                </div>
            </div>
        </div>
    )
}
