'use client'

type Props = {
    customer: any
}

export function FlowerCustomerInfo({ customer }: Props) {
    return (
        <div className="mb-8 rounded-lg bg-gray-100 p-4">
            <p>
                <strong>故人名:</strong> {customer.deceasedName}
            </p>
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
    )
}
