import { useState, useEffect, useCallback } from 'react'
import { UseFormReset } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { getEstimate, createEstimate, updateEstimate, Estimate, EstimateItem } from '@/lib/estimates'
import { getCustomer } from '@/lib/customers'
import { getProducts, ProductItem, ProductVariant } from '@/lib/products'
import { toast } from '@/hooks/use-toast'
import { EstimateFormData, EstimateItemField } from '../schemas/EstimateFormSchema'

const sortByProductItemId = (arr: EstimateItem[]): EstimateItem[] =>
    arr.slice().sort((a, b) => {
        if (a.productItemId == null) return 1
        if (b.productItemId == null) return -1
        return Number(a.productItemId) - Number(b.productItemId)
    })

// -------------------------------------------------------
// 新規作成フック（customerId から）
// -------------------------------------------------------
export function useEstimateCreate(customerId: string, reset: UseFormReset<EstimateFormData>) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState<any>(null)
    const [items, setItems] = useState<EstimateItem[]>([])

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

    const onSubmit = async (formValues: EstimateFormData) => {
        try {
            const mergedItems = items.map((item, i) => {
                const qty = formValues.items[i]?.qty ?? item.qty
                const description = formValues.items[i]?.description ?? item.description ?? ''
                const amount = item.unitPriceGeneral * qty
                return { ...item, qty, description, amount, sortNo: i }
            })
            const totals = calculateTotals(items, formValues.items, customer)
            const data = { ...formValues, ...totals, items: mergedItems }
            const created = await createEstimate(customerId, data)
            toast({ title: '登録しました', variant: 'success', duration: 2000 })
            router.push(`/estimates/${created.id}`)
        } catch (error) {
            console.error('Failed to create:', error)
            toast({ title: '保存に失敗しました', variant: 'destructive', duration: 3000 })
        }
    }

    return { loading, customer, estimate: null as Estimate | null, items, setItems, onSubmit }
}

// -------------------------------------------------------
// 編集フック（estimateId から）
// -------------------------------------------------------
export function useEstimateEdit(estimateId: string, reset: UseFormReset<EstimateFormData>) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState<any>(null)
    const [estimate, setEstimate] = useState<Estimate | null>(null)
    const [items, setItems] = useState<EstimateItem[]>([])

    const loadData = useCallback(async () => {
        try {
            const estimateData = await getEstimate(estimateId)
            setEstimate(estimateData)
            const sortedItems = sortByProductItemId(estimateData.items || [])
            setItems(sortedItems)

            const customerData = await getCustomer(estimateData.customerId)
            setCustomer(customerData)

            reset({
                docNo: estimateData.docNo || '',
                status: estimateData.status || 'DRAFT',
                cremationProcessType: (estimateData as any).cremationProcessType || '',
                altarPlaceType: (estimateData as any).altarPlaceType || '',
                ceilingHeight: (estimateData as any).ceilingHeight || '',
                estimateStaff: (estimateData as any).estimateStaff || '',
                ceremonyStaff: (estimateData as any).ceremonyStaff || '',
                transportStaff: (estimateData as any).transportStaff || '',
                decorationStaff: (estimateData as any).decorationStaff || '',
                returnStaff: (estimateData as any).returnStaff || '',
                items: sortedItems.map((item) => ({
                    qty: item.qty,
                    description: item.description || '',
                })),
            })
        } catch (error) {
            console.error('Failed to load estimate:', error)
            toast({ title: 'データの読み込みに失敗しました', variant: 'destructive', duration: 3000 })
        } finally {
            setLoading(false)
        }
    }, [estimateId, reset])

    useEffect(() => {
        loadData()
    }, [loadData])

    useEffect(() => {
        if (!loading && !estimate) {
            toast({ title: '見積データが取得できませんでした', variant: 'destructive', duration: 3000 })
            router.push('/cases')
        }
    }, [loading, estimate, router])

    const onSubmit = async (formValues: EstimateFormData) => {
        try {
            const mergedItems = items.map((item, i) => {
                const qty = formValues.items[i]?.qty ?? item.qty
                const description = formValues.items[i]?.description ?? item.description ?? ''
                const amount = item.unitPriceGeneral * qty
                return { ...item, qty, description, amount, sortNo: i }
            })
            const totals = calculateTotals(items, formValues.items, customer)
            const data = { ...formValues, ...totals, items: mergedItems }
            await updateEstimate(estimateId, data)
            toast({ title: '更新しました', variant: 'success', duration: 2000 })
            await loadData()
        } catch (error) {
            console.error('Failed to update:', error)
            toast({ title: '保存に失敗しました', variant: 'destructive', duration: 3000 })
        }
    }

    return { loading, customer, estimate, items, setItems, onSubmit }
}

