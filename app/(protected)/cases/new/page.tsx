'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { caseFormSchema, CaseFormData } from '../schemas/CaseFormSchema'
import { useCaseFormData, useCaseFormLoader } from '../hooks/useCaseForm'
import { getFormDefaultValues, transformSubmitData } from '../hooks/useCaseFormConfig'
import { logFormErrors } from '@/lib/formDebugUtils'
import { CaseFormTabs } from '../components/CaseFormTabs'
import { DeceasedTab } from '../components/DeceasedTab'
import { FuneralTab } from '../components/FuneralTab'
import { MembershipTab } from '../components/MembershipTab'
import { useCitiesQuery, useTownsQuery } from '@/hooks/useAddress'
import { useCreateCustomerMutation } from '@/hooks/useCustomer'

export default function NewCustomerPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'deceased' | 'funeral' | 'membership'>('deceased')
    const [selectedCityId, setSelectedCityId] = useState<string | null>(null)

    // React Query フック
    const { data: cities = [] } = useCitiesQuery()
    const { data: towns = [] } = useTownsQuery(selectedCityId)
    const createMutation = useCreateCustomerMutation()

    const methods = useForm<CaseFormData>({
        resolver: zodResolver(caseFormSchema),
        defaultValues: getFormDefaultValues(),
    })

    const { formatDateForISO } = useCaseFormData()
    const { handleCityChange } = useCaseFormLoader(methods.setValue)

    const handleCityChangeWrapper = useCallback(
        async (cityId: string) => {
            setSelectedCityId(cityId || null)
            await handleCityChange(cityId)
        },
        [handleCityChange]
    )

    const onSubmit = async (data: CaseFormData): Promise<void> => {
        try {
            console.log('Form data passed Zod validation:', JSON.stringify(data, null, 2))
            const submitData = transformSubmitData(data, formatDateForISO)
            console.log('Submit data after transform:', JSON.stringify(submitData, null, 2))
            const result = await createMutation.mutateAsync(submitData)
            router.push(`/cases/${result.id}`)
        } catch (error) {
            console.error('Failed to create customer:', error)
            alert('登録に失敗しました')
        }
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
                    <h1 className="mb-8 text-2xl font-bold">葬儀案件 新規登録</h1>

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
                            disabled={createMutation.isPending}
                            className={`rounded px-6 py-3 text-white ${
                                createMutation.isPending
                                    ? 'cursor-not-allowed bg-gray-300'
                                    : 'cursor-pointer bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            {createMutation.isPending ? '登録中...' : '登録'}
                        </button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
