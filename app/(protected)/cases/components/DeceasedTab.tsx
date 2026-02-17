import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { AddressCity, AddressTown } from '@/lib/address'
import { FormInput } from '@/components/form/FormInput'
import { FormSelect } from '@/components/form/FormSelect'
import { FormCheckbox } from '@/components/form/FormCheckbox'
import { FormAutocomplete } from '@/components/form/FormAutocomplete'
import { FormInputWithPostalSearch } from '@/components/form/FormInputWithPostalSearch'
import { RELATION_OPTIONS } from '../constants/statusOptions'

interface DeceasedTabProps {
    cities: AddressCity[]
    towns: AddressTown[]
    onCityChange: (cityId: string) => Promise<void>
}

export function DeceasedTab({ cities, towns, onCityChange }: DeceasedTabProps) {
    const {
        control,
        setValue,
        formState: { errors },
    } = useFormContext<CaseFormData>()

    const chiefMournerCityId = useWatch({
        control,
        name: 'chiefMournerCityId',
    })
    const sameAsChiefMourner = useWatch({
        control,
        name: 'sameAsChiefMourner',
    })
    const chiefMournerName = useWatch({
        control,
        name: 'chiefMournerName',
    })
    const chiefMournerRelation = useWatch({
        control,
        name: 'chiefMournerRelation',
    })
    const chiefMournerAddress = useWatch({
        control,
        name: 'chiefMournerAddress',
    })
    const chiefMournerTel = useWatch({
        control,
        name: 'chiefMournerTel',
    })

    const handleCityChange = async (cityId: string) => {
        setValue('chiefMournerCityId', cityId)
        setValue('chiefMournerTownId', undefined)
        await onCityChange(cityId)
    }

    const handleTownChange = (townId: string) => {
        // townを選んだ際に、そのtown.cityIdを使ってcityを自動選択
        if (townId) {
            const selectedTown = towns.find((t) => t.id === townId)
            if (selectedTown) {
                setValue('chiefMournerCityId', selectedTown.cityId)
            }
        }
        setValue('chiefMournerTownId', townId)
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {/* 受付日 */}
            <FormInput<CaseFormData>
                name="receptionAt"
                control={control}
                label="受付日"
                type="datetime-local"
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

            {/* 故人姓 */}
            <FormInput<CaseFormData>
                name="deceasedLastName"
                control={control}
                label="故人姓"
                error={errors.deceasedLastName}
            />

            {/* 故人名 */}
            <FormInput<CaseFormData>
                name="deceasedFirstName"
                control={control}
                label="故人名"
                error={errors.deceasedFirstName}
            />

            {/* 性別 */}
            <FormSelect<CaseFormData>
                name="gender"
                control={control}
                label="性別"
                options={[
                    { value: 'MALE', label: '男性' },
                    { value: 'FEMALE', label: '女性' },
                    { value: 'OTHER', label: 'その他' },
                ]}
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
                error={errors.age}
            />

            {/* 御宗旨 */}
            <FormInput<CaseFormData> name="religion" control={control} label="御宗旨" error={errors.religion} />

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

                    {/* 市区町村 */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>市区町村</label>
                        <select
                            value={chiefMournerCityId || ''}
                            onChange={(e) => handleCityChange(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: errors.chiefMournerCityId ? '2px solid #dc3545' : '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '1rem',
                            }}
                        >
                            <option value="">選択してください</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        {errors.chiefMournerCityId && (
                            <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                {errors.chiefMournerCityId.message}
                            </div>
                        )}
                    </div>

                    {/* 町字 */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>町字</label>
                        <Controller
                            name="chiefMournerTownId"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    value={field.value || ''}
                                    disabled={!chiefMournerCityId}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        handleTownChange(e.target.value)
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: errors.chiefMournerTownId ? '2px solid #dc3545' : '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '1rem',
                                        opacity: !chiefMournerCityId ? 0.5 : 1,
                                        cursor: !chiefMournerCityId ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    <option value="">選択してください</option>
                                    {towns.map((town) => (
                                        <option key={town.id} value={town.id}>
                                            {town.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                        {errors.chiefMournerTownId && (
                            <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                {errors.chiefMournerTownId.message}
                            </div>
                        )}
                    </div>

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
