'use client'

import { EstimateItem } from '@/lib/estimates'

type Props = {
    items: EstimateItem[]
    handleUpdateItem: (index: number, field: 'qty' | 'description', value: string) => void
    handleRemoveItem: (index: number) => void
}

export function EstimateItemTable({ items, handleUpdateItem, handleRemoveItem }: Props) {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>明細</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>品目</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>種類</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>摘要</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>一般単価</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>会員単価</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>個数</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>金額</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={8} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                                明細がありません
                            </td>
                        </tr>
                    ) : (
                        items.map((item, index) => (
                            <tr key={index}>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                    {item.productItem?.name ?? '-'}
                                </td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                    {item.productVariant?.name ?? '-'}
                                </td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                    <input
                                        type="text"
                                        value={item.description || ''}
                                        onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.25rem',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                        }}
                                    />
                                </td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>
                                    ¥{item.unitPriceGeneral.toLocaleString()}
                                </td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>
                                    ¥{item.unitPriceMember.toLocaleString()}
                                </td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                    <input
                                        type="number"
                                        value={item.qty}
                                        onChange={(e) => handleUpdateItem(index, 'qty', e.target.value)}
                                        min={0}
                                        style={{
                                            width: '80px',
                                            padding: '0.25rem',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            textAlign: 'right',
                                        }}
                                    />
                                </td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>
                                    ¥{item.amount.toLocaleString()}
                                </td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(index)}
                                        style={{
                                            padding: '0.25rem 0.5rem',
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        削除
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
