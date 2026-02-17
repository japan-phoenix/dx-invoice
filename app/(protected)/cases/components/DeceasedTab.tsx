import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { useCallback, useState } from 'react'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { AddressCity, AddressTown, searchPostalCode } from '@/lib/address'
import { FormInput } from '@/components/form/FormInput'
import { FormSelect } from '@/components/form/FormSelect'
import { FormCheckbox } from '@/components/form/FormCheckbox'
import { FormAutocomplete } from '@/components/form/FormAutocomplete'
import { RELATION_OPTIONS } from '../constants/statusOptions'
import { toast } from '@/hooks/use-toast'

const normalizeFullWidthToHalfWidth = (value: string): string => {
    return value.replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
}

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
    const [isSearchingChief, setIsSearchingChief] = useState(false)
    const [isSearchingPayer, setIsSearchingPayer] = useState(false)

    const chiefMournerPostalCode = useWatch({
        control,
        name: 'chiefMournerPostalCode',
    })
    const payerPostalCode = useWatch({
        control,
        name: 'payerPostalCode',
    })
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

    // 喪主の郵便番号検索
    const handleChiefPostalSearch = useCallback(async () => {
        if (!chiefMournerPostalCode) {
            toast({
                title: '郵便番号を入力してください',
                variant: 'destructive',
                duration: 2000,
            })
            return
        }

        const normalized = normalizeFullWidthToHalfWidth(chiefMournerPostalCode)
        if (normalized.replace(/[^0-9]/g, '').length !== 7) {
            toast({
                title: '郵便番号は7桁である必要があります',
                variant: 'destructive',
                duration: 2000,
            })
            return
        }

        setIsSearchingChief(true)
        try {
            const result = await searchPostalCode(normalized)
            if (!result) {
                toast({
                    title: '該当する住所が見つかりません',
                    variant: 'destructive',
                    duration: 2000,
                })
                return
            }

            // 住所フィールドに 市区町村 + 町丁目 を設定
            if (result.fullAddress) {
                setValue('chiefMournerAddress', result.fullAddress)
            }
            toast({
                title: '住所を検索しました',
                variant: 'success',
                duration: 2000,
            })
        } catch (error: any) {
            console.error('喪主郵便番号検索エラー:', error)
            const errorMessage = error?.response?.data?.error || error?.message || '住所検索に失敗しました'
            toast({
                title: errorMessage,
                variant: 'destructive',
                duration: 3000,
            })
        } finally {
            setIsSearchingChief(false)
        }
    }, [chiefMournerPostalCode, setValue])

    // 支払者の郵便番号検索
    const handlePayerPostalSearch = useCallback(async () => {
        if (!payerPostalCode) {
            toast({
                title: '郵便番号を入力してください',
                variant: 'destructive',
                duration: 2000,
            })
            return
        }

        const normalized = normalizeFullWidthToHalfWidth(payerPostalCode)
        if (normalized.replace(/[^0-9]/g, '').length !== 7) {
            toast({
                title: '郵便番号は7桁である必要があります',
                variant: 'destructive',
                duration: 2000,
            })
            return
        }

        setIsSearchingPayer(true)
        try {
            const result = await searchPostalCode(normalized)
            if (!result) {
                toast({
                    title: '該当する住所が見つかりません',
                    variant: 'destructive',
                    duration: 2000,
                })
                return
            }

            if (result.fullAddress) {
                setValue('payerAddress', result.fullAddress)
            }
            toast({
                title: '住所を検索しました',
                variant: 'success',
                duration: 2000,
            })
        } catch (error: any) {
            console.error('支払者郵便番号検索エラー:', error)
            const errorMessage = error?.response?.data?.error || error?.message || '住所検索に失敗しました'
            toast({
                title: errorMessage,
                variant: 'destructive',
                duration: 3000,
            })
        } finally {
            setIsSearchingPayer(false)
        }
    }, [payerPostalCode, setValue])

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

                    {/* 郵便番号と検索ボタン */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>郵便番号</label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch' }}>
                            <Controller
                                name="chiefMournerPostalCode"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="7桁の郵便番号を入力"
                                        onChange={(e) => {
                                            const normalized = normalizeFullWidthToHalfWidth(e.target.value)
                                            field.onChange(normalized)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }
                                        }}
                                        style={{
                                            flex: 1,
                                            padding: '0.5rem',
                                            border: errors.chiefMournerPostalCode
                                                ? '2px solid #dc3545'
                                                : '1px solid #ddd',
                                            borderRadius: '4px',
                                            fontSize: '1rem',
                                        }}
                                    />
                                )}
                            />
                            <button
                                type="button"
                                onClick={handleChiefPostalSearch}
                                disabled={isSearchingChief}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: isSearchingChief ? 'not-allowed' : 'pointer',
                                    opacity: isSearchingChief ? 0.6 : 1,
                                    fontWeight: '500',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {isSearchingChief ? '検索中...' : '検索'}
                            </button>
                        </div>
                        {errors.chiefMournerPostalCode && (
                            <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                {errors.chiefMournerPostalCode.message}
                            </div>
                        )}
                    </div>

                    {/* 住所 */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <FormInput<CaseFormData>
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
                    />

                    {/* 支払者との関係 */}
                    <FormAutocomplete<CaseFormData>
                        name="payerRelation"
                        control={control}
                        label="支払者との関係"
                        options={[...RELATION_OPTIONS]}
                        error={errors.payerRelation}
                    />

                    {/* 郵便番号と検索ボタン */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>郵便番号</label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch' }}>
                            <Controller
                                name="payerPostalCode"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="7桁の郵便番号を入力"
                                        onChange={(e) => {
                                            const normalized = normalizeFullWidthToHalfWidth(e.target.value)
                                            field.onChange(normalized)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }
                                        }}
                                        style={{
                                            flex: 1,
                                            padding: '0.5rem',
                                            border: errors.payerPostalCode ? '2px solid #dc3545' : '1px solid #ddd',
                                            borderRadius: '4px',
                                            fontSize: '1rem',
                                        }}
                                    />
                                )}
                            />
                            <button
                                type="button"
                                onClick={handlePayerPostalSearch}
                                disabled={isSearchingPayer}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: isSearchingPayer ? 'not-allowed' : 'pointer',
                                    opacity: isSearchingPayer ? 0.6 : 1,
                                    fontWeight: '500',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {isSearchingPayer ? '検索中...' : '検索'}
                            </button>
                        </div>
                        {errors.payerPostalCode && (
                            <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                {errors.payerPostalCode.message}
                            </div>
                        )}
                    </div>

                    {/* 支払者住所 */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <FormInput<CaseFormData>
                            name="payerAddress"
                            control={control}
                            label="支払者住所"
                            error={errors.payerAddress}
                        />
                    </div>

                    {/* 支払者電話番号 */}
                    <FormInput<CaseFormData>
                        name="payerTel"
                        control={control}
                        label="支払者電話番号"
                        type="tel"
                        error={errors.payerTel}
                    />
                </div>
            </div>
        </div>
    )
}
