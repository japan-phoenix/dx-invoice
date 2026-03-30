'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Control, FieldArrayWithId, UseFormSetValue, useWatch } from 'react-hook-form'
import { FormInput } from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import Image from 'next/image'
import { ImageOff, X } from 'lucide-react'
import { ProductVariant } from '@/lib/products'

/**
 * EstimateFormData と InvoiceFormData は構造が完全に一致するため、
 * 共通の DocumentFormData 型として表現できる。
 * TypeScript の structural typing により、どちらの Control も代入可能。
 */
export type DocumentFormData = {
    docNo: string
    status: string
    isMember: string
    cremationProcessType: string
    altarPlaceType: string
    altarPlaceOther: string
    ceilingHeight: string
    estimateStaff: string
    ceremonyStaff: string
    transportStaff: string
    decorationStaff: string
    returnStaff: string
    items: { qty: number; description: string }[]
    freeItems: { description: string; qty: number }[]
}

type DocumentItem = {
    productItemId?: string | null
    productItem?: { name?: string | null; variants?: ProductVariant[] } | null
    productVariantId?: string | null
    productVariant?: { id: string; name: string } | null
    unitPriceGeneral: number
    unitPriceMember: number
    qty: number
}

type DocumentFreeItem = {
    productItemName?: string | null
    unitPriceGeneral: number
    qty: number
}

type Props = {
    items: DocumentItem[]
    fields: FieldArrayWithId<DocumentFormData, 'items', 'id'>[]
    control: Control<DocumentFormData>
    isMember: boolean
    freeItems?: DocumentFreeItem[]
    freeFields?: FieldArrayWithId<DocumentFormData, 'freeItems', 'id'>[]
    handleRemoveFreeItem?: (index: number) => void
    onVariantChange?: (index: number, variant: ProductVariant) => void
    setValue?: UseFormSetValue<DocumentFormData>
    readOnly?: boolean
}

