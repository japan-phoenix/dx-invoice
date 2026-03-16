import { useFormContext, useWatch } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormSelect } from '@/components/form/FormSelect'
import { FormCheckbox } from '@/components/form/FormCheckbox'
import { FormAutocomplete } from '@/components/form/FormAutocomplete'
import { FormInputWithPostalSearch } from '@/components/form/FormInputWithPostalSearch'
import { GENDER_OPTIONS, RELATION_OPTIONS, RELIGION_OPTIONS } from '../constants/casesOptions'

export function DeceasedTab() {
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
            <FormSelect<CaseFormData>
                name="religion"
                control={control}
                label="御宗旨"
                options={RELIGION_OPTIONS.map((v) => ({ value: v, label: v }))}
                error={errors.religion}
                placeholder="選択してください"
            />

            {/* 喪主情報 */}
            <div style={{ gridColumn: '1 / -1' }}>
                <h3 style={{ marginBottom: '1rem' }}>喪主情報</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {/* 喪主名 */}
                    <FormInput<CaseFormData>
                        name="chiefMournerName"
                        control={control}
                        label="喪主名"
                        error={errors.chiefMournerName}
                    />

                    {/* 故人との関係 */}
                    <FormAutocomplete<CaseFormData>
                        name="chiefMournerRelation"
                        control={control}
                        label="故人との関係"
                        options={[...RELATION_OPTIONS]}
                        error={errors.chiefMournerRelation}
                    />

                    {/* 住所 */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <FormInputWithPostalSearch<CaseFormData>
                            name="chiefMournerAddress"
                            control={control}
                            label="住所"
                            error={errors.chiefMournerAddress}
                        />
                    </div>

                    {/* 電話番号 */}
                    <FormInput<CaseFormData>
                        name="chiefMournerTel"
                        control={control}
                        label="電話番号"
                        type="tel"
                        error={errors.chiefMournerTel}
                    />
                </div>
            </div>

            {/* 支払者情報 */}
            <div style={{ gridColumn: '1 / -1' }}>
                <h3 style={{ marginBottom: '1rem' }}>支払者情報</h3>
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
            </div>
        </div>
    )
}
