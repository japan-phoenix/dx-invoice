'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAuthenticated } from '@/lib/auth'
import { createCustomer } from '@/lib/customers'
import { AddressCity, AddressTown } from '@/lib/address'
import { caseFormSchema, CaseFormData } from '../schemas/CaseFormSchema'
import { useCaseFormData, useCaseFormLoader } from '../hooks/useCaseForm'
import { CaseFormTabs } from '../components/CaseFormTabs'
import { DeceasedTab } from '../components/DeceasedTab'
import { FuneralTab } from '../components/FuneralTab'
import { MembershipTab } from '../components/MembershipTab'

export default function NewCustomerPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'deceased' | 'funeral' | 'membership'>('deceased')
    const [loading, setLoading] = useState(false)
    const [cities, setCities] = useState<AddressCity[]>([])
    const [towns, setTowns] = useState<AddressTown[]>([])

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

    const { loadCities, handleCityChange } = useCaseFormLoader(methods.setValue)

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login')
            return
        }
        loadCities().then(setCities)
    }, [router, loadCities])

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
        setLoading(true)
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
            const result = await createCustomer(submitData)
            router.push(`/cases/${result.id}`)
        } catch (error) {
            console.error('Failed to create customer:', error)
            alert('登録に失敗しました')
        } finally {
            setLoading(false)
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex h-[calc(100vh-2rem)] flex-col">
                <div className="flex flex-1 flex-col overflow-hidden p-8">
                    <h1 className="mb-8">葬儀案件 新規登録</h1>

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
                    <div className="sticky bottom-0 flex justify-end gap-4 border-t border-gray-300 bg-white px-8 py-6">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="cursor-pointer rounded bg-gray-500 px-6 py-3 text-white hover:bg-gray-600"
                        >
                            閉じる
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`rounded px-6 py-3 text-white ${
                                loading
                                    ? 'cursor-not-allowed bg-gray-300'
                                    : 'cursor-pointer bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            {loading ? '登録中...' : '登録'}
                        </button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
