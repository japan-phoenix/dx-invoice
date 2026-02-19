'use client'

import { useRouter, useParams } from 'next/navigation'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { estimateFormSchema, EstimateFormData, DEFAULT_FORM_VALUES } from '../schemas/EstimateFormSchema'
import { CREMATION_OPTIONS, ALTAR_OPTIONS, STATUS_OPTIONS } from '../constants/estimateOptions'
import { useEstimateEdit, useProductSearch, useEstimateItems, calculateTotals } from '../hooks/useEstimateForm'
import { EstimateProductSearch } from '../components/EstimateProductSearch'
import { EstimateItemTable } from '../components/EstimateItemTable'
import { EstimateTotals } from '../components/EstimateTotals'
import { FormInput } from '@/components/form/FormInput'
import { FormSelect } from '@/components/form/FormSelect'

export default function EstimateEditPage() {
    const router = useRouter()
    const params = useParams()
    const estimateId = params.id as string

    const methods = useForm<EstimateFormData>({
        resolver: zodResolver(estimateFormSchema),
        defaultValues: DEFAULT_FORM_VALUES,
    })
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { isSubmitting },
    } = methods

    const {
        fields: itemFields,
        append: appendItemField,
        remove: removeItemField,
    } = useFieldArray({ control, name: 'items' })

    const { loading, customer, estimate, items, setItems, onSubmit } = useEstimateEdit(estimateId, reset)
    const productSearchProps = useProductSearch(items, setItems, appendItemField)
    const { handleRemoveItem } = useEstimateItems(items, setItems, removeItemField)

    if (loading) {
        return <div className="p-8">読み込み中...</div>
    }

    if (!customer || !estimate) {
        return null
    }

    const totals = calculateTotals(items, watch('items'), customer)

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-8">
                <h1 className="mb-8 text-2xl font-bold">見積書 編集</h1>

                {/* 顧客情報サマリー */}
                <div className="mb-8 rounded-lg bg-gray-100 p-4">
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
                <div className="mb-8">
                    <h3 className="mb-4">基本情報</h3>
                    <div className="grid grid-cols-2 gap-4">
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
                    fields={itemFields}
                    control={control}
                    handleRemoveItem={handleRemoveItem}
                />

                {/* 合計エリア */}
                <EstimateTotals totals={totals} />

                {/* その他項目 */}
                <div className="mb-8">
                    <h3 className="mb-4">その他</h3>
                    <div className="grid grid-cols-2 gap-4">
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
                        <FormInput name="ceilingHeight" control={control} label="天井高" />
                        <FormInput name="estimateStaff" control={control} label="見積担当" />
                        <FormInput name="ceremonyStaff" control={control} label="式担当" />
                        <FormInput name="transportStaff" control={control} label="搬送担当" />
                        <FormInput name="decorationStaff" control={control} label="飾り担当" />
                        <FormInput name="returnStaff" control={control} label="引上担当" />
                    </div>
                </div>

                {/* 操作ボタン */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="cursor-pointer rounded border-0 bg-gray-500 px-6 py-3 text-white"
                    >
                        閉じる
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push(`/pdf/estimate/${estimate.id}`)}
                        className="cursor-pointer rounded border-0 bg-cyan-600 px-6 py-3 text-white"
                    >
                        PDFプレビュー
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`rounded border-0 px-6 py-3 text-white ${
                            isSubmitting ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-green-600'
                        }`}
                    >
                        {isSubmitting ? '保存中...' : '更新'}
                    </button>
                </div>
            </form>
        </FormProvider>
    )
}
