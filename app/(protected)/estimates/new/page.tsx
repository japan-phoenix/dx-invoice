'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense } from 'react'
import { estimateFormSchema, EstimateFormData, DEFAULT_FORM_VALUES } from '../schemas/EstimateFormSchema'
import { CREMATION_OPTIONS, ALTAR_OPTIONS, STATUS_OPTIONS } from '../constants/estimateOptions'
import { useEstimateCreate, useProductSearch, useEstimateItems, calculateTotals } from '../hooks/useEstimateForm'
import { EstimateProductSearch } from '../components/EstimateProductSearch'
import { EstimateItemTable } from '../components/EstimateItemTable'
import { EstimateTotals } from '../components/EstimateTotals'
import { FormInput } from '@/components/form/FormInput'
import { FormSelect } from '@/components/form/FormSelect'

function EstimateNewPageInner() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const customerId = searchParams.get('customerId') ?? ''

    const methods = useForm<EstimateFormData>({
        resolver: zodResolver(estimateFormSchema),
        defaultValues: DEFAULT_FORM_VALUES,
    })
    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods

    const { loading, customer, items, setItems, onSubmit } = useEstimateCreate(customerId, reset)
    const productSearchProps = useProductSearch(items, setItems)
    const { handleUpdateItem, handleRemoveItem } = useEstimateItems(items, setItems)

    if (loading) {
        return <div className="p-8">読み込み中...</div>
    }

    if (!customer) {
        return null
    }

    const totals = calculateTotals(items, customer)

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-8">
                <h1 className="mb-8 text-2xl font-bold">見積書 作成</h1>

                {/* 顧客情報サマリー */}
                <div
                    style={{
                        backgroundColor: '#f5f5f5',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '2rem',
                    }}
                >
                    <p>
                        <strong>故人名:</strong> {customer.deceasedName}
                    </p>
                    <p>
                        <strong>受付日:</strong>{' '}
                        {customer.receptionAt ? new Date(customer.receptionAt).toLocaleDateString('ja-JP') : ''}
                    </p>
                    <p>
                        <strong>喪主名:</strong> {customer.chiefMournerName}
                    </p>
                    <p>
                        <strong>住所:</strong> {customer.chiefMournerAddress}
                    </p>
                </div>

                {/* 基本情報 */}
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>基本情報</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <FormInput name="docNo" control={control} label="見積番号" placeholder="例: EST-0001" />
                        <FormSelect
                            name="status"
                            control={control}
                            label="ステータス"
                            options={STATUS_OPTIONS}
                            placeholder="選択してください"
                        />
                    </div>
                </div>

                {/* 品目検索・追加 */}
                <EstimateProductSearch {...productSearchProps} items={items} />

                {/* 明細一覧 */}
                <EstimateItemTable
                    items={items}
                    handleUpdateItem={handleUpdateItem}
                    handleRemoveItem={handleRemoveItem}
                />

                {/* 合計エリア */}
                <EstimateTotals totals={totals} />

                {/* その他項目 */}
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>その他</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <FormSelect
                            name="cremationProcessType"
                            control={control}
                            label="火葬許可証手続"
                            options={CREMATION_OPTIONS}
                            placeholder="選択してください"
                        />
                        <FormSelect
                            name="altarPlaceType"
                            control={control}
                            label="祭壇設置場所"
                            options={ALTAR_OPTIONS}
                            placeholder="選択してください"
                        />
                        <FormInput name="ceilingHeight" control={control} label="天井高" suffix="尺" />
                        <FormInput name="estimateStaff" control={control} label="見積担当" />
                        <FormInput name="ceremonyStaff" control={control} label="式担当" />
                        <FormInput name="transportStaff" control={control} label="搬送担当" />
                        <FormInput name="decorationStaff" control={control} label="飾り担当" />
                        <FormInput name="returnStaff" control={control} label="引上担当" />
                    </div>
                </div>

                {/* 操作ボタン */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        閉じる
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: isSubmitting ? '#ccc' : '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {isSubmitting ? '保存中...' : '登録'}
                    </button>
                </div>
            </form>
        </FormProvider>
    )
}

export default function EstimateNewPage() {
    return (
        <Suspense fallback={<div className="p-8">読み込み中...</div>}>
            <EstimateNewPageInner />
        </Suspense>
    )
}
