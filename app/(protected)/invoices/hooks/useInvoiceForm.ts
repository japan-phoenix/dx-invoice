import { useState, useEffect, useCallback } from 'react'
import { UseFormReset } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { getInvoice, createInvoice, updateInvoice, createInvoiceFromEstimate } from '@/lib/invoices'
import { getCustomer } from '@/lib/customers'
import { getEstimates } from '@/lib/estimates'
import { getProducts, ProductItem, ProductVariant } from '@/lib/products'
import { InvoiceItem } from '@/lib/invoices'
import { toast } from '@/hooks/use-toast'
import { InvoiceFormData, InvoiceItemField } from '../schemas/InvoiceFormSchema'
import { DEFAULT_DESCRIPTION_MAP } from '@/app/(protected)/estimates/constants/estimateOptions'

const sortByProductItemId = (arr: InvoiceItem[]): InvoiceItem[] =>
    arr.slice().sort((a, b) => {
        if (a.productItemId == null) return 1
        if (b.productItemId == null) return -1
        return Number(a.productItemId) - Number(b.productItemId)
    })

// -------------------------------------------------------
// 新規作成フック（customerId から）
// -------------------------------------------------------
export function useInvoiceCreate(customerId: string, reset: UseFormReset<InvoiceFormData>) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState<any>(null)
    const [estimates, setEstimates] = useState<any[]>([])
    const [items, setItems] = useState<InvoiceItem[]>([])
    const [copyingFrom, setCopyingFrom] = useState(false)

    const loadData = useCallback(async () => {
        try {
            const [customerData, estimatesData] = await Promise.all([getCustomer(customerId), getEstimates(customerId)])
            setCustomer(customerData)
            setEstimates(estimatesData)
        } catch (error) {
            console.error('Failed to load data:', error)
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

    const handleCopyFromEstimate = async (estimateId: string, appendItemField: (v: InvoiceItemField) => void) => {
        setCopyingFrom(true)
        try {
            const newInvoice = await createInvoiceFromEstimate(customerId, estimateId)
            toast({ title: '見積からコピーしました', variant: 'success', duration: 2000 })
            router.push(`/invoices/${newInvoice.id}`)
        } catch (error) {
            console.error('Failed to copy from estimate:', error)
            toast({ title: '見積からのコピーに失敗しました', variant: 'destructive', duration: 3000 })
        } finally {
            setCopyingFrom(false)
        }
    }

    const onSubmit = async (formValues: InvoiceFormData) => {
        try {
            const isMember = formValues.isMember === 'true'
            const mergedItems = items.map((item, i) => {
                const qty = formValues.items[i]?.qty ?? item.qty
                const description = formValues.items[i]?.description ?? item.description ?? ''
                const unitPrice = isMember ? item.unitPriceMember : item.unitPriceGeneral
                const amount = unitPrice * qty
                return { ...item, qty, description, amount, sortNo: i }
            })
            const totals = calculateInvoiceTotals(items, formValues.items, isMember, customer)
            const data = { ...formValues, ...totals, items: mergedItems }
            const created = await createInvoice(customerId, data)
            toast({ title: '登録しました', variant: 'success', duration: 2000 })
            router.push(`/invoices/${created.id}`)
        } catch (error) {
            console.error('Failed to create:', error)
            toast({ title: '保存に失敗しました', variant: 'destructive', duration: 3000 })
        }
    }

    return { loading, customer, estimates, items, setItems, onSubmit, handleCopyFromEstimate, copyingFrom }
}

// -------------------------------------------------------
// 編集フック（invoiceId から）
// -------------------------------------------------------
export function useInvoiceEdit(invoiceId: string, reset: UseFormReset<InvoiceFormData>) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState<any>(null)
    const [invoice, setInvoice] = useState<any>(null)
    const [items, setItems] = useState<InvoiceItem[]>([])

    const loadData = useCallback(async () => {
        try {
            const invoiceData = await getInvoice(invoiceId)
            setInvoice(invoiceData)
            const sortedItems = sortByProductItemId(invoiceData.items || [])
            setItems(sortedItems)

            const customerData = await getCustomer(invoiceData.customerId)
            setCustomer(customerData)

            reset({
                docNo: invoiceData.docNo || '',
                status: invoiceData.status || 'DRAFT',
                isMember: String((invoiceData as any).isMember ?? false),
                cremationProcessType: (invoiceData as any).cremationProcessType || '',
                altarPlaceType: (invoiceData as any).altarPlaceType || '',
                altarPlaceOther: (invoiceData as any).altarPlaceOther || '',
                ceilingHeight: (invoiceData as any).ceilingHeight || '',
                estimateStaff: (invoiceData as any).estimateStaff || '',
                ceremonyStaff: (invoiceData as any).ceremonyStaff || '',
                transportStaff: (invoiceData as any).transportStaff || '',
                decorationStaff: (invoiceData as any).decorationStaff || '',
                returnStaff: (invoiceData as any).returnStaff || '',
                items: sortedItems.map((item: InvoiceItem) => ({
                    qty: item.qty,
                    description: item.description || '',
                })),
            })
        } catch (error) {
            console.error('Failed to load invoice:', error)
            toast({ title: 'データの読み込みに失敗しました', variant: 'destructive', duration: 3000 })
        } finally {
            setLoading(false)
        }
    }, [invoiceId, reset])

    useEffect(() => {
        loadData()
    }, [loadData])

    useEffect(() => {
        if (!loading && !invoice) {
            toast({ title: '請求書データが取得できませんでした', variant: 'destructive', duration: 3000 })
            router.push('/cases')
        }
    }, [loading, invoice, router])

    const onSubmit = async (formValues: InvoiceFormData) => {
        try {
            const isMember = formValues.isMember === 'true'
            const mergedItems = items.map((item, i) => {
                const qty = formValues.items[i]?.qty ?? item.qty
                const description = formValues.items[i]?.description ?? item.description ?? ''
                const unitPrice = isMember ? item.unitPriceMember : item.unitPriceGeneral
                const amount = unitPrice * qty
                return { ...item, qty, description, amount, sortNo: i }
            })
            const totals = calculateInvoiceTotals(items, formValues.items, isMember, customer)
            const data = { ...formValues, ...totals, items: mergedItems }
            await updateInvoice(invoiceId, data)
            toast({ title: '更新しました', variant: 'success', duration: 2000 })
            await loadData()
        } catch (error) {
            console.error('Failed to update:', error)
            toast({ title: '保存に失敗しました', variant: 'destructive', duration: 3000 })
        }
    }

    return { loading, customer, invoice, items, setItems, onSubmit }
}

// -------------------------------------------------------
// 品目検索フック
// -------------------------------------------------------
export function useInvoiceProductSearch(
    items: InvoiceItem[],
    setItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>,
    appendItemField: (val: InvoiceItemField) => void,
    moveItemField: (from: number, to: number) => void
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

        const defaultDescription = DEFAULT_DESCRIPTION_MAP[selectedProduct.name] ?? ''

        const newItem: InvoiceItem = {
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
        handleAddItem,
    }
}

// -------------------------------------------------------
// 明細操作フック
// -------------------------------------------------------
export function useInvoiceItems(
    items: InvoiceItem[],
    setItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>,
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
export function calculateInvoiceTotals(
    items: InvoiceItem[],
    itemFields: InvoiceItemField[] | undefined,
    isMember: boolean,
    customer: any
) {
    const subtotal = items.reduce((sum, item, i) => {
        const qty = itemFields?.[i]?.qty ?? item.qty
        const unitPrice = isMember ? item.unitPriceMember : item.unitPriceGeneral
        return sum + unitPrice * qty
    }, 0)
    const tax = Math.round(subtotal * 0.1)
    const total = subtotal + tax
    const membershipPaidAmount =
        customer?.memberships?.reduce((sum: number, m: any) => sum + (m.paymentAmount || 0), 0) || 0
    const grandTotal = Math.max(0, total - membershipPaidAmount)
    return { subtotal, tax, total, membershipPaidAmount, grandTotal }
}
