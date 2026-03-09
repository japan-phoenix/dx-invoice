'use client'

import { CreateButton } from '@/components/button/CreateButton'
import { DataTable } from '@/components/table/DataTable'
import { CustomerListItem, SearchCustomersParams } from '@/lib/customers'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCustomersQuery } from '@/hooks/useCustomer'
import { useCreatePaymentMutation, useCancelPaymentMutation } from '@/hooks/usePayment'
import { CaseSearchForm } from './components/CaseSearchForm'

interface FormParams extends SearchCustomersParams {
    receptionFromInput?: string
    receptionToInput?: string
    funeralFromInput?: string
    funeralToInput?: string
}

export default function CasesPage() {
    const router = useRouter()
    // フォーム入力値（検索後も保持）
    const [formParams, setFormParams] = useState<FormParams>({})
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
    const createPaymentMutation = useCreatePaymentMutation()
    const cancelPaymentMutation = useCancelPaymentMutation()

    const loading = customersLoading

    const handleSearch = (params: SearchCustomersParams) => {
        // searchParams を更新して検索を実行
        setSearchParams(params)
        // formParams は既に更新されているので、ここでは何もしない
    }

    const handleReset = () => {
        // フォーム入力値と検索パラメータをリセット
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
            <div className="flex items-start justify-between">
                <h1 className="mb-8 text-2xl font-bold">葬儀案件検索一覧</h1>
                <CreateButton onClick={() => router.push('/cases/new')}>新規登録</CreateButton>
            </div>

            {/* 検索条件エリア */}
            <CaseSearchForm
                formParams={formParams}
                setFormParams={setFormParams}
                onSearch={handleSearch}
                onReset={handleReset}
                isLoading={loading}
            />

            {/* 検索結果一覧 */}
            <div className="flex h-96 flex-col">
                <DataTable<CustomerListItem>
                    columns={[
                        {
                            key: 'receptionNo',
                            label: 'No',
                            width: '50px',
                        },
                        {
                            key: 'isPaid',
                            label: '入金',
                            width: '80px',
                            render: (item) =>
                                item.hasInvoice ? (
                                    <div className="flex justify-center">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handlePaymentClick(item)
                                            }}
                                            className={`rounded px-2 py-1 text-xs text-white ${
                                                item.isPaid
                                                    ? 'bg-blue-600 hover:bg-blue-700'
                                                    : 'bg-red-600 hover:bg-red-700'
                                            }`}
                                        >
                                            {item.isPaid ? '取消' : '登録'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">-</div>
                                ),
                        },
                        {
                            key: 'deceasedName',
                            label: '故人名',
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
                            sortable: true,
                            sortValue: (item) => (item.receptionAt ? new Date(item.receptionAt).getTime() : null),
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
                            render: (item) => <p className="text-center">{item.hasEstimate ? '○' : '-'}</p>,
                        },
                        {
                            key: 'hasInvoice',
                            label: '請求',
                            width: '60px',
                            render: (item) => <p className="text-center">{item.hasInvoice ? '○' : '-'}</p>,
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
                                        if (item.hasEstimate) {
                                            router.push(`/estimates/${item.estimateId}`)
                                        } else {
                                            router.push(`/estimates/new?customerId=${item.id}`)
                                        }
                                    }}
                                    className={`rounded px-2 py-1 text-xs text-white ${item.hasEstimate ? 'bg-cyan-600' : 'bg-gray-500'}`}
                                >
                                    {item.hasEstimate ? '見積書編集' : '見積書作成'}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        if (item.hasInvoice && item.invoiceId) {
                                            router.push(`/invoices/${item.invoiceId}`)
                                        } else {
                                            router.push(`/invoices/new?customerId=${item.id}`)
                                        }
                                    }}
                                    className={`rounded px-2 py-1 text-xs ${item.hasInvoice ? 'bg-yellow-400 text-black' : 'bg-gray-500 text-white'}`}
                                >
                                    {item.hasInvoice ? '請求書編集' : '請求書作成'}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        router.push(`/flowers/customer/${item.id}`)
                                    }}
                                    className="rounded bg-green-600 px-2 py-1 text-xs text-white"
                                >
                                    供花登録
                                </button>
                                {item.isPaid && item.invoiceId && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            router.push(`/pdf/receipt/${item.invoiceId}`)
                                        }}
                                        className="rounded bg-purple-600 px-2 py-1 text-xs text-white hover:bg-purple-700"
                                    >
                                        領収書発行
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
