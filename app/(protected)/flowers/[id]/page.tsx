'use client'

import { useRouter, useParams } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { flowerFormSchema, FlowerFormData, DEFAULT_FORM_VALUES } from '../schemas/FlowerFormSchema'
import { useFlowerEdit } from '../hooks/useFlowerForm'
import { FlowerCustomerInfo } from '../components/FlowerCustomerInfo'
import { FlowerFormFields } from '../components/FlowerFormFields'

export default function FlowerEditPage() {
    const router = useRouter()
    const params = useParams()
    const flowerId = params.id as string

    const methods = useForm<FlowerFormData>({
        resolver: zodResolver(flowerFormSchema),
        defaultValues: DEFAULT_FORM_VALUES,
    })
    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods

    const { loading, customer, flower, onSubmit } = useFlowerEdit(flowerId, reset)

    if (loading) {
        return <div className="p-8">読み込み中...</div>
    }

    if (!customer || !flower) {
        return null
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-8">
                <h1 className="mb-8 text-2xl font-bold">供花 編集</h1>

                {/* 顧客情報サマリー */}
                <FlowerCustomerInfo customer={customer} />

                {/* 供花フォーム */}
                <FlowerFormFields control={control} />

                {/* 操作ボタン */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="cursor-pointer rounded border-0 bg-gray-500 px-6 py-3 text-white"
                    >
                        閉じる
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push(`/pdf/flower/${flower.customerId}`)}
                        className="cursor-pointer rounded border-0 bg-cyan-600 px-6 py-3 text-white"
                    >
                        請求書プレビュー
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`rounded border-0 px-6 py-3 text-white ${
                            isSubmitting ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-green-600'
                        }`}
                    >
                        {isSubmitting ? '保存中...' : '更新'}
                    </button>
                </div>
            </form>
        </FormProvider>
    )
}
