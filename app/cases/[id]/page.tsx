'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAuthenticated } from '@/lib/auth'
import { updateCustomer } from '@/lib/customers'
import { AddressCity, AddressTown } from '@/lib/address'
import { caseFormSchema, CaseFormData } from '../schemas/CaseFormSchema'
import { useCaseFormData, useCaseFormLoader } from '../hooks/useCaseForm'
import { CaseFormTabs } from '../components/CaseFormTabs'
import { DeceasedTab } from '../components/DeceasedTab'
import { FuneralTab } from '../components/FuneralTab'
import { MembershipTab } from '../components/MembershipTab'

export default function EditCustomerPage() {
    const router = useRouter()
    const params = useParams()
    const customerId = params.id as string

    const [activeTab, setActiveTab] = useState<'deceased' | 'funeral' | 'membership'>('deceased')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [cities, setCities] = useState<AddressCity[]>([])
    const [towns, setTowns] = useState<AddressTown[]>([])
    const [hasEstimate, setHasEstimate] = useState(false)
    const [hasInvoice, setHasInvoice] = useState(false)

    const { formatDateForISO } = useCaseFormData()

    const methods = useForm<CaseFormData>({
        resolver: zodResolver(caseFormSchema),
        defaultValues: {
            deceasedLastName: null,
            deceasedFirstName: null,
            gender: null,
            age: null,
            religion: null,
            chiefMournerName: null,
            chiefMournerRelation: null,
            chiefMournerCityId: null,
            chiefMournerTownId: null,
            chiefMournerAddress: null,
            chiefMournerTel: null,
            sameAsChiefMourner: false,
            payerName: null,
            payerRelation: null,
            payerAddress: null,
            payerTel: null,
            pickupPlace: null,
            wakeAt: null,
            wakePlace: null,
            departureAt: null,
            departurePlace: null,
            funeralFrom: null,
            funeralTo: null,
            funeralPlace: null,
            returnAt: null,
            returnPlace: null,
            notes: null,
            memberCardNote: null,
            memberships: [
                {
                    rowNo: 1,
                    memberNo: '',
                    joinedAt: '',
                    memberName: '',
                    courseUnits: null,
                    maturityAmount: null,
                    paymentTimes: null,
                    paymentAmount: null,
                    salesStaffName: '',
                    relationToDeceased: '',
                },
                {
                    rowNo: 2,
                    memberNo: '',
                    joinedAt: '',
                    memberName: '',
                    courseUnits: null,
                    maturityAmount: null,
                    paymentTimes: null,
                    paymentAmount: null,
                    salesStaffName: '',
                    relationToDeceased: '',
                },
                {
                    rowNo: 3,
                    memberNo: '',
                    joinedAt: '',
                    memberName: '',
                    courseUnits: null,
                    maturityAmount: null,
                    paymentTimes: null,
                    paymentAmount: null,
                    salesStaffName: '',
                    relationToDeceased: '',
                },
            ],
        },
    })

    const { loadCitiesAndCustomer, handleCityChange } = useCaseFormLoader(methods.setValue)

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login')
            return
        }
        loadData()
    }, [router, customerId])

    const loadData = async () => {
        try {
            const { customer, cities: citiesData } = await loadCitiesAndCustomer(customerId)
            setCities(citiesData)
            setHasEstimate(customer?.estimates && customer.estimates.length > 0)
            setHasInvoice(customer?.invoices && customer.invoices.length > 0)
        } catch (error) {
            console.error('Failed to load data:', error)
            alert('データの読み込みに失敗しました')
        } finally {
            setLoading(false)
        }
    }

    const handleCityChangeWrapper = useCallback(
        async (cityId: string) => {
            if (cityId) {
                const townsData = await handleCityChange(cityId)
                setTowns(townsData || [])
            } else {
                setTowns([])
            }
        },
        [handleCityChange]
    )

    const onSubmit = async (data: CaseFormData): Promise<void> => {
        setSaving(true)
        try {
            const submitData = {
                ...data,
                receptionAt: formatDateForISO(data.receptionAt),
                age: data.age ? parseInt(data.age.toString()) : null,
                wakeAt: formatDateForISO(data.wakeAt),
                departureAt: formatDateForISO(data.departureAt),
                funeralFrom: formatDateForISO(data.funeralFrom),
                funeralTo: formatDateForISO(data.funeralTo),
                returnAt: formatDateForISO(data.returnAt),
                memberships: data.memberships.map((m) => ({
                    ...m,
                    rowNo: m.rowNo,
                    joinedAt: m.joinedAt || null,
                    courseUnits: m.courseUnits ? parseInt(m.courseUnits.toString()) : null,
                    maturityAmount: m.maturityAmount ? parseInt(m.maturityAmount.toString()) : null,
                    paymentTimes: m.paymentTimes ? parseInt(m.paymentTimes.toString()) : null,
                    paymentAmount: m.paymentAmount ? parseInt(m.paymentAmount.toString()) : null,
                })),
            }
            await updateCustomer(customerId, submitData)
            alert('更新しました')
            router.push('/cases')
        } catch (error) {
            console.error('Failed to update customer:', error)
            alert('更新に失敗しました')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div style={{ padding: '2rem' }}>読み込み中...</div>
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
                            disabled={saving}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: saving ? '#ccc' : '#0070f3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: saving ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {saving ? '更新中...' : '更新'}
                        </button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
