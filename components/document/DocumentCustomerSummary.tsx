'use client'

import { useState } from 'react'

type Props = {
    customer: any
}

export function DocumentCustomerSummary({ customer }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <div className="mb-8 rounded-lg bg-gray-100 p-4">
            <div className="flex items-center justify-between">
                <p>
                    <strong>故人名:</strong> {customer.deceasedName}
                </p>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="flex cursor-pointer items-center gap-1 border-none bg-transparent text-sm text-gray-500 hover:text-gray-700"
                >
                    <span
                        className="inline-block transition-transform duration-200"
                        style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                        ▼
                    </span>
                </button>
            </div>
            {open && (
                <div className="mt-2 space-y-1">
                    <p>
                        <strong>受付日:</strong>{' '}
                        {customer.receptionAt ? new Date(customer.receptionAt).toLocaleDateString('ja-JP') : ''}
                    </p>
                    <p>
                        <strong>喪主名:</strong> {customer.chiefMournerName}
                    </p>
                    <p>
                        <strong>住所:</strong> {customer.chiefMournerAddress}
                    </p>
                    {customer.memberCardNote && (
                        <p>
                            <strong>会員証:</strong> {customer.memberCardNote}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
