import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createInvoicePayment, cancelInvoicePayment, CreatePaymentData } from '@/lib/payments'

/**
 * 入金を登録するミューテーション
 */
export function useCreatePaymentMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ invoiceId, data }: { invoiceId: string; data: CreatePaymentData }) =>
            createInvoicePayment(invoiceId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
        },
    })
}

/**
 * 入金を取消するミューテーション
 */
export function useCancelPaymentMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ invoiceId, data }: { invoiceId: string; data: CreatePaymentData }) =>
            cancelInvoicePayment(invoiceId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
        },
    })
}
