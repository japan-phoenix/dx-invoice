'use client'

import { CreateButton } from '@/components/button/CreateButton'
import { ResetButton } from '@/components/button/ResetButton'
import { SearchButton } from '@/components/button/SearchButton'
import { DataTable } from '@/components/table/DataTable'
import { CustomerListItem, SearchCustomersParams } from '@/lib/customers'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCustomersQuery } from '@/hooks/useCustomer'
import { useCitiesQuery, useTownsQuery } from '@/hooks/useAddress'
import { useCreatePaymentMutation, useCancelPaymentMutation } from '@/hooks/usePayment'

export default function CasesPage() {
    const router = useRouter()
    // 検索用フォームの入力状態
    const [formParams, setFormParams] = useState<SearchCustomersParams>({})
    // 実際に検索に使用するパラメータ
    const [searchParams, setSearchParams] = useState<SearchCustomersParams>({})
    const [paymentDialog, setPaymentDialog] = useState<{
        open: boolean
        invoiceId: string | null
        customerId: string | null
        isPaid: boolean
    }>({ open: false, invoiceId: null, customerId: null, isPaid: false })
    const [paymentData, setPaymentData] = useState({ paidAt: '', memo: '' })

    // React Query フック
    const { data: customers = [], isLoading: customersLoading } = useCustomersQuery(searchParams)
    const { data: cities = [] } = useCitiesQuery()
    const { data: towns = [] } = useTownsQuery(formParams.cityId || null)
    const createPaymentMutation = useCreatePaymentMutation()
    const cancelPaymentMutation = useCancelPaymentMutation()

    const loading = customersLoading

    const handleCityChange = (cityId: string) => {
        setFormParams({ ...formParams, cityId, townId: undefined })
    }

    const handleSearch = () => {
        setSearchParams(formParams)
    }

    const handleReset = () => {
        setFormParams({})
        setSearchParams({})
    }

    const formatDate = (dateString: string | null) => {
        if (!dateString) return ''
        try {
            const date = new Date(dateString)
            if (isNaN(date.getTime())) return ''
            return date.toLocaleDateString('ja-JP')
        } catch {
            return ''
        }
    }

    const handlePaymentClick = (customer: CustomerListItem) => {
        if (!customer.invoiceId) return
        setPaymentDialog({
            open: true,
            invoiceId: customer.invoiceId,
            customerId: customer.id,
            isPaid: customer.isPaid,
        })
        setPaymentData({
            paidAt: new Date().toISOString().split('T')[0],
            memo: '',
        })
    }

    const handlePaymentSave = async () => {
        if (!paymentDialog.invoiceId) return
        try {
            if (paymentDialog.isPaid) {
                await cancelPaymentMutation.mutateAsync({
                    invoiceId: paymentDialog.invoiceId,
                    data: paymentData,
                })
            } else {
                await createPaymentMutation.mutateAsync({
                    invoiceId: paymentDialog.invoiceId,
                    data: paymentData,
                })
            }
            setPaymentDialog({ open: false, invoiceId: null, customerId: null, isPaid: false })
        } catch (error) {
            console.error('Payment failed:', error)
            alert('入金処理に失敗しました')
        }
    }

    const handlePaymentCancel = () => {
        setPaymentDialog({ open: false, invoiceId: null, customerId: null, isPaid: false })
    }

    if (loading && customers.length === 0) {
        return <div className="p-8">読み込み中...</div>
    }

    return (
        <div className="p-8">
            <h1 className="mb-8 text-2xl font-bold">葬儀案件検索一覧</h1>

            {/* 検索条件エリア */}
            <div className="mb-8 rounded-lg bg-gray-100 p-6">
                <div className="mb-4 grid grid-cols-3 gap-4">
                    <div>
                        <label className="mb-2 block text-sm">市区町村</label>
                        <select
                            value={formParams.cityId || ''}
                            onChange={(e) => handleCityChange(e.target.value)}
                            className="w-full rounded border border-gray-300 px-2 py-2"
                        >
                            <option value="">選択してください</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm">町字</label>
                        <select
                            value={formParams.townId || ''}
                            onChange={(e) => setFormParams({ ...formParams, townId: e.target.value })}
                            disabled={!formParams.cityId}
                            className="w-full rounded border border-gray-300 px-2 py-2 disabled:cursor-not-allowed disabled:bg-gray-200"
                        >
                            <option value="">選択してください</option>
                            {towns.map((town) => (
                                <option key={town.id} value={town.id}>
                                    {town.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm">氏名（苗字）</label>
                        <input
                            type="text"
                            value={formParams.lastName || ''}
                            onChange={(e) => setFormParams({ ...formParams, lastName: e.target.value })}
                            className="w-full rounded border border-gray-300 px-2 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm">氏名（名前）</label>
                        <input
                            type="text"
                            value={formParams.firstName || ''}
                            onChange={(e) => setFormParams({ ...formParams, firstName: e.target.value })}
                            className="w-full rounded border border-gray-300 px-2 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm">受付日（From）</label>
                        <input
                            type="date"
                            value={formParams.receptionFrom || ''}
                            onChange={(e) => setFormParams({ ...formParams, receptionFrom: e.target.value })}
                            className="w-full rounded border border-gray-300 px-2 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm">受付日（To）</label>
                        <input
                            type="date"
                            value={formParams.receptionTo || ''}
                            onChange={(e) => setFormParams({ ...formParams, receptionTo: e.target.value })}
                            className="w-full rounded border border-gray-300 px-2 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm">葬儀日（From）</label>
                        <input
                            type="date"
                            value={formParams.funeralFrom || ''}
                            onChange={(e) => setFormParams({ ...formParams, funeralFrom: e.target.value })}
                            className="w-full rounded border border-gray-300 px-2 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm">葬儀日（To）</label>
                        <input
                            type="date"
                            value={formParams.funeralTo || ''}
                            onChange={(e) => setFormParams({ ...formParams, funeralTo: e.target.value })}
                            className="w-full rounded border border-gray-300 px-2 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm">入金状態</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formParams.paid === true}
                                    onChange={(e) =>
                                        setFormParams({
                                            ...formParams,
                                            paid: e.target.checked ? true : undefined,
                                            unpaid: e.target.checked ? undefined : formParams.unpaid,
                                        })
                                    }
                                />
                                入金済
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formParams.unpaid === true}
                                    onChange={(e) =>
                                        setFormParams({
                                            ...formParams,
                                            unpaid: e.target.checked ? true : undefined,
                                            paid: e.target.checked ? undefined : formParams.paid,
                                        })
                                    }
                                />
                                未入金
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <SearchButton onClick={handleSearch} isLoading={loading} />
                    <ResetButton onClick={handleReset} />
                    <CreateButton onClick={() => router.push('/cases/new')}>新規登録</CreateButton>
                </div>
            </div>

            {/* 検索結果一覧 */}
            <div className="flex h-96 flex-col">
                <DataTable<CustomerListItem>
                    columns={[
                        {
                            key: 'deceasedName',
                            label: '氏名',
                            width: '150px',
                        },
                        {
                            key: 'age',
                            label: '行年',
                            width: '80px',
                            render: (item) => (item.age ? `${item.age}歳` : '-'),
                        },
                        {
                            key: 'address',
                            label: '住所',
                            width: '200px',
                        },
                        {
                            key: 'receptionAt',
                            label: '受付日',
                            width: '120px',
                            render: (item) => formatDate(item.receptionAt),
                        },
                        {
                            key: 'funeralFrom',
                            label: '葬儀日',
                            width: '120px',
                            render: (item) => formatDate(item.funeralFrom),
                        },
                        {
                            key: 'hasEstimate',
                            label: '見積',
                            width: '60px',
                            render: (item) => (item.hasEstimate ? '○' : '-'),
                        },
                        {
                            key: 'hasInvoice',
                            label: '請求',
                            width: '60px',
                            render: (item) => (item.hasInvoice ? '○' : '-'),
                        },
                        {
                            key: 'isPaid',
                            label: '入金',
                            width: '60px',
                            render: (item) => (item.isPaid ? '○' : '-'),
                        },
                    ]}
                    actionColumn={{
                        key: 'actions',
                        label: '操作',
                        width: '280px',
                        render: (item) => (
                            <div className="flex flex-wrap justify-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        router.push(`/estimates/${item.id}`)
                                    }}
                                    className={`rounded px-2 py-1 text-xs text-white ${item.hasEstimate ? 'bg-cyan-600' : 'bg-gray-500'}`}
                                >
                                    {item.hasEstimate ? '見積' : '見積作成'}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        router.push(`/invoices/${item.id}`)
                                    }}
                                    className={`rounded px-2 py-1 text-xs ${item.hasInvoice ? 'bg-yellow-400 text-black' : 'bg-gray-500 text-white'}`}
                                >
                                    {item.hasInvoice ? '請求' : '請求作成'}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        router.push(`/flowers/${item.id}`)
                                    }}
                                    className="rounded bg-green-600 px-2 py-1 text-xs text-white"
                                >
                                    供花
                                </button>
                                {item.hasInvoice && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handlePaymentClick(item)
                                        }}
                                        className={`rounded px-2 py-1 text-xs text-white ${item.isPaid ? 'bg-gray-500' : 'bg-red-600'}`}
                                    >
                                        {item.isPaid ? '取消' : '入金'}
                                    </button>
                                )}
                            </div>
                        ),
                    }}
                    data={customers}
                    itemsPerPage={10}
                    onRowClick={(customer) => router.push(`/cases/${customer.id}`)}
                    emptyMessage="検索結果がありません"
                    rowKey={(item) => item.id}
                />
            </div>

            {/* 入金入力ダイアログ */}
            {paymentDialog.open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handlePaymentCancel}
                >
                    <div className="w-11/12 max-w-md rounded-lg bg-white p-8" onClick={(e) => e.stopPropagation()}>
                        <h2 className="mb-6 text-lg font-bold">{paymentDialog.isPaid ? '入金取消' : '入金登録'}</h2>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium">入金日</label>
                            <input
                                type="date"
                                value={paymentData.paidAt}
                                onChange={(e) => setPaymentData({ ...paymentData, paidAt: e.target.value })}
                                className="w-full rounded border border-gray-300 px-2 py-2"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium">備考</label>
                            <textarea
                                value={paymentData.memo}
                                onChange={(e) => setPaymentData({ ...paymentData, memo: e.target.value })}
                                rows={3}
                                className="w-full rounded border border-gray-300 px-2 py-2"
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handlePaymentCancel}
                                className="rounded bg-gray-500 px-6 py-3 text-white hover:bg-gray-600"
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={handlePaymentSave}
                                className={`rounded px-6 py-3 text-white ${paymentDialog.isPaid ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {paymentDialog.isPaid ? '取消' : '保存'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
