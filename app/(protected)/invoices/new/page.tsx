'use client'

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
import { FormInput } from '@/components/form/FormInput'
import { FormSelect } from '@/components/form/FormSelect'
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
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col p-8">
                <h1 className="mb-8 text-2xl font-bold">請求書 作成</h1>

                {/* 基本情報 */}
                <div className="mb-8">
                    <h3 className="mb-4">基本情報</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput name="docNo" control={control} label="請求番号" placeholder="例: INV-0001" />
                        <FormSelect
                            name="isMember"
                            control={control}
                            label="一般・会員"
                            options={[
                                { value: 'false', label: '一般' },
                                { value: 'true', label: '会員' },
                            ]}
                        />
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
                                    {copyingFrom ? 'コピー中...' : `見積 ${estimate.docNo || estimate.id} からコピー`}
                                </button>
                            ))}
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            ※ コピーすると請求書が作成され、編集画面に遷移します
                        </p>
                    </div>
                )}

                {/* 品目検索・追加 */}
                <InvoiceProductSearch {...productSearchProps} items={items} />

                {/* 明細一覧 */}
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

                {/* 合計エリア */}
                <InvoiceTotals totals={totals} />

                {/* その他項目 */}
                <InvoiceOtherFields control={control} />

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

export default function InvoiceNewPage() {
    return (
        <Suspense fallback={<div className="p-8">読み込み中...</div>}>
            <InvoiceNewPageInner />
        </Suspense>
    )
}
