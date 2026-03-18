'use client'

import { DocumentProductSearch } from '@/components/document/DocumentProductSearch'
import { InvoiceItem } from '@/lib/invoices'
import { ProductItem, ProductVariant } from '@/lib/products'

type Props = {
    searchProductName: string
    setSearchProductName: (v: string) => void
    handleSearchProducts: (query?: string) => void
    products: ProductItem[]
    selectedProduct: ProductItem | null
    handleSelectProduct: (p: ProductItem) => void
    clearSelectedProduct: () => void
    selectedVariant: ProductVariant | null
    setSelectedVariant: (v: ProductVariant) => void
    handleAddItem: () => void
    items: InvoiceItem[]
}

export function InvoiceProductSearch(props: Props) {
    return <DocumentProductSearch {...props} />
}
