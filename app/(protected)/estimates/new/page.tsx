'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm, FormProvider, useFieldArray, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense } from 'react'
import { estimateFormSchema, EstimateFormData, DEFAULT_FORM_VALUES } from '../schemas/EstimateFormSchema'
import { useEstimateCreate, useEstimateFreeItems, calculateTotals } from '../hooks/useEstimateForm'
import { EstimateItemTable } from '../components/EstimateItemTable'
import { EstimateTotals } from '../components/EstimateTotals'
import { EstimateOtherFields } from '../components/EstimateOtherFields'
import { EstimateCustomerSummary } from '../components/EstimateCustomerSummary'
import { EstimateBasicInfo } from '../components/EstimateBasicInfo'
import { EstimateFreeItemInput } from '../components/EstimateFreeItemInput'
import { ProductVariant } from '@/lib/products'
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
        setValue,
        formState: { isSubmitting, errors },
    } = methods

    const { fields: itemFields } = useFieldArray({ control, name: 'items' })

    const {
        fields: freeItemFields,
        append: appendFreeItemField,
        remove: removeFreeItemField,
    } = useFieldArray({ control, name: 'freeItems' })

    const { loading, customer, items, setItems, freeItems, setFreeItems, onSubmit } = useEstimateCreate(
        customerId,
        reset
    )
    const { handleAddFreeItem, handleRemoveFreeItem } = useEstimateFreeItems(
        freeItems,
        setFreeItems,
        appendFreeItemField,
        removeFreeItemField
    )
    const [activeTab, setActiveTab] = useState<'items' | 'other'>('items')
    const watchedItems = useWatch({ control, name: 'items' })
    const watchedIsMember = useWatch({ control, name: 'isMember' })

    const handleVariantChange = (index: number, variant: ProductVariant) => {
        setItems((prev) =>
            prev.map((item, i) =>
                i !== index
                    ? item
                    : {
                          ...item,
                          productVariantId: variant.id,
                          productVariant: variant,
                          unitPriceGeneral: variant.priceGeneral,
                          unitPriceMember: variant.priceMember,
                      }
            )
        )
    }

    if (loading) {
        return <div className="p-8">読み込み中...</div>
    }

    if (!customer) {
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
                <h1 className="mb-8 text-2xl font-bold">見積書 作成</h1>

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
                        <EstimateBasicInfo control={control} isNew />
                        {(errors.items?.root?.message ?? (errors.items as any)?.message) && (
                            <p className="-mt-4 mb-4 text-sm text-red-600">
                                {errors.items?.root?.message ?? (errors.items as any)?.message}
                            </p>
                        )}
                        <EstimateFreeItemInput onAdd={handleAddFreeItem} count={freeItems.length} />
                        <EstimateItemTable
                            items={items}
                            fields={itemFields}
                            control={control}
                            isMember={watchedIsMember === 'true'}
                            freeItems={freeItems}
                            freeFields={freeItemFields}
                            handleRemoveFreeItem={handleRemoveFreeItem}
                            onVariantChange={handleVariantChange}
                            setValue={setValue}
                        />
                        <EstimateTotals totals={totals} />
                    </>
                )}

                {/* その他タブ */}
                {activeTab === 'other' && <EstimateOtherFields control={control} />}

                {/* 操作ボタン */}
                <div className="fixed bottom-0 right-0 flex gap-4 p-2">
                    <button
                        type="button"
                        onClick={() => {
                            router.push('/cases')
                            router.refresh()
                        }}
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