// -------------------------------------------------------
// 品目検索フック
// -------------------------------------------------------
export function useProductSearch(
    items: EstimateItem[],
    setItems: React.Dispatch<React.SetStateAction<EstimateItem[]>>,
    appendItemField: (val: { qty: number; description: string }) => void
) {
    const [products, setProducts] = useState<ProductItem[]>([])
    const [searchProductName, setSearchProductName] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)

    const handleSearchProducts = async () => {
        try {
            const results = await getProducts(searchProductName)
            setProducts(results)
        } catch (error) {
            console.error('Failed to search products:', error)
            toast({ title: '品目の検索に失敗しました', variant: 'destructive', duration: 3000 })
        }
    }

    const handleSelectProduct = (product: ProductItem) => {
        setSelectedProduct(product)
        setSelectedVariant(product.variants.length > 0 ? product.variants[0] : null)
    }

    const handleAddItem = () => {
        if (!selectedProduct || !selectedVariant) {
            toast({ title: '商品と種類を選択してください', variant: 'destructive', duration: 3000 })
            return
        }

        const newItem: EstimateItem = {
            productItemId: selectedProduct.id,
            productVariantId: selectedVariant.id,
            description: '',
            unitPriceGeneral: selectedVariant.priceGeneral,
            unitPriceMember: selectedVariant.priceMember,
            qty: 1,
            amount: selectedVariant.priceGeneral,
            sortNo: items.length,
            productItem: selectedProduct,
            productVariant: selectedVariant,
        }

        setItems((prev) => sortByProductItemId([...prev, newItem]))
        appendItemField({ qty: 1, description: '' })
        setSelectedProduct(null)
        setSelectedVariant(null)
        setSearchProductName('')
        setProducts([])
    }

    return {
        products,
        searchProductName,
        setSearchProductName,
        selectedProduct,
        selectedVariant,
        setSelectedVariant,
        handleSearchProducts,
        handleSelectProduct,
        handleAddItem,
    }
}

// -------------------------------------------------------
// 明細操作フック
// -------------------------------------------------------
export function useEstimateItems(
    items: EstimateItem[],
    setItems: React.Dispatch<React.SetStateAction<EstimateItem[]>>,
    removeItemField: (index: number) => void
) {
    const handleRemoveItem = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index))
        removeItemField(index)
    }

    return { handleRemoveItem }
}

// -------------------------------------------------------
// 合計計算ユーティリティ
// -------------------------------------------------------
export function calculateTotals(items: EstimateItem[], itemFields: EstimateItemField[] | undefined, customer: any) {
    const subtotal = items.reduce((sum, item, i) => {
        const qty = itemFields?.[i]?.qty ?? item.qty
        return sum + item.unitPriceGeneral * qty
    }, 0)
    const tax = Math.round(subtotal * 0.1)
    const total = subtotal + tax
    const membershipPaidAmount =
        customer?.memberships?.reduce((sum: number, m: any) => sum + (m.paymentAmount || 0), 0) || 0
    const grandTotal = Math.max(0, total - membershipPaidAmount)
    return { subtotal, tax, total, membershipPaidAmount, grandTotal }
}
