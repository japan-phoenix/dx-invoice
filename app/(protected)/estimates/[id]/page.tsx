'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm, FormProvider, useFieldArray, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { estimateFormSchema, EstimateFormData, DEFAULT_FORM_VALUES } from '../schemas/EstimateFormSchema'
import { useEstimateEdit, useProductSearch, useEstimateItems, calculateTotals } from '../hooks/useEstimateForm'
import { EstimateProductSearch } from '../components/EstimateProductSearch'
import { EstimateItemTable } from '../components/EstimateItemTable'
import { EstimateTotals } from '../components/EstimateTotals'
import { EstimateOtherFields } from '../components/EstimateOtherFields'
import { EstimateCustomerSummary } from '../components/EstimateCustomerSummary'
import { EstimateBasicInfo } from '../components/EstimateBasicInfo'
import { toast } from '@/hooks/use-toast'

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
        formState: { isSubmitting, isDirty, errors },
    } = methods

    const {
        fields: itemFields,
        append: appendItemField,
        remove: removeItemField,
        move: moveItemField,
    } = useFieldArray({ control, name: 'items' })

    const { loading, customer, estimate, items, setItems, onSubmit } = useEstimateEdit(estimateId, reset)
    const productSearchProps = useProductSearch(items, setItems, appendItemField, moveItemField)
    const { handleRemoveItem } = useEstimateItems(items, setItems, removeItemField)
    const [activeTab, setActiveTab] = useState<'items' | 'other'>('items')
    const watchedItems = useWatch({ control, name: 'items' })
    const watchedIsMember = useWatch({ control, name: 'isMember' })

    if (loading) {
        return <div className="p-8">読み込み中...</div>
    }

    if (!customer || !estimate) {
        return null
    }

    const totals = calculateTotals(items, watchedItems, watchedIsMember === 'true', customer)

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
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col p-8 pb-24">
                <h1 className="mb-8 text-2xl font-bold">見積書 編集</h1>

                {/* 顧客情報サマリー */}
                <EstimateCustomerSummary customer={customer} />

                {/* タブ */}
                <div className="mb-4 flex border-b-2 border-gray-300">
                    <button
                        type="button"
                        onClick={() => setActiveTab('items')}
                        className={`cursor-pointer border-none px-6 py-3 ${
                            activeTab === 'items'
                                ? 'border-b-2 border-blue-600 bg-blue-600 text-white'
                                : 'bg-transparent text-gray-700'
                        }`}
                    >
                        明細
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('other')}
                        className={`cursor-pointer border-none px-6 py-3 ${
                            activeTab === 'other'
                                ? 'border-b-2 border-blue-600 bg-blue-600 text-white'
                                : 'bg-transparent text-gray-700'
                        }`}
                    >
                        その他
                    </button>
                </div>

                {/* 明細タブ */}
                {activeTab === 'items' && (
                    <>
                        <EstimateBasicInfo control={control} />
                        <EstimateProductSearch {...productSearchProps} items={items} />
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
                            isMember={watchedIsMember === 'true'}
                        />
                        <EstimateTotals totals={totals} />
                    </>
                )}

                {/* その他タブ */}
                {activeTab === 'other' && <EstimateOtherFields control={control} />}

                {/* 操作ボタン（画面右下固定） */}
                <div className="fixed bottom-0 right-0 p-2">
                    {isDirty && <div className="text-red-600 text-right pb-1 text-sm">未保存の変更があります</div>}
                    <div className="flex gap-4 bg-white">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="cursor-pointer rounded border-0 bg-gray-500 px-6 py-3 text-white"
                        >
                            閉じる
                        </button>
                        <button
                            type="button"
                            disabled={isDirty}
                            onClick={() => router.push(`/pdf/estimate/${estimate.id}`)}
                            className={`rounded border-0 px-6 py-3 text-white ${
                                isDirty ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-cyan-600'
                            }`}
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
                </div>
            </form>
        </FormProvider>
    )
}
