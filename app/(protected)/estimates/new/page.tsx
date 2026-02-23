'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
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
import { toast } from '@/hooks/use-toast'

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
        watch,
        formState: { isSubmitting, errors },
    } = methods

    const {
        fields: itemFields,
        append: appendItemField,
        remove: removeItemField,
        move: moveItemField,
    } = useFieldArray({ control, name: 'items' })

    const { loading, customer, items, setItems, onSubmit } = useEstimateCreate(customerId, reset)
    const productSearchProps = useProductSearch(items, setItems, appendItemField, moveItemField)
    const { handleRemoveItem } = useEstimateItems(items, setItems, removeItemField)

    if (loading) {
        return <div className="p-8">読み込み中...</div>
    }

    if (!customer) {
        return null
    }

    const totals = calculateTotals(items, watch('items'), customer)

    const onInvalid = (errs: any) => {
        const itemsError = errs?.items?.root?.message ?? errs?.items?.message
        if (itemsError) {
            toast({ title: itemsError, variant: 'destructive', duration: 3000 })
            return
        }
        const first = Object.values(errs as Record<string, any>).find((e) => e?.message)
        if (first?.message) {
            toast({ title: first.message, variant: 'destructive', duration: 3000 })
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col p-8">
                <h1 className="mb-8 text-2xl font-bold">見積書 作成</h1>

                {/* 基本情報 */}
                <div className="mb-8">
                    <h3 className="mb-4">基本情報</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput name="docNo" control={control} label="見積番号" placeholder="例: EST-0001" />
                    </div>
                </div>

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
                    {customer.memberCardNote && (
                        <p>
                            <strong>会員証:</strong> {customer.memberCardNote}
                        </p>
                    )}
                </div>

                {/* 品目検索・追加 */}
                <EstimateProductSearch {...productSearchProps} items={items} />

                {/* 明細一覧 */}
                {(errors.items?.root?.message ?? (errors.items as any)?.message) && (
                    <p className="-mt-4 mb-4 text-sm text-red-600">
                        {errors.items?.root?.message ?? (errors.items as any)?.message}
                    </p>
                )}
                <EstimateItemTable
                    items={items}
                    fields={itemFields}
                    control={control}
                    handleRemoveItem={handleRemoveItem}
                    customer={customer}
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
                        <div className="flex flex-col gap-2">
                            <FormSelect
                                name="altarPlaceType"
                                control={control}
                                label="祭壇設置場所"
                                options={ALTAR_OPTIONS}
                                placeholder="選択してください"
                            />
                            {watch('altarPlaceType') === 'OTHER' && (
                                <FormInput name="altarPlaceOther" control={control} placeholder="祭壇設置場所" />
                            )}
                        </div>
                        <FormInput name="ceilingHeight" control={control} label="天井高" suffix="尺" />
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
                        type="submit"
                        disabled={isSubmitting}
                        className={`rounded border-0 px-6 py-3 text-white ${
                            isSubmitting ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-green-600'
                        }`}
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
