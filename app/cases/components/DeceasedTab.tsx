import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { AddressCity, AddressTown } from '@/lib/address'

interface DeceasedTabProps {
    cities: AddressCity[]
    towns: AddressTown[]
    onCityChange: (cityId: string) => Promise<void>
}

export function DeceasedTab({ cities, towns, onCityChange }: DeceasedTabProps) {
    const { control, watch, setValue } = useFormContext<CaseFormData>()
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
        setValue('chiefMournerTownId', '')
        await onCityChange(cityId)
    }

    const handleSameAsChiefMourner = (checked: boolean) => {
        setValue('sameAsChiefMourner', checked)
        if (checked) {
            setValue('payerName', chiefMournerName)
            setValue('payerRelation', chiefMournerRelation)
            setValue('payerAddress', chiefMournerAddress)
            setValue('payerTel', chiefMournerTel)
        } else {
            setValue('payerName', '')
            setValue('payerRelation', '')
            setValue('payerAddress', '')
            setValue('payerTel', '')
        }
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {/* 受付日 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>受付日</label>
                <Controller
                    name="receptionAt"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="datetime-local"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 故人名 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>故人名</label>
                <Controller
                    name="deceasedName"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 故人姓 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>故人姓</label>
                <Controller
                    name="deceasedLastName"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 故人名（名前） */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>故人名（名前）</label>
                <Controller
                    name="deceasedFirstName"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 性別 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>性別</label>
                <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                        <select
                            {...field}
                            value={field.value || ''}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        >
                            <option value="">選択してください</option>
                            <option value="MALE">男性</option>
                            <option value="FEMALE">女性</option>
                            <option value="OTHER">その他</option>
                        </select>
                    )}
                />
            </div>

            {/* 行年 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>行年</label>
                <Controller
                    name="age"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="number"
                            value={field.value || ''}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 御宗旨 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>御宗旨</label>
                <Controller
                    name="religion"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 喪主情報 */}
            <div style={{ gridColumn: '1 / -1' }}>
                <h3 style={{ marginBottom: '1rem' }}>喪主情報</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {/* 喪主名 */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>喪主名</label>
                        <Controller
                            name="chiefMournerName"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    value={field.value || ''}
                                    type="text"
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                />
                            )}
                        />
                    </div>

                    {/* 故人との関係 */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>故人との関係</label>
                        <Controller
                            name="chiefMournerRelation"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    value={field.value || ''}
                                    type="text"
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                />
                            )}
                        />
                    </div>

                    {/* 市区町村 */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>市区町村</label>
                        <select
                            value={chiefMournerCityId || ''}
                            onChange={(e) => handleCityChange(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        >
                            <option value="">選択してください</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 町字 */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>町字</label>
                        <Controller
                            name="chiefMournerTownId"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    value={field.value || ''}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
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
                    </div>

                    {/* 住所 */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>住所</label>
                        <Controller
                            name="chiefMournerAddress"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    value={field.value || ''}
                                    type="text"
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                />
                            )}
                        />
                    </div>

                    {/* 電話番号 */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>電話番号</label>
                        <Controller
                            name="chiefMournerTel"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    value={field.value || ''}
                                    type="tel"
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* 支払者情報 */}
            <div style={{ gridColumn: '1 / -1' }}>
                <h3 style={{ marginBottom: '1rem' }}>支払者情報</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {/* 喪主と同じ */}
                    <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                checked={sameAsChiefMourner || false}
                                onChange={(e) => handleSameAsChiefMourner(e.target.checked)}
                            />
                            喪主と同じ
                        </label>
                    </div>

                    {/* 支払者名 */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>支払者名</label>
                        <Controller
                            name="payerName"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    value={field.value || ''}
                                    type="text"
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                />
                            )}
                        />
                    </div>

                    {/* 支払者との関係 */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>支払者との関係</label>
                        <Controller
                            name="payerRelation"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    value={field.value || ''}
                                    type="text"
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                />
                            )}
                        />
                    </div>

                    {/* 支払者住所 */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>支払者住所</label>
                        <Controller
                            name="payerAddress"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    value={field.value || ''}
                                    type="text"
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                />
                            )}
                        />
                    </div>

                    {/* 支払者電話番号 */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>支払者電話番号</label>
                        <Controller
                            name="payerTel"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    value={field.value || ''}
                                    type="tel"
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
