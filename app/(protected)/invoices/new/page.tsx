'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense } from 'react'
import { invoiceFormSchema, InvoiceFormData, DEFAULT_INVOICE_FORM_VALUES } from '../schemas/InvoiceFormSchema'
import {
    useInvoiceCreate,
    useInvoiceProductSearch,
    useInvoiceItems,
    calculateInvoiceTotals,
} from '../hooks/useInvoiceForm'
import { InvoiceProductSearch } from '../components/InvoiceProductSearch'
import { InvoiceItemTable } from '../components/InvoiceItemTable'
import { InvoiceTotals } from '../components/InvoiceTotals'
import { InvoiceOtherFields } from '../components/InvoiceOtherFields'
import { InvoiceCustomerSummary } from '../components/InvoiceCustomerSummary'
import { InvoiceBasicInfo } from '../components/InvoiceBasicInfo'
import { toast } from '@/hooks/use-toast'

function InvoiceNewPageInner() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const customerId = searchParams.get('customerId') ?? ''

    const methods = useForm<InvoiceFormData>({
        resolver: zodResolver(invoiceFormSchema),
        defaultValues: DEFAULT_INVOICE_FORM_VALUES,
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

    const { loading, customer, estimates, items, setItems, onSubmit, handleCopyFromEstimate, copyingFrom } =
        useInvoiceCreate(customerId, reset)
    const productSearchProps = useInvoiceProductSearch(items, setItems, appendItemField, moveItemField)
    const { handleRemoveItem } = useInvoiceItems(items, setItems, removeItemField)
    const [activeTab, setActiveTab] = useState<'items' | 'other'>('items')

    if (loading) {
        return <div className="p-8">読み込み中...</div>
    }

    if (!customer) {
        return null
    }

    const totals = calculateInvoiceTotals(items, watch('items'), watch('isMember') === 'true', customer)

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
                <h1 className="mb-8 text-2xl font-bold">請求書 作成</h1>

                {/* 顧客情報サマリー */}
                <InvoiceCustomerSummary customer={customer} />

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
                        <InvoiceBasicInfo control={control} />

                        {/* 見積からコピー */}
                        {estimates.length > 0 && items.length === 0 && (
                            <div className="mb-8 rounded-lg bg-amber-50 p-6">
                                <h3 className="mb-4">見積からコピー</h3>
                                <div className="flex flex-wrap gap-3">
                                    {estimates.map((estimate) => (
                                        <button
                                            key={estimate.id}
                                            type="button"
                                            disabled={copyingFrom}
                                            onClick={() => handleCopyFromEstimate(estimate.id, appendItemField)}
                                            className="cursor-pointer rounded border-0 bg-cyan-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                                        >
                                            {copyingFrom
                                                ? 'コピー中...'
                                                : `見積 ${estimate.docNo || estimate.id} からコピー`}
                                        </button>
                                    ))}
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    ※ コピーすると請求書が作成され、編集画面に遷移します
                                </p>
                            </div>
                        )}

                        <InvoiceProductSearch {...productSearchProps} items={items} />
                        {(errors.items?.root?.message ?? (errors.items as any)?.message) && (
                            <p className="-mt-4 mb-4 text-sm text-red-600">
                                {errors.items?.root?.message ?? (errors.items as any)?.message}
                            </p>
                        )}
                        <InvoiceItemTable
                            items={items}
                            fields={itemFields}
                            control={control}
                            handleRemoveItem={handleRemoveItem}
                            isMember={watch('isMember') === 'true'}
                        />
                        <InvoiceTotals totals={totals} />
                    </>
                )}

                {/* その他タブ */}
                {activeTab === 'other' && <InvoiceOtherFields control={control} />}

                {/* 操作ボタン */}
                <div className="fixed bottom-0 right-0 flex gap-4 p-2">
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

export default function InvoiceNewPage() {
    return (
        <Suspense fallback={<div className="p-8">読み込み中...</div>}>
            <InvoiceNewPageInner />
        </Suspense>
    )
}
