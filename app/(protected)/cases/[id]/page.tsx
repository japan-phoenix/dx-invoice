'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { caseFormSchema, CaseFormData } from '../schemas/CaseFormSchema'
import { useCaseFormData, useCaseFormLoader } from '../hooks/useCaseForm'
import { getFormDefaultValues, transformSubmitData } from '../hooks/useCaseFormConfig'
import { apiToForm } from '@/lib/dataTransformUtils'
import { logFormErrors } from '@/lib/formDebugUtils'
import { CaseFormTabs } from '../components/CaseFormTabs'
import { DeceasedTab } from '../components/DeceasedTab'
import { FuneralTab } from '../components/FuneralTab'
import { MembershipTab } from '../components/MembershipTab'
import { useGetCustomerQuery, useUpdateCustomerMutation } from '@/hooks/useCustomer'
import { useCitiesQuery, useTownsQuery } from '@/hooks/useAddress'
import { toast } from '@/hooks/use-toast'

export default function EditCustomerPage() {
    const router = useRouter()
    const params = useParams()
    const customerId = params.id as string

    const [activeTab, setActiveTab] = useState<'deceased' | 'funeral' | 'membership'>('deceased')

    const methods = useForm<CaseFormData>({
        resolver: zodResolver(caseFormSchema),
        defaultValues: getFormDefaultValues(),
    })

    // フォーム内での市区町村選択を監視
    const formCityId = methods.watch('chiefMournerCityId')

    // React Query フック
    const { data: customer, isLoading, error } = useGetCustomerQuery(customerId)
    const { data: cities = [] } = useCitiesQuery()
    const { data: towns = [] } = useTownsQuery(formCityId || null)
    const updateMutation = useUpdateCustomerMutation()

    const { formatDateForISO, formatDateForInput } = useCaseFormData()
    const { handleCityChange } = useCaseFormLoader(methods.setValue)

    // 顧客データが取得されたら form の値を更新
    useEffect(() => {
        if (customer && !isLoading) {
            // APIから取得したデータのnull → undefinedに変換してからformに設定
            const formData = apiToForm(customer as CaseFormData)
            const defaultValues = getFormDefaultValues()

            // 喪主情報と支払者情報が一致しているか確認
            const isSameAsMourner =
                formData.chiefMournerName === formData.payerName &&
                formData.chiefMournerRelation === formData.payerRelation &&
                formData.chiefMournerAddress === formData.payerAddress &&
                formData.chiefMournerTel === formData.payerTel &&
                formData.chiefMournerName !== undefined &&
                formData.chiefMournerName !== '' &&
                formData.payerName !== undefined &&
                formData.payerName !== ''

            const mergedData: CaseFormData = {
                ...defaultValues,
                ...formData,
                receptionAt: formatDateForInput(formData.receptionAt),
                wakeAt: formatDateForInput(formData.wakeAt),
                departureAt: formatDateForInput(formData.departureAt),
                funeralFrom: formatDateForInput(formData.funeralFrom),
                funeralTo: formatDateForInput(formData.funeralTo),
                returnAt: formatDateForInput(formData.returnAt),
                sameAsChiefMourner: isSameAsMourner,
                memberships:
                    formData.memberships && formData.memberships.length > 0
                        ? formData.memberships
                        : defaultValues.memberships,
            }
            methods.reset(mergedData)
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

    const handleNavigateToEstimate = () => {
        if (!customer) {
            toast({ title: '顧客情報が取得できていません', variant: 'destructive', duration: 3000 })
            router.push('/cases')
            return
        }
        if (hasEstimate && customer.estimates[0]) {
            router.push(`/estimates/${customer.estimates[0].id}`)
        } else {
            router.push(`/estimates/new?customerId=${customerId}`)
        }
    }

    const handleNavigateToInvoice = () => {
        if (!customer) {
            toast({ title: '顧客情報が取得できていません', variant: 'destructive', duration: 3000 })
            router.push('/cases')
            return
        }
        if (hasInvoice && customer.invoices[0]) {
            router.push(`/invoices/${customer.invoices[0].id}`)
        } else {
            router.push(`/invoices/new?customerId=${customerId}`)
        }
    }

    const handleNavigateToFlowers = () => {
        if (!customer) {
            toast({ title: '顧客情報が取得できていません', variant: 'destructive', duration: 3000 })
            router.push('/cases')
            return
        }
        router.push(`/flowers/customer/${customerId}`)
    }

    const onSubmit: SubmitHandler<CaseFormData> = async (data) => {
        try {
            console.log('Form data passed Zod validation:', JSON.stringify(data, null, 2))
            const submitData = transformSubmitData(data, formatDateForISO)
            console.log('Submit data after transform:', JSON.stringify(submitData, null, 2))
            await updateMutation.mutateAsync({
                customerId,
                data: submitData,
            })
            toast({
                title: '更新しました',
                variant: 'success',
                duration: 2000,
            })
            router.push('/cases')
        } catch (error) {
            console.error('Failed to update customer:', error)
            toast({
                title: '更新に失敗しました',
                variant: 'destructive',
                duration: 2000,
            })
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
            <form
                onSubmit={methods.handleSubmit(onSubmit, (errors) => {
                    console.error('Zod バリデーションエラー:', errors)
                    logFormErrors(errors)
                })}
                onKeyDown={(e) => {
                    // textareaを除く要素でEnterキーを押してもフォームがsubmitされない
                    if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) {
                        e.preventDefault()
                    }
                }}
                className="flex h-[calc(100vh-2rem)] flex-col"
            >
                <div className="flex flex-1 flex-col overflow-hidden p-8">
                    <div className="flex items-start justify-between">
                        <h1 className="mb-8 text-2xl font-bold">葬儀案件 編集</h1>
                        {/* 関連機能へのリンク */}
                        <div>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <button
                                    type="button"
                                    onClick={handleNavigateToEstimate}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: hasEstimate ? '#0070f3' : '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {hasEstimate ? '見積書編集' : '見積書作成'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNavigateToInvoice}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: hasInvoice ? '#0070f3' : '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {hasInvoice ? '請求書編集' : '請求書作成'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNavigateToFlowers}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#17a2b8',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    供花登録
                                </button>
                            </div>
                        </div>
                    </div>
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
