'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm, FormProvider, useFieldArray, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { invoiceFormSchema, InvoiceFormData, DEFAULT_INVOICE_FORM_VALUES } from '../schemas/InvoiceFormSchema'
import { useInvoiceEdit, useInvoiceFreeItems, calculateInvoiceTotals } from '../hooks/useInvoiceForm'
import { InvoiceItemTable } from '../components/InvoiceItemTable'
import { InvoiceTotals } from '../components/InvoiceTotals'
import { InvoiceOtherFields } from '../components/InvoiceOtherFields'
import { InvoiceCustomerSummary } from '../components/InvoiceCustomerSummary'
import { InvoiceBasicInfo } from '../components/InvoiceBasicInfo'
import { InvoiceFreeItemInput } from '../components/InvoiceFreeItemInput'
import { ProductVariant } from '@/lib/products'
import { toast } from '@/hooks/use-toast'

export default function InvoiceEditPage() {
    const router = useRouter()
    const params = useParams()
    const invoiceId = params.id as string

    const methods = useForm<InvoiceFormData>({
        resolver: zodResolver(invoiceFormSchema),
        defaultValues: DEFAULT_INVOICE_FORM_VALUES,
    })
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { isSubmitting, isDirty, errors },
    } = methods

    const { fields: itemFields } = useFieldArray({ control, name: 'items' })

    const {
        fields: freeItemFields,
        append: appendFreeItemField,
        remove: removeFreeItemField,
    } = useFieldArray({ control, name: 'freeItems' })

    const { loading, customer, invoice, items, setItems, freeItems, setFreeItems, onSubmit } = useInvoiceEdit(
        invoiceId,
        reset
    )
    const { handleAddFreeItem, handleRemoveFreeItem } = useInvoiceFreeItems(
        freeItems,
        setFreeItems,
        appendFreeItemField,
        removeFreeItemField
    )
    const [activeTab, setActiveTab] = useState<'items' | 'other'>('items')
    const watchedItems = useWatch({ control, name: 'items' })
    const watchedFreeItems = useWatch({ control, name: 'freeItems' })
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

    if (!customer || !invoice) {
        return null
    }

    const totals = calculateInvoiceTotals(
        items,
        watchedItems,
        watchedIsMember === 'true',
        customer,
        freeItems,
        watchedFreeItems
    )

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
                <h1 className="mb-8 text-2xl font-bold">請求書 編集</h1>

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
                        {(errors.items?.root?.message ?? (errors.items as any)?.message) && (
                            <p className="-mt-4 mb-4 text-sm text-red-600">
                                {errors.items?.root?.message ?? (errors.items as any)?.message}
                            </p>
                        )}
                        <InvoiceFreeItemInput onAdd={handleAddFreeItem} count={freeItems.length} />
                        <InvoiceItemTable
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
                        <InvoiceTotals totals={totals} />
                    </>
                )}

                {/* その他タブ */}
                {activeTab === 'other' && <InvoiceOtherFields control={control} />}

                {/* 操作ボタン */}
                <div className="fixed bottom-0 right-0 p-2">
                    {isDirty && <div className="text-red-600 text-right pb-1 text-sm">未保存の変更があります</div>}
                    <div className="flex gap-4 bg-white">
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
                            type="button"
                            disabled={isDirty}
                            onClick={() => router.push(`/pdf/invoice/${invoice.id}`)}
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
