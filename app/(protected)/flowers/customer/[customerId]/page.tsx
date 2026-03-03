'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getFlowers, deleteFlower, FlowerBillingTarget } from '@/lib/flowers'
import { getCustomer } from '@/lib/customers'
import { createFlowerTargetPayment, cancelFlowerTargetPayment } from '@/lib/payments'
import { toast } from '@/hooks/use-toast'
import { FlowerCustomerInfo } from '../../components/FlowerCustomerInfo'

export default function FlowersListPage() {
    const router = useRouter()
    const params = useParams()
    const customerId = params.customerId as string
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState<any>(null)
    const [targets, setTargets] = useState<FlowerBillingTarget[]>([])

    const loadData = useCallback(async () => {
        try {
            const [customerData, flowersData] = await Promise.all([getCustomer(customerId), getFlowers(customerId)])
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
                    onClick={() => router.push(`/flowers/new?customerId=${customerId}`)}
                    className="cursor-pointer rounded border-0 bg-green-600 px-6 py-3 text-white"
                >
                    新規登録
                </button>
                <button
                    onClick={() => router.push(`/pdf/flower/${customerId}`)}
                    className="cursor-pointer rounded border-0 bg-cyan-600 px-6 py-3 text-white"
                >
                    請求書一括印刷
                </button>
            </div>

            {/* 供花一覧（請求先単位） */}
            {targets.length === 0 ? (
                <p className="text-gray-500">供花が登録されていません</p>
            ) : (
                targets.map((target) => {
                    const total = getTargetTotal(target)
                    return (
                        <div key={target.id} className="mb-8 rounded-lg border border-gray-300 p-6">
                            {/* 請求先ヘッダー */}
                            <div className="mb-4 flex items-center justify-between border-b-2 border-gray-300 pb-4">
                                <div>
                                    <h3 className="mb-1 text-lg font-bold">請求先: {target.billToName}</h3>
                                    <p className="text-sm text-gray-500">
                                        {target.billToAddress}
                                        {target.billToTel && `　TEL: ${target.billToTel}`}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <p className="text-xl font-bold">合計: ¥{total.toLocaleString()}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handlePayment(target.id, false)}
                                            className="cursor-pointer rounded border-0 bg-green-600 px-3 py-2 text-sm text-white"
                                        >
                                            入金完了
                                        </button>
                                        <button
                                            onClick={() => handlePayment(target.id, true)}
                                            className="cursor-pointer rounded border-0 bg-red-600 px-3 py-2 text-sm text-white"
                                        >
                                            入金取消
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 供花明細テーブル */}
                            <table className="w-full border-collapse bg-white">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 p-3 text-left">依頼主</th>
                                        <th className="border border-gray-300 p-3 text-left">名札</th>
                                        <th className="border border-gray-300 p-3 text-left">連名</th>
                                        <th className="border border-gray-300 p-3 text-left">配送先</th>
                                        <th className="border border-gray-300 p-3 text-right">金額</th>
                                        <th className="border border-gray-300 p-3 text-center">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {target.flowers.map((flower) => (
                                        <tr key={flower.id}>
                                            <td className="border border-gray-300 p-3">{flower.requesterName}</td>
                                            <td className="border border-gray-300 p-3">{flower.labelName || '-'}</td>
                                            <td className="border border-gray-300 p-3">{flower.jointNames || '-'}</td>
                                            <td className="border border-gray-300 p-3">{flower.deliveryTo || '-'}</td>
                                            <td className="border border-gray-300 p-3 text-right">
                                                ¥{flower.amount.toLocaleString()}
                                            </td>
                                            <td className="border border-gray-300 p-3 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => router.push(`/flowers/${flower.id}`)}
                                                        className="cursor-pointer rounded border-0 bg-cyan-600 px-3 py-1 text-sm text-white"
                                                    >
                                                        編集
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteFlower(flower.id)}
                                                        className="cursor-pointer rounded border-0 bg-red-600 px-3 py-1 text-sm text-white"
                                                    >
                                                        削除
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                })
            )}
        </div>
    )
}
