'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ProductImageDialog } from '@/components/product/ProductImageDialog'
import { InvoiceItem } from '@/lib/invoices'
import { ProductItem, ProductVariant } from '@/lib/products'

type Props = {
    searchProductName: string
    setSearchProductName: (v: string) => void
    handleSearchProducts: () => void
    products: ProductItem[]
    selectedProduct: ProductItem | null
    handleSelectProduct: (p: ProductItem) => void
    selectedVariant: ProductVariant | null
    setSelectedVariant: (v: ProductVariant) => void
    handleAddItem: () => void
    items: InvoiceItem[]
}

export function InvoiceProductSearch({
    searchProductName,
    setSearchProductName,
    handleSearchProducts,
    products,
    selectedProduct,
    handleSelectProduct,
    selectedVariant,
    setSelectedVariant,
    handleAddItem,
    items,
}: Props) {
    return (
        <div className="mb-8 rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4">品目追加</h3>
            <div className="mb-4 flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="品目名で検索"
                    value={searchProductName}
                    onChange={(e) => setSearchProductName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            handleSearchProducts()
                        }
                    }}
                    className="min-w-[200px] flex-1 rounded border border-gray-300 p-2"
                />
                <button
                    type="button"
                    onClick={handleSearchProducts}
                    className="cursor-pointer rounded border-0 bg-blue-600 px-4 py-2 text-white"
                >
                    検索
                </button>
            </div>

            {products.length > 0 && (
                <div className="mb-4">
                    <label className="mb-2 block">品目選択</label>
                    <Select
                        value={selectedProduct?.id ?? ''}
                        onValueChange={(id) => {
                            const p = products.find((p) => p.id === id)
                            if (p) handleSelectProduct(p)
                        }}
                    >
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {products.map((p) => {
                                const alreadyAdded = items.some((item) => item.productItemId === p.id)
                                return (
                                    <SelectItem key={p.id} value={p.id} disabled={alreadyAdded}>
                                        {p.name}
                                        {alreadyAdded ? '（追加済み）' : ''}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {selectedProduct && selectedProduct.variants.length > 0 && (
                <div className="mb-4">
                    <div className="mb-2 flex items-center gap-3">
                        <label>種類選択</label>
                        <ProductImageDialog product={selectedProduct} />
                    </div>
                    <Select
                        value={selectedVariant?.id ?? ''}
                        onValueChange={(id) => {
                            const v = selectedProduct.variants.find((v) => v.id === id)
                            if (v) setSelectedVariant(v)
                        }}
                    >
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {selectedProduct.variants.map((v) => (
                                <SelectItem key={v.id} value={v.id}>
                                    {v.name}（一般: ¥{v.priceGeneral.toLocaleString()}, 会員: ¥
                                    {v.priceMember.toLocaleString()}）
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {selectedProduct && selectedVariant && (
                <button
                    type="button"
                    onClick={handleAddItem}
                    className="cursor-pointer rounded border-0 bg-green-600 px-4 py-2 text-white"
                >
                    ＋ 明細行追加
                </button>
            )}
        </div>
    )
}
