{
    /* 旧品目検索: 指摘修正のため現状は使用してない */
}
;('use client')

import { DocumentProductSearch } from '@/components/document/DocumentProductSearch'
import { EstimateItem } from '@/lib/estimates'
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
    items: EstimateItem[]
}

export function EstimateProductSearch(props: Props) {
    return <DocumentProductSearch {...props} />
}
