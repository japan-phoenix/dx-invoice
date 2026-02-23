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
        <div className="mb-8 rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4">合計</h3>
            <div className="grid w-fit gap-x-8 gap-y-2 [grid-template-columns:auto_auto]">
                <div>小計:</div>
                <div className="text-right">¥{totals.subtotal.toLocaleString()}</div>
                <div>消費税（10%）:</div>
                <div className="text-right">¥{totals.tax.toLocaleString()}</div>
                <div>合計:</div>
                <div className="text-right">¥{totals.total.toLocaleString()}</div>
                <div>会費入金額:</div>
                <div className="text-right">¥-{totals.membershipPaidAmount.toLocaleString()}</div>
                <div className="border-t border-gray-300 pt-2 font-bold">差引合計:</div>
                <div className="border-t border-gray-300 pt-2 text-right text-lg font-bold">
                    ¥{totals.grandTotal.toLocaleString()}
                </div>
            </div>
        </div>
    )
}
