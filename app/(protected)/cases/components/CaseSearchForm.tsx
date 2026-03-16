'use client'

import { SearchButton } from '@/components/button/SearchButton'
import { ResetButton } from '@/components/button/ResetButton'
import { SearchCustomersParams } from '@/lib/customers'
import { useCitiesQuery, useTownsQuery } from '@/hooks/useAddress'
import { InputUI, SelectUI, CheckboxUI, DatePickerUI } from '@/components/form/ui'
import { calculateDateRange } from '@/lib/dateUtils'

interface CaseSearchFormProps {
    formParams: FormParams
    setFormParams: (params: FormParams) => void
    onSearch: (params: SearchCustomersParams) => void
    onReset: () => void
    isLoading: boolean
}

interface FormParams extends SearchCustomersParams {
    receptionFromInput?: string
    receptionToInput?: string
    funeralFromInput?: string
    funeralToInput?: string
}

export function CaseSearchForm({ formParams, setFormParams, onSearch, onReset, isLoading }: CaseSearchFormProps) {
    const { data: cities = [] } = useCitiesQuery()
    const { data: towns = [] } = useTownsQuery(formParams.cityId || null)

    const handleCityChange = (cityId: string) => {
        setFormParams({ ...formParams, cityId, townId: undefined })
    }

    const handleSearch = () => {
        // 入力値から API 用の日付範囲を計算
        const receptionRange = calculateDateRange(formParams.receptionFromInput, formParams.receptionToInput)
        const funeralRange = calculateDateRange(formParams.funeralFromInput, formParams.funeralToInput)

        const searchParams: SearchCustomersParams = {
            ...formParams,
            receptionFrom: receptionRange.from,
            receptionTo: receptionRange.to,
            funeralFrom: funeralRange.from,
            funeralTo: funeralRange.to,
        }

        // 入力用フィールドはAPI送信から除外
        delete (searchParams as any).receptionFromInput
        delete (searchParams as any).receptionToInput
        delete (searchParams as any).funeralFromInput
        delete (searchParams as any).funeralToInput

        // ※ formParams は親コンポーネントで管理され、検索後も保持されます
        onSearch(searchParams)
    }

    const handleReset = () => {
        setFormParams({})
        onReset()
    }

    return (
        <div className="mb-8 rounded-lg bg-gray-100 p-6">
            <div className="mb-4 grid grid-cols-3 gap-4">
                <div>
                    <SelectUI
                        value={formParams.cityId || ''}
                        onChange={handleCityChange}
                        label="市区町村"
                        options={cities.map((city) => ({ value: city.id, label: city.name }))}
                        placeholder="選択してください"
                    />
                </div>

                <div>
                    <SelectUI
                        value={formParams.townId || ''}
                        onChange={(townId) => setFormParams({ ...formParams, townId })}
                        label="町字"
                        options={towns.map((town) => ({ value: town.id, label: town.name }))}
                        placeholder="選択してください"
                        disabled={!formParams.cityId}
                    />
                </div>

                <div>
                    <InputUI
                        value={formParams.deceasedName || ''}
                        onChange={(deceasedName) => setFormParams({ ...formParams, deceasedName })}
                        label="故人名"
                        placeholder="入力してください"
                    />
                </div>

                <div>
                    <DatePickerUI
                        value={formParams.receptionFromInput || ''}
                        onChange={(receptionFromInput) => setFormParams({ ...formParams, receptionFromInput })}
                        label="受付日（From）"
                        placeholder="日付を選択"
                    />
                </div>

                <div>
                    <DatePickerUI
                        value={formParams.receptionToInput || ''}
                        onChange={(receptionToInput) => setFormParams({ ...formParams, receptionToInput })}
                        label="受付日（To）"
                        placeholder="日付を選択"
                    />
                </div>

                <div>
                    <DatePickerUI
                        value={formParams.funeralFromInput || ''}
                        onChange={(funeralFromInput) => setFormParams({ ...formParams, funeralFromInput })}
                        label="葬儀日（From）"
                        placeholder="日付を選択"
                    />
                </div>

                <div>
                    <DatePickerUI
                        value={formParams.funeralToInput || ''}
                        onChange={(funeralToInput) => setFormParams({ ...formParams, funeralToInput })}
                        label="葬儀日（To）"
                        placeholder="日付を選択"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm">入金状態</label>
                    <div className="flex gap-4">
                        <CheckboxUI
                            checked={formParams.paid === true}
                            onChange={(paid) =>
                                setFormParams({
                                    ...formParams,
                                    paid: paid ? true : undefined,
                                    unpaid: paid ? undefined : formParams.unpaid,
                                })
                            }
                            label="入金済"
                        />
                        <CheckboxUI
                            checked={formParams.unpaid === true}
                            onChange={(unpaid) =>
                                setFormParams({
                                    ...formParams,
                                    unpaid: unpaid ? true : undefined,
                                    paid: unpaid ? undefined : formParams.paid,
                                })
                            }
                            label="未入金"
                        />
                    </div>
                </div>
                <div>
                    <label className="mb-2 block text-sm">見積区分</label>
                    <div className="flex gap-4">
                        <CheckboxUI
                            checked={formParams.estimateStatusConfirmed === true}
                            onChange={(checked) =>
                                setFormParams({
                                    ...formParams,
                                    estimateStatusConfirmed: checked ? true : undefined,
                                })
                            }
                            label="事前相談見積のみ"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <SearchButton onClick={handleSearch} isLoading={isLoading} />
                <ResetButton onClick={handleReset} />
            </div>
        </div>
    )
}
