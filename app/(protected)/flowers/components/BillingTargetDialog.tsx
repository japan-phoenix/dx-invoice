'use client'

import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { createBillingTarget, updateBillingTarget, FlowerBillingTarget } from '@/lib/flowers'
import { toast } from '@/hooks/use-toast'
import { billingTargetFormSchema, BillingTargetFormData, BILLING_TARGET_DEFAULT } from '../schemas/FlowerFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormInputWithPostalSearch } from '@/components/form/FormInputWithPostalSearch'

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    customerId: string
    target?: FlowerBillingTarget | null
    onSuccess: () => void
}

export function BillingTargetDialog({ open, onOpenChange, customerId, target, onSuccess }: Props) {
    const isEdit = Boolean(target)

    const methods = useForm<BillingTargetFormData>({
        resolver: zodResolver(billingTargetFormSchema),
        defaultValues: BILLING_TARGET_DEFAULT,
    })
    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods

    useEffect(() => {
        if (open) {
            if (target) {
                reset({
                    billToName: target.billToName,
                    billToAddress: target.billToAddress,
                    billToTel: target.billToTel || '',
                })
            } else {
                reset(BILLING_TARGET_DEFAULT)
            }
        }
    }, [open, target, reset])

    const onSubmit = async (formValues: BillingTargetFormData) => {
        try {
            if (isEdit && target) {
                await updateBillingTarget(target.id, formValues)
                toast({ title: '請求先を更新しました', variant: 'success', duration: 2000 })
            } else {
                await createBillingTarget(customerId, formValues)
                toast({ title: '請求先を登録しました', variant: 'success', duration: 2000 })
            }
            onOpenChange(false)
            onSuccess()
        } catch (error) {
            console.error('Failed to save billing target:', error)
            toast({ title: '保存に失敗しました', variant: 'destructive', duration: 3000 })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-xl">
                <DialogHeader>
                    <DialogTitle>{isEdit ? '請求先 編集' : '請求先 新規登録'}</DialogTitle>
                </DialogHeader>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 pt-2">
                        <FormInput
                            name="billToName"
                            control={control}
                            label="請求先名"
                            placeholder="例: 山田 太郎"
                            required
                        />
                        <FormInputWithPostalSearch
                            name="billToAddress"
                            control={control}
                            label="請求先住所"
                            placeholder="例: 沖縄県那覇市○○1-1-1（郵便番号から検索）"
                            required
                        />
                        <FormInput
                            name="billToTel"
                            control={control}
                            label="請求先TEL"
                            placeholder="例: 090-1234-5678"
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
