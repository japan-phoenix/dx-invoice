import { useState, useEffect, useCallback } from 'react'
import { UseFormReset } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { getFlower, createFlower, updateFlower, Flower } from '@/lib/flowers'
import { getCustomer } from '@/lib/customers'
import { toast } from '@/hooks/use-toast'
import { FlowerFormData } from '../schemas/FlowerFormSchema'

// -------------------------------------------------------
// 新規作成フック（customerId から）
// -------------------------------------------------------
export function useFlowerCreate(customerId: string, _reset: UseFormReset<FlowerFormData>) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState<any>(null)

    const loadData = useCallback(async () => {
        try {
            const customerData = await getCustomer(customerId)
            setCustomer(customerData)
        } catch (error) {
            console.error('Failed to load customer:', error)
            toast({ title: 'データの読み込みに失敗しました', variant: 'destructive', duration: 3000 })
        } finally {
            setLoading(false)
        }
    }, [customerId])

    useEffect(() => {
        loadData()
    }, [loadData])

    useEffect(() => {
        if (!loading && !customer) {
            toast({ title: '顧客情報が取得できませんでした', variant: 'destructive', duration: 3000 })
            router.push('/cases')
        }
    }, [loading, customer, router])

    const onSubmit = async (formValues: FlowerFormData) => {
        try {
            await createFlower(customerId, formValues)
            toast({ title: '登録しました', variant: 'success', duration: 2000 })
            router.push(`/flowers/customer/${customerId}`)
        } catch (error) {
            console.error('Failed to create:', error)
            toast({ title: '保存に失敗しました', variant: 'destructive', duration: 3000 })
        }
    }

    return { loading, customer, onSubmit }
}

// -------------------------------------------------------
// 編集フック（flowerId から）
// -------------------------------------------------------
export function useFlowerEdit(flowerId: string, reset: UseFormReset<FlowerFormData>) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState<any>(null)
    const [flower, setFlower] = useState<Flower | null>(null)

    const loadData = useCallback(async () => {
        try {
            const flowerData = await getFlower(flowerId)
            setFlower(flowerData)

            const customerData = await getCustomer(flowerData.customerId)
            setCustomer(customerData)

            reset({
                requesterName: flowerData.requesterName,
                labelName: flowerData.labelName || '',
                jointNames: flowerData.jointNames || '',
                billToName: flowerData.billToName,
                billToAddress: flowerData.billToAddress,
                billToTel: flowerData.billToTel || '',
                deliveryTo: flowerData.deliveryTo || '',
                amount: flowerData.amount,
            })
        } catch (error) {
            console.error('Failed to load flower:', error)
            toast({ title: 'データの読み込みに失敗しました', variant: 'destructive', duration: 3000 })
        } finally {
            setLoading(false)
        }
    }, [flowerId, reset])

    useEffect(() => {
        loadData()
    }, [loadData])

    useEffect(() => {
        if (!loading && !flower) {
            toast({ title: '供花データが取得できませんでした', variant: 'destructive', duration: 3000 })
            router.push('/cases')
        }
    }, [loading, flower, router])

    const onSubmit = async (formValues: FlowerFormData) => {
        try {
            await updateFlower(flowerId, formValues)
            toast({ title: '更新しました', variant: 'success', duration: 2000 })
            await loadData()
        } catch (error) {
            console.error('Failed to update:', error)
            toast({ title: '保存に失敗しました', variant: 'destructive', duration: 3000 })
        }
    }

    return { loading, customer, flower, onSubmit }
}