export function DocumentItemTable({
    items,
    fields,
    control,
    isMember,
    freeItems = [],
    freeFields = [],
    handleRemoveFreeItem,
    onVariantChange,
    setValue,
    readOnly = false,
}: Props) {
    const [variantDialogIndex, setVariantDialogIndex] = useState<number | null>(null)
    const [pendingVariant, setPendingVariant] = useState<ProductVariant | null>(null)
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null)
    const [checkedItems, setCheckedItems] = useState<boolean[]>([])
    const [prevQtySignature, setPrevQtySignature] = useState('')

    const qtySignature = items.map((i) => i.qty ?? 0).join(',')
    if (qtySignature !== prevQtySignature) {
        setPrevQtySignature(qtySignature)
        setCheckedItems(items.map((item) => (item.qty ?? 0) > 0))
    }

    const openVariantDialog = (index: number) => {
        const item = items[index]
        const variants = item?.productItem?.variants || []
        const current = variants.find((v) => v.id === item?.productVariantId) || variants[0] || null
        setPendingVariant(current)
        setVariantDialogIndex(index)
    }

    const confirmVariant = () => {
        if (variantDialogIndex !== null && pendingVariant) {
            onVariantChange?.(variantDialogIndex, pendingVariant)
            setValue?.(`items.${variantDialogIndex}.qty` as `items.${number}.qty`, 1)
        }
        setVariantDialogIndex(null)
        setPendingVariant(null)
    }

    const watchedItems = useWatch({ control, name: 'items' })
    const watchedFreeItems = useWatch({ control, name: 'freeItems' })
    const hasRows = fields.length > 0 || freeFields.length > 0
    return (
        <div className="mb-8">
            <h3 className="mb-4">明細</h3>
            <table className="w-full border-collapse bg-white">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="w-16 border border-gray-300 p-1 text-center">有無</th>
                        <th className="w-32 border border-gray-300 p-3 text-left">品目</th>
                        <th className="border border-gray-300 p-3 text-left">摘要</th>
                        <th className="w-20 border border-gray-300 p-3 text-right">数量</th>
                        <th className="w-28 border border-gray-300 p-3 text-right">種類</th>
                        <th className="w-16 border border-gray-300 p-3 text-center">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {!hasRows ? (
                        <tr>
                            <td colSpan={6} className="p-8 text-center text-gray-500">
                                明細がありません
                            </td>
                        </tr>
                    ) : (
                        <>
                            {fields.map((field, index) => {
                                const item = items[index]
                                const unitPrice =
                                    item != null ? (isMember ? item.unitPriceMember : item.unitPriceGeneral) : 0
                                const liveQty = watchedItems?.[index]?.qty ?? item?.qty ?? 0
                                const amount = unitPrice * liveQty
                                return (
                                    <tr key={field.id}>
                                        <td className="border border-gray-300 p-1 text-center">
                                            {!readOnly && (
                                                <input
                                                    type="checkbox"
                                                    checked={checkedItems[index] ?? false}
                                                    onChange={(e) =>
                                                        setCheckedItems((prev) => {
                                                            const next = [...prev]
                                                            next[index] = e.target.checked
                                                            return next
                                                        })
                                                    }
                                                    className="h-5 w-5 cursor-pointer"
                                                />
                                            )}
                                        </td>
                                        <td className="border border-gray-300 p-3">{item?.productItem?.name ?? '-'}</td>
                                        <td className="border border-gray-300 p-3">
                                            <FormTextarea
                                                name={`items.${index}.description`}
                                                control={control}
                                                rows={2}
                                                noResize
                                                maxRows={2}
                                                disabled={!checkedItems[index]}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-3">
                                            <FormInput
                                                name={`items.${index}.qty`}
                                                control={control}
                                                type="number"
                                                disabled={!checkedItems[index]}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-3 text-right">
                                            <div className="text-sm">{item?.productVariant?.name ?? '-'}</div>
                                            <div>¥{amount.toLocaleString()}</div>
                                        </td>
                                        <td className="border border-gray-300 p-3 text-center">
                                            {!readOnly && (
                                                <button
                                                    type="button"
                                                    onClick={() => openVariantDialog(index)}
                                                    disabled={!checkedItems[index]}
                                                    className="cursor-pointer rounded border-0 bg-transparent p-1 text-gray-600 disabled:cursor-not-allowed disabled:opacity-30"
                                                    title="種類選択"
                                                >
                                                    <span
                                                        className="material-symbols-outlined"
                                                        style={{ fontSize: '2rem' }}
                                                    >
                                                        feature_search
                                                    </span>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                            {freeFields.map((field, index) => {
                                const item = freeItems[index]
                                const liveQty = watchedFreeItems?.[index]?.qty ?? item?.qty ?? 0
                                const amount = (item?.unitPriceGeneral ?? 0) * liveQty
                                return (
                                    <tr key={field.id} className="bg-blue-50">
                                        <td className="border border-gray-300 p-1 text-center">-</td>
                                        <td className="border border-gray-300 p-3 text-xl">
                                            {item?.productItemName ?? '-'}
                                        </td>
                                        <td className="border border-gray-300 p-3">
                                            <FormTextarea
                                                name={`freeItems.${index}.description`}
                                                control={control}
                                                rows={2}
                                                noResize
                                                maxRows={2}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-3">
                                            <FormInput
                                                name={`freeItems.${index}.qty`}
                                                control={control}
                                                type="number"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-3 text-right">
                                            <div className="text-sm">{`フリー項目${index + 1}`}</div>
                                            <div className="text-md">¥{amount.toLocaleString()}</div>
                                        </td>
                                        <td className="border border-gray-300 p-3 text-center">
                                            {!readOnly && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFreeItem?.(index)}
                                                    className="cursor-pointer rounded border-0 bg-transparent p-1 text-red-600"
                                                    title="削除"
                                                >
                                                    <span
                                                        className="material-symbols-outlined"
                                                        style={{ fontSize: '2rem' }}
                                                    >
                                                        delete_forever
                                                    </span>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                    )}
                </tbody>
            </table>

            {/* 種類選択ダイアログ */}
            {enlargedImage &&
                createPortal(
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black/70"
                        style={{ zIndex: 99999, pointerEvents: 'auto' }}
                        onClick={() => setEnlargedImage(null)}
                    >
                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <button
                                type="button"
                                onClick={() => setEnlargedImage(null)}
                                className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow"
                                aria-label="閉じる"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <Image
                                src={enlargedImage}
                                alt="拡大画像"
                                width={480}
                                height={480}
                                className="max-h-[80vh] max-w-[80vw] rounded object-contain"
                            />
                        </div>
                    </div>,
                    document.body
                )}
            <Dialog open={variantDialogIndex !== null} onOpenChange={(open) => !open && setVariantDialogIndex(null)}>
                <DialogContent
                    className="max-w-xl"
                    onInteractOutside={(e) => {
                        if (enlargedImage) e.preventDefault()
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>種類選択</DialogTitle>
                    </DialogHeader>
                    {variantDialogIndex !== null &&
                        (() => {
                            const item = items[variantDialogIndex]
                            const variants = item?.productItem?.variants || []
                            return (
                                <div>
                                    <p className="mb-4 text-lg font-medium">{item?.productItem?.name}</p>
                                    {variants.length === 0 ? (
                                        <p className="text-gray-500">種類がありません</p>
                                    ) : (
                                        <div className="grid grid-cols-3 gap-3">
                                            {variants.map((v) => {
                                                const isSelected = pendingVariant?.id === v.id
                                                return (
                                                    <button
                                                        key={v.id}
                                                        type="button"
                                                        onClick={() => setPendingVariant(v)}
                                                        className={`flex flex-col items-center rounded-lg border-2 p-3 transition-colors ${
                                                            isSelected
                                                                ? 'border-blue-500 bg-blue-100'
                                                                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <div className="mb-2 flex h-24 w-full items-center justify-center overflow-hidden rounded">
                                                            {v.imageUrl ? (
                                                                <div
                                                                    role="button"
                                                                    tabIndex={-1}
                                                                    className="h-full w-full cursor-zoom-in"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        setEnlargedImage(
                                                                            `/images/products/${v.imageUrl}`
                                                                        )
                                                                    }}
                                                                    aria-label="画像を拡大"
                                                                >
                                                                    <Image
                                                                        src={`/images/products/${v.imageUrl}`}
                                                                        alt={v.name}
                                                                        width={96}
                                                                        height={96}
                                                                        className="h-full w-full object-contain"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <ImageOff className="h-10 w-10 text-gray-300" />
                                                            )}
                                                        </div>
                                                        <p className="mb-1 w-full text-center text-xl font-medium leading-snug">
                                                            {v.name}
                                                        </p>
                                                        <p className="text-lg text-gray-500">
                                                            一般: ¥{v.priceGeneral.toLocaleString()}
                                                        </p>
                                                        <p className="text-lg text-gray-500">
                                                            会員: ¥{v.priceMember.toLocaleString()}
                                                        </p>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        })()}
                    <DialogFooter>
                        <button
                            type="button"
                            onClick={() => setVariantDialogIndex(null)}
                            className="cursor-pointer rounded border border-gray-300 bg-white px-4 py-2 text-gray-700"
                        >
                            キャンセル
                        </button>
                        <button
                            type="button"
                            onClick={confirmVariant}
                            disabled={!pendingVariant}
                            className="cursor-pointer rounded border-0 bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                            確定
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
