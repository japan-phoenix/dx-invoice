import { useState, useEffect, useCallback } from 'react'
import { UseFormReset } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { getEstimate, createEstimate, updateEstimate, Estimate, EstimateItem, EstimateFreeItem } from '@/lib/estimates'
import { getCustomer } from '@/lib/customers'
import { getProducts, ProductItem, ProductVariant } from '@/lib/products'
import { toast } from '@/hooks/use-toast'
import { EstimateFormData, EstimateItemField, EstimateFreeItemField } from '../schemas/EstimateFormSchema'
import { DEFAULT_DESCRIPTION_MAP } from '../constants/estimateOptions'

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
    const [freeItems, setFreeItems] = useState<EstimateFreeItem[]>([])

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
            const isMember = formValues.isMember === 'true'
            const mergedItems = items.map((item, i) => {
                const qty = formValues.items[i]?.qty ?? item.qty
                const description = formValues.items[i]?.description ?? item.description ?? ''
                const unitPrice = isMember ? item.unitPriceMember : item.unitPriceGeneral
                const amount = unitPrice * qty
                return { ...item, qty, description, amount, sortNo: i }
            })
            const mergedFreeItems = freeItems.map((item, i) => {
                const qty = formValues.freeItems[i]?.qty ?? item.qty
                const description = formValues.freeItems[i]?.description ?? item.description ?? ''
                const amount = item.unitPriceGeneral * qty
                return { ...item, qty, description, amount, sortNo: i }
            })
            const totals = calculateTotals(items, formValues.items, isMember, customer, freeItems, formValues.freeItems)
            const data = { ...formValues, ...totals, items: mergedItems, freeItems: mergedFreeItems }
            const created = await createEstimate(customerId, data)
            toast({ title: '登録しました', variant: 'success', duration: 2000 })
            router.push(`/estimates/${created.id}`)
        } catch (error) {
            console.error('Failed to create:', error)
            toast({ title: '保存に失敗しました', variant: 'destructive', duration: 3000 })
        }
    }

    return { loading, customer, estimate: null as Estimate | null, items, setItems, freeItems, setFreeItems, onSubmit }
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
    const [freeItems, setFreeItems] = useState<EstimateFreeItem[]>([])

    const loadData = useCallback(async () => {
        try {
            const estimateData = await getEstimate(estimateId)
            setEstimate(estimateData)
            const sortedItems = sortByProductItemId(estimateData.items || [])
            setItems(sortedItems)

            const loadedFreeItems: EstimateFreeItem[] = (estimateData as any).freeItems || []
            setFreeItems(loadedFreeItems)

            const customerData = await getCustomer(estimateData.customerId)
            setCustomer(customerData)

            reset({
                docNo: estimateData.docNo || '',
                status: estimateData.status || 'DRAFT',
                isMember: String((estimateData as any).isMember ?? false),
                cremationProcessType: (estimateData as any).cremationProcessType || '',
                altarPlaceType: (estimateData as any).altarPlaceType || '',
                altarPlaceOther: (estimateData as any).altarPlaceOther || '',
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
                freeItems: loadedFreeItems.map((item) => ({
                    description: item.description || '',
                    qty: item.qty,
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
            const isMember = formValues.isMember === 'true'
            const mergedItems = items.map((item, i) => {
                const qty = formValues.items[i]?.qty ?? item.qty
                const description = formValues.items[i]?.description ?? item.description ?? ''
                const unitPrice = isMember ? item.unitPriceMember : item.unitPriceGeneral
                const amount = unitPrice * qty
                return { ...item, qty, description, amount, sortNo: i }
            })
            const mergedFreeItems = freeItems.map((item, i) => {
                const qty = formValues.freeItems[i]?.qty ?? item.qty
                const description = formValues.freeItems[i]?.description ?? item.description ?? ''
                const amount = item.unitPriceGeneral * qty
                return { ...item, qty, description, amount, sortNo: i }
            })
            const totals = calculateTotals(items, formValues.items, isMember, customer, freeItems, formValues.freeItems)
            const data = { ...formValues, ...totals, items: mergedItems, freeItems: mergedFreeItems }
            await updateEstimate(estimateId, data)
            toast({ title: '更新しました', variant: 'success', duration: 2000 })
            await loadData()
        } catch (error) {
            console.error('Failed to update:', error)
            toast({ title: '保存に失敗しました', variant: 'destructive', duration: 3000 })
        }
    }

    return { loading, customer, estimate, items, setItems, freeItems, setFreeItems, onSubmit }
}

// -------------------------------------------------------
// 品目検索フック
// -------------------------------------------------------
export function useProductSearch(
    items: EstimateItem[],
    setItems: React.Dispatch<React.SetStateAction<EstimateItem[]>>,
    appendItemField: (val: { qty: number; description: string }) => void,
    moveItemField: (from: number, to: number) => void
) {
    const [products, setProducts] = useState<ProductItem[]>([])
    const [searchProductName, setSearchProductName] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)

    const handleSearchProducts = async (query?: string) => {
        try {
            const results = await getProducts(query !== undefined ? query : searchProductName)
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

        const defaultDescription = DEFAULT_DESCRIPTION_MAP[selectedProduct.name] ?? ''

        const newItem: EstimateItem = {
            productItemId: selectedProduct.id,
            productVariantId: selectedVariant.id,
            description: defaultDescription,
            unitPriceGeneral: selectedVariant.priceGeneral,
            unitPriceMember: selectedVariant.priceMember,
            qty: 1,
            amount: selectedVariant.priceGeneral,
            sortNo: items.length,
            productItem: selectedProduct,
            productVariant: selectedVariant,
        }

        const sortedItems = sortByProductItemId([...items, newItem])
        const oldIndex = items.length
        const newIndex = sortedItems.findIndex(
            (item) => item.productItemId === newItem.productItemId && item.productVariantId === newItem.productVariantId
        )
        setItems(sortedItems)
        appendItemField({ qty: 1, description: defaultDescription })
        if (newIndex !== oldIndex) {
            moveItemField(oldIndex, newIndex)
        }
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
        clearSelectedProduct: () => {
            setSelectedProduct(null)
            setSelectedVariant(null)
        },
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
// フリー項目操作フック
// -------------------------------------------------------
export function useEstimateFreeItems(
    freeItems: EstimateFreeItem[],
    setFreeItems: React.Dispatch<React.SetStateAction<EstimateFreeItem[]>>,
    appendFreeItemField: (val: EstimateFreeItemField) => void,
    removeFreeItemField: (index: number) => void
) {
    const handleAddFreeItem = (item: Omit<EstimateFreeItem, 'id' | 'estimateItemId' | 'sortNo'>) => {
        const newItem: EstimateFreeItem = { ...item, sortNo: freeItems.length }
        setFreeItems((prev) => [...prev, newItem])
        appendFreeItemField({
            description: item.description || '',
            qty: item.qty,
        })
    }

    const handleRemoveFreeItem = (index: number) => {
        setFreeItems((prev) => prev.filter((_, i) => i !== index))
        removeFreeItemField(index)
    }

    return { handleAddFreeItem, handleRemoveFreeItem }
}

// -------------------------------------------------------
// 合計計算ユーティリティ
// -------------------------------------------------------
export function calculateTotals(
    items: EstimateItem[],
    itemFields: EstimateItemField[] | undefined,
    isMember: boolean,
    customer: any,
    freeItems?: EstimateFreeItem[],
    freeItemFields?: EstimateFreeItemField[]
) {
    const regularSubtotal = items.reduce((sum, item, i) => {
        const qty = itemFields?.[i]?.qty ?? item.qty
        const unitPrice = isMember ? item.unitPriceMember : item.unitPriceGeneral
        return sum + unitPrice * qty
    }, 0)
    const freeSubtotal = (freeItems || []).reduce((sum, item, i) => {
        const qty = freeItemFields?.[i]?.qty ?? item.qty
        return sum + item.unitPriceGeneral * qty
    }, 0)
    const subtotal = regularSubtotal + freeSubtotal
    const tax = Math.round(subtotal * 0.1)
    const total = subtotal + tax
    const membershipPaidAmount =
        customer?.memberships?.reduce((sum: number, m: any) => sum + (m.paymentAmount || 0), 0) || 0
    const grandTotal = Math.max(0, total - membershipPaidAmount)
    return { subtotal, tax, total, membershipPaidAmount, grandTotal }
}
