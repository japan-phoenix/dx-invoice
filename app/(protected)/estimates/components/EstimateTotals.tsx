'use client'

type Totals = {
    subtotal: number
    tax: number
    total: number
    membershipPaidAmount: number
    grandTotal: number
}

type Props = {
    totals: Totals
}

export function EstimateTotals({ totals }: Props) {
    return (
        <div
            style={{
                backgroundColor: '#f9f9f9',
                padding: '1.5rem',
                borderRadius: '8px',
                marginBottom: '2rem',
            }}
        >
            <h3 style={{ marginBottom: '1rem' }}>合計</h3>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                    gap: '0.5rem 2rem',
                    width: 'fit-content',
                }}
            >
                <div>小計:</div>
                <div style={{ textAlign: 'right' }}>¥{totals.subtotal.toLocaleString()}</div>
                <div>消費税（10%）:</div>
                <div style={{ textAlign: 'right' }}>¥{totals.tax.toLocaleString()}</div>
                <div>合計:</div>
                <div style={{ textAlign: 'right' }}>¥{totals.total.toLocaleString()}</div>
                <div>会費入金額:</div>
                <div style={{ textAlign: 'right' }}>¥{totals.membershipPaidAmount.toLocaleString()}</div>
                <div style={{ borderTop: '1px solid #ddd', paddingTop: '0.5rem', fontWeight: 'bold' }}>差引合計:</div>
                <div
                    style={{
                        borderTop: '1px solid #ddd',
                        paddingTop: '0.5rem',
                        textAlign: 'right',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                    }}
                >
                    ¥{totals.grandTotal.toLocaleString()}
                </div>
            </div>
        </div>
    )
}
