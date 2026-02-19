'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EstimateItem } from '@/lib/estimates'
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
    items: EstimateItem[]
}

export function EstimateProductSearch({
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
        <div
            style={{
                backgroundColor: '#f9f9f9',
                padding: '1.5rem',
                borderRadius: '8px',
                marginBottom: '2rem',
            }}
        >
            <h3 style={{ marginBottom: '1rem' }}>品目追加</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
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
                    style={{
                        flex: 1,
                        minWidth: '200px',
                        padding: '0.5rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                    }}
                />
                <button
                    type="button"
                    onClick={handleSearchProducts}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    検索
                </button>
            </div>

            {products.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>品目選択</label>
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
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>種類選択</label>
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
                                    {v.name}（一般: ¥{v.priceGeneral.toLocaleString()} / 会員: ¥
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
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    ＋ 明細行追加
                </button>
            )}
        </div>
    )
}
