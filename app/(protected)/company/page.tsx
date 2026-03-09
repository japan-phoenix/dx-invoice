'use client'

import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { companyFormSchema, CompanyFormData, DEFAULT_FORM_VALUES } from './schemas/CompanyFormSchema'
import { useCompanyProfileQuery, useUpdateCompanyProfileMutation } from './hooks/useCompanyForm'
import { BasicInfoSection, BankInfoSection } from './components/CompanyFormSections'

export default function CompanyPage() {
    const { data: profile, isLoading } = useCompanyProfileQuery()
    const updateMutation = useUpdateCompanyProfileMutation()

    const methods = useForm<CompanyFormData>({
        resolver: zodResolver(companyFormSchema),
        defaultValues: DEFAULT_FORM_VALUES,
    })

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods

    useEffect(() => {
        if (profile) {
            reset({
                companyNo: profile.companyNo ?? '',
                companyName: profile.companyName ?? '',
                companyAddress: profile.companyAddress ?? '',
                companyTel: profile.companyTel ?? '',
                companyFax: profile.companyFax ?? '',
                repTitle: profile.repTitle ?? '',
                repName: profile.repName ?? '',
                bank1Name: profile.bank1Name ?? '',
                bank1Branch: profile.bank1Branch ?? '',
                bank1Type: profile.bank1Type ?? '',
                bank1Account: profile.bank1Account ?? '',
                bank1Holder: profile.bank1Holder ?? '',
                bank2Name: profile.bank2Name ?? '',
                bank2Branch: profile.bank2Branch ?? '',
                bank2Type: profile.bank2Type ?? '',
                bank2Account: profile.bank2Account ?? '',
                bank2Holder: profile.bank2Holder ?? '',
                bank3Name: profile.bank3Name ?? '',
                bank3Branch: profile.bank3Branch ?? '',
                bank3Type: profile.bank3Type ?? '',
                bank3Account: profile.bank3Account ?? '',
                bank3Holder: profile.bank3Holder ?? '',
                bank4Name: profile.bank4Name ?? '',
                bank4Branch: profile.bank4Branch ?? '',
                bank4Type: profile.bank4Type ?? '',
                bank4Account: profile.bank4Account ?? '',
                bank4Holder: profile.bank4Holder ?? '',
            })
        }
    }, [profile, reset])

    const onSubmit = async (data: CompanyFormData) => {
        try {
            await updateMutation.mutateAsync(data)
            toast({ title: '更新しました' })
        } catch (error: any) {
            toast({
                title: '更新に失敗しました',
                description: error?.response?.data?.message,
                variant: 'destructive',
            })
        }
    }

    if (isLoading) {
        return <div className="p-8">読み込み中...</div>
    }

    return (
        <div className="mx-auto max-w-4xl p-8">
            <h1 className="mb-8 text-2xl font-bold">自社情報管理</h1>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <BasicInfoSection />
                    <BankInfoSection />
                    <div className="flex justify-end gap-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting ? '保存中...' : '保存'}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
