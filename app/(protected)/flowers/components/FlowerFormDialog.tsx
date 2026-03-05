'use client'

import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { createFlower, updateFlower, Flower, FlowerBillingTarget } from '@/lib/flowers'
import { toast } from '@/hooks/use-toast'
import { flowerFormSchema, FlowerFormData, DEFAULT_FORM_VALUES } from '../schemas/FlowerFormSchema'
import { FlowerFormFields } from './FlowerFormFields'

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    customerId: string
    flower?: Flower | null
    billingTargets: FlowerBillingTarget[]
    initialBillingTargetId?: string
    onSuccess: () => void
}

export function FlowerFormDialog({
    open,
    onOpenChange,
    customerId,
    flower,
    billingTargets,
    initialBillingTargetId,
    onSuccess,
}: Props) {
    const isEdit = Boolean(flower)
    // 請求先が確定している場合（追加ボタン経由 or 編集）は請求先関連フィールドを非表示
    const hideTargetFields = Boolean(initialBillingTargetId) || isEdit

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

    // ダイアログが開くたびにフォームをリセット
    useEffect(() => {
        if (open) {
            if (flower) {
                reset({
                    flowerBillingTargetId: flower.flowerBillingTargetId || '',
                    requesterName: flower.requesterName,
                    labelName: flower.labelName || '',
                    jointNames: flower.jointNames || '',
                    billToName: flower.billToName,
                    billToAddress: flower.billToAddress,
                    billToTel: flower.billToTel || '',
                    deliveryTo: flower.deliveryTo || '',
                    amount: flower.amount,
                })
            } else if (initialBillingTargetId) {
                const target = billingTargets.find((t) => t.id === initialBillingTargetId)
                reset({
                    ...DEFAULT_FORM_VALUES,
                    flowerBillingTargetId: initialBillingTargetId,
                    billToName: target?.billToName || '',
                    billToAddress: target?.billToAddress || '',
                    billToTel: target?.billToTel || '',
                })
            } else {
                reset(DEFAULT_FORM_VALUES)
            }
        }
    }, [open, flower, initialBillingTargetId, billingTargets, reset])

    const onSubmit = async (formValues: FlowerFormData) => {
        try {
            if (isEdit && flower) {
                await updateFlower(flower.id, formValues)
                toast({ title: '更新しました', variant: 'success', duration: 2000 })
            } else {
                await createFlower(customerId, formValues)
                toast({ title: '登録しました', variant: 'success', duration: 2000 })
            }
            onOpenChange(false)
            onSuccess()
        } catch (error) {
            console.error('Failed to save flower:', error)
            toast({ title: '保存に失敗しました', variant: 'destructive', duration: 3000 })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? '供花 編集' : '供花 新規登録'}</DialogTitle>
                </DialogHeader>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                        <FlowerFormFields
                            control={control}
                            billingTargets={billingTargets}
                            hideTargetFields={hideTargetFields}
                        />

                        <div className="flex justify-end gap-4 pt-2">
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="cursor-pointer rounded border-0 bg-gray-500 px-6 py-3 text-white"
                            >
                                キャンセル
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`rounded border-0 px-6 py-3 text-white ${
                                    isSubmitting ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-green-600'
                                }`}
                            >
                                {isSubmitting ? '保存中...' : isEdit ? '更新' : '登録'}
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}
