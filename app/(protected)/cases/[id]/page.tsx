'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { caseFormSchema, CaseFormData } from '../schemas/CaseFormSchema'
import { useCaseFormData, useCaseFormLoader } from '../hooks/useCaseForm'
import { getFormDefaultValues, transformSubmitData } from '../hooks/useCaseFormConfig'
import { CaseFormTabs } from '../components/CaseFormTabs'
import { DeceasedTab } from '../components/DeceasedTab'
import { FuneralTab } from '../components/FuneralTab'
import { MembershipTab } from '../components/MembershipTab'
import { useGetCustomerQuery, useUpdateCustomerMutation } from '@/hooks/useCustomer'
import { useCitiesQuery, useTownsQuery } from '@/hooks/useAddress'

export default function EditCustomerPage() {
    const router = useRouter()
    const params = useParams()
    const customerId = params.id as string

    const [activeTab, setActiveTab] = useState<'deceased' | 'funeral' | 'membership'>('deceased')

    // React Query フック
    const { data: customer, isLoading, error } = useGetCustomerQuery(customerId)
    const { data: cities = [] } = useCitiesQuery()
    const { data: towns = [] } = useTownsQuery(customer?.chiefMournerCityId || null)
    const updateMutation = useUpdateCustomerMutation()

    const methods = useForm<CaseFormData>({
        resolver: zodResolver(caseFormSchema),
        defaultValues: getFormDefaultValues(),
    })

    const { formatDateForISO } = useCaseFormData()
    const { handleCityChange } = useCaseFormLoader(methods.setValue)

    // 顧客データが取得されたら form の値を更新
    useEffect(() => {
        if (customer && !isLoading) {
            const formData = customer as CaseFormData
            methods.reset(formData)
        }
    }, [customer, isLoading, methods])

    const handleCityChangeWrapper = useCallback(
        async (cityId: string) => {
            await handleCityChange(cityId)
        },
        [handleCityChange]
    )

    const hasEstimate = customer?.estimates && customer.estimates.length > 0
    const hasInvoice = customer?.invoices && customer.invoices.length > 0

    const onSubmit = async (data: CaseFormData): Promise<void> => {
        try {
            const submitData = transformSubmitData(data, formatDateForISO)
            await updateMutation.mutateAsync({
                customerId,
                data: submitData,
            })
            alert('更新しました')
            router.push('/cases')
        } catch (error) {
            console.error('Failed to update customer:', error)
            alert('更新に失敗しました')
        }
    }

    if (isLoading) {
        return <div style={{ padding: '2rem' }}>読み込み中...</div>
    }

    if (error) {
        return <div style={{ padding: '2rem' }}>エラー: データの読み込みに失敗しました</div>
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex h-[calc(100vh-2rem)] flex-col">
                <div className="flex flex-1 flex-col overflow-hidden p-8">
                    <h1 className="mb-8">葬儀案件 編集</h1>

                    {/* タブ */}
                    <CaseFormTabs activeTab={activeTab} onTabChange={setActiveTab} />
                    <div className="mt-4 flex-1 overflow-y-auto pb-4 pr-2">
                        {/* 故人情報タブ */}
                        {activeTab === 'deceased' && (
                            <DeceasedTab cities={cities} towns={towns} onCityChange={handleCityChangeWrapper} />
                        )}

                        {/* 葬儀情報タブ */}
                        {activeTab === 'funeral' && <FuneralTab />}

                        {/* 会員情報タブ */}
                        {activeTab === 'membership' && <MembershipTab />}
                    </div>

                    {/* 関連機能へのリンク */}
                    <div
                        style={{
                            backgroundColor: '#f5f5f5',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            marginTop: '2rem',
                            marginBottom: '2rem',
                        }}
                    >
                        <h3 style={{ marginBottom: '1rem' }}>関連機能</h3>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {hasEstimate && (
                                <button
                                    type="button"
                                    onClick={() => router.push(`/estimates/${customerId}`)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#0070f3',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    見積書
                                </button>
                            )}
                            {!hasEstimate && (
                                <button
                                    type="button"
                                    onClick={() => router.push(`/estimates/new?customerId=${customerId}`)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    見積書を作成
                                </button>
                            )}
                            {hasInvoice && (
                                <button
                                    type="button"
                                    onClick={() => router.push(`/invoices/${customerId}`)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#0070f3',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    請求書
                                </button>
                            )}
                            {!hasInvoice && (
                                <button
                                    type="button"
                                    onClick={() => router.push(`/invoices/new?customerId=${customerId}`)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    請求書を作成
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 操作ボタン */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => router.back()}
                            type="button"
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            閉じる
                        </button>
                        <button
                            type="submit"
                            disabled={updateMutation.isPending}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: updateMutation.isPending ? '#ccc' : '#0070f3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: updateMutation.isPending ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {updateMutation.isPending ? '更新中...' : '更新'}
                        </button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
