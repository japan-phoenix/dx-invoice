'use client'

import { Control, FieldArrayWithId, useWatch } from 'react-hook-form'
import { InvoiceItem } from '@/lib/invoices'
import { InvoiceFormData } from '../schemas/InvoiceFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'

type Props = {
    items: InvoiceItem[]
    fields: FieldArrayWithId<InvoiceFormData, 'items', 'id'>[]
    control: Control<InvoiceFormData>
    handleRemoveItem: (index: number) => void
    customer: any
}

export function InvoiceItemTable({ items, fields, control, handleRemoveItem, customer }: Props) {
    const isMember = Boolean(customer?.memberCardNote)
    const watchedItems = useWatch({ control, name: 'items' })
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
                    {fields.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="p-8 text-center text-gray-500">
                                明細がありません
                            </td>
                        </tr>
                    ) : (
                        fields.map((field, index) => {
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
                                            <span className="material-symbols-outlined text-3xl">delete_forever</span>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}
