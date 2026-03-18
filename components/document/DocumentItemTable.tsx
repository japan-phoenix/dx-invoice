'use client'

import { Control, FieldArrayWithId, useWatch } from 'react-hook-form'
import { FormInput } from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'

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
    productItem?: { name?: string | null } | null
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
    handleRemoveItem: (index: number) => void
    isMember: boolean
    freeItems?: DocumentFreeItem[]
    freeFields?: FieldArrayWithId<DocumentFormData, 'freeItems', 'id'>[]
    handleRemoveFreeItem?: (index: number) => void
}

export function DocumentItemTable({
    items,
    fields,
    control,
    handleRemoveItem,
    isMember,
    freeItems = [],
    freeFields = [],
    handleRemoveFreeItem,
}: Props) {
    const watchedItems = useWatch({ control, name: 'items' })
    const watchedFreeItems = useWatch({ control, name: 'freeItems' })
    const hasRows = fields.length > 0 || freeFields.length > 0
    return (
        <div className="mb-8">
            <h3 className="mb-4">明細</h3>
            <table className="w-full border-collapse bg-white">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="w-32 border border-gray-300 p-3 text-left">品目</th>
                        <th className="border border-gray-300 p-3 text-left">摘要</th>
                        <th className="w-24 border border-gray-300 p-3 text-right">数量</th>
                        <th className="w-32 border border-gray-300 p-3 text-right">
                            {isMember ? '会員価格' : '一般価格'}
                        </th>
                        <th className="w-16 border border-gray-300 p-3 text-center">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {!hasRows ? (
                        <tr>
                            <td colSpan={5} className="p-8 text-center text-gray-500">
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
                                        <td className="border border-gray-300 p-3">{item?.productItem?.name ?? '-'}</td>
                                        <td className="border border-gray-300 p-3">
                                            <FormTextarea
                                                name={`items.${index}.description`}
                                                control={control}
                                                rows={2}
                                                noResize
                                                maxRows={2}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-3">
                                            <FormInput name={`items.${index}.qty`} control={control} type="number" />
                                        </td>
                                        <td className="border border-gray-300 p-3 text-right">
                                            ¥{amount.toLocaleString()}
                                        </td>
                                        <td className="border border-gray-300 p-3 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(index)}
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
                                            ¥{amount.toLocaleString()}
                                        </td>
                                        <td className="border border-gray-300 p-3 text-center">
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
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}
