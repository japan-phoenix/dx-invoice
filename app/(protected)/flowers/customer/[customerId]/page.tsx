'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getBillingTargets, deleteFlower, Flower, FlowerBillingTarget } from '@/lib/flowers'
import { getCustomer } from '@/lib/customers'
import { createFlowerTargetPayment, cancelFlowerTargetPayment } from '@/lib/payments'
import { toast } from '@/hooks/use-toast'
import { FlowerCustomerInfo } from '../../components/FlowerCustomerInfo'
import { FlowerFormDialog } from '../../components/FlowerFormDialog'
import { BillingTargetDialog } from '../../components/BillingTargetDialog'
import { DataTable } from '@/components/table/DataTable'

export default function FlowersListPage() {
    const router = useRouter()
    const params = useParams()
    const customerId = params.customerId as string
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState<any>(null)
    const [targets, setTargets] = useState<FlowerBillingTarget[]>([])
    const [dialogState, setDialogState] = useState<{ open: boolean; flower: Flower | null }>({
        open: false,
        flower: null,
    })
    const [targetDialogState, setTargetDialogState] = useState<{ open: boolean; target: FlowerBillingTarget | null }>({
        open: false,
        target: null,
    })

    const loadData = useCallback(async () => {
        try {
            const [customerData, flowersData] = await Promise.all([
                getCustomer(customerId),
                getBillingTargets(customerId),
            ])
            setCustomer(customerData)
            setTargets(flowersData)
        } catch (error) {
            console.error('Failed to load data:', error)
            toast({ title: 'データの読み込みに失敗しました', variant: 'destructive', duration: 3000 })
        } finally {
            setLoading(false)
        }
    }, [customerId])

    useEffect(() => {
        loadData()
    }, [loadData])

    const handleDeleteFlower = async (id: string) => {
        if (!confirm('削除してもよろしいですか？')) return
        try {
            await deleteFlower(id)
            toast({ title: '削除しました', variant: 'success', duration: 2000 })
            loadData()
        } catch (error) {
            console.error('Failed to delete flower:', error)
            toast({ title: '削除に失敗しました', variant: 'destructive', duration: 3000 })
        }
    }

    const handlePayment = async (targetId: string, isPaid: boolean) => {
        try {
            if (isPaid) {
                await cancelFlowerTargetPayment(targetId)
                toast({ title: '入金を取り消しました', variant: 'success', duration: 2000 })
            } else {
                await createFlowerTargetPayment(targetId)
                toast({ title: '入金完了にしました', variant: 'success', duration: 2000 })
            }
            loadData()
        } catch (error) {
            console.error('Failed to update payment:', error)
            toast({ title: '入金処理に失敗しました', variant: 'destructive', duration: 3000 })
        }
    }

    const getTargetTotal = (target: FlowerBillingTarget) => {
        return target.flowers.reduce((sum, f) => sum + f.amount, 0)
    }

    if (loading) {
        return <div className="p-8">読み込み中...</div>
    }

    return (
        <div className="p-8">
            <h1 className="mb-8 text-2xl font-bold">供花一覧</h1>

            {/* 顧客情報サマリー */}
            {customer && <FlowerCustomerInfo customer={customer} />}

            {/* 操作ボタン */}
            <div className="mb-8 flex gap-4">
                <button
                    onClick={() => setDialogState({ open: true, flower: null })}
                    className="cursor-pointer rounded border-0 bg-green-600 px-6 py-3 text-white"
                >
                    供花 新規登録
                </button>
                <button
                    onClick={() => router.push(`/pdf/flower/${customerId}`)}
                    className="cursor-pointer rounded border-0 bg-cyan-600 px-6 py-3 text-white"
                >
                    請求書一括印刷
                </button>
            </div>

            {/* 供花一覧（請求先単位）: 供花明細が1件以上のもののみ表示 */}
            {targets.filter((t) => t.flowers.length > 0).length === 0 ? (
                <p className="text-gray-500">供花が登録されていません</p>
            ) : (
                targets
                    .filter((t) => t.flowers.length > 0)
                    .map((target) => {
                        const total = getTargetTotal(target)
                        return (
                            <div key={target.id} className="mb-8 rounded-lg border border-gray-300 p-6">
                                {/* 請求先ヘッダー */}
                                <div className="mb-4 flex items-center justify-between border-b-2 border-gray-300 pb-4">
                                    <div>
                                        <div className="flex items-start gap-4">
                                            <h3 className="mb-1 text-lg font-bold">請求先: {target.billToName}</h3>
                                            <button
                                                onClick={() => setTargetDialogState({ open: true, target })}
                                                className="cursor-pointer rounded border-0 text-sm text-white"
                                            >
                                                <span className="material-symbols-outlined text-gray-500">edit</span>
                                            </button>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <p>{target.billToAddress}</p>
                                            {target.billToTel && <p>TEL: {target.billToTel}</p>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        {target.isPaid ? (
                                            <button
                                                onClick={() => handlePayment(target.id, true)}
                                                className="cursor-pointer rounded border-0 bg-red-600 px-3 py-2 text-sm text-white"
                                            >
                                                入金取消
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handlePayment(target.id, false)}
                                                className="cursor-pointer rounded border-0 bg-green-600 px-3 py-2 text-sm text-white"
                                            >
                                                入金完了
                                            </button>
                                        )}

                                        <div className="flex items-center gap-2">
                                            <p className="text-xl font-bold">合計: ¥{total.toLocaleString()}</p>
                                            <span
                                                className={`rounded px-2 py-1 text-xs font-semibold ${
                                                    target.isPaid
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                            >
                                                {target.isPaid ? '入金済み' : '未入金'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 供花明細テーブル */}
                                <DataTable<Flower>
                                    columns={[
                                        { key: 'requesterName', label: '依頼主', width: '150px' },
                                        {
                                            key: 'labelName',
                                            label: '名札',
                                            width: '150px',
                                            render: (f) => f.labelName || '-',
                                        },
                                        {
                                            key: 'jointNames',
                                            label: '連名',
                                            width: '150px',
                                            render: (f) => f.jointNames || '-',
                                        },
                                        {
                                            key: 'deliveryTo',
                                            label: '配送先',
                                            width: '120px',
                                            render: (f) => f.deliveryTo || '-',
                                        },
                                        {
                                            key: 'amount',
                                            label: '金額',
                                            render: (f) => `¥${f.amount.toLocaleString()}`,
                                        },
                                    ]}
                                    actionColumn={{
                                        key: 'actions',
                                        label: '操作',
                                        width: '130px',
                                        render: (flower) => (
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        !target.isPaid && setDialogState({ open: true, flower })
                                                    }
                                                    disabled={target.isPaid}
                                                    className={`rounded border-0 px-3 py-1 text-sm text-white ${
                                                        target.isPaid
                                                            ? 'cursor-not-allowed bg-gray-300'
                                                            : 'cursor-pointer bg-cyan-600'
                                                    }`}
                                                >
                                                    編集
                                                </button>
                                                <button
                                                    onClick={() => !target.isPaid && handleDeleteFlower(flower.id)}
                                                    disabled={target.isPaid}
                                                    className={`rounded border-0 px-3 py-1 text-sm text-white ${
                                                        target.isPaid
                                                            ? 'cursor-not-allowed bg-gray-300'
                                                            : 'cursor-pointer bg-red-600'
                                                    }`}
                                                >
                                                    削除
                                                </button>
                                            </div>
                                        ),
                                    }}
                                    data={target.flowers}
                                    itemsPerPage={50}
                                    emptyMessage="供花が登録されていません"
                                    rowKey={(f) => f.id}
                                />
                            </div>
                        )
                    })
            )}

            {/* 供花 新規登録 / 編集ダイアログ */}
            <FlowerFormDialog
                open={dialogState.open}
                onOpenChange={(open) => setDialogState((prev) => ({ ...prev, open }))}
                customerId={customerId}
                flower={dialogState.flower}
                billingTargets={targets}
                onSuccess={loadData}
            />

            {/* 請求先 登録 / 編集ダイアログ */}
            <BillingTargetDialog
                open={targetDialogState.open}
                onOpenChange={(open) => setTargetDialogState((prev) => ({ ...prev, open }))}
                customerId={customerId}
                target={targetDialogState.target}
                onSuccess={loadData}
            />
        </div>
    )
}
