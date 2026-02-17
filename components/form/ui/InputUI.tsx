import React from 'react'

interface InputUIProps {
    value?: string
    onChange: (value: string) => void
    onBlur?: () => void
    label?: string
    placeholder?: string
    type?: string
    error?: string
    required?: boolean
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    disabled?: boolean
}

export function InputUI({
    value = '',
    onChange,
    onBlur,
    label,
    placeholder,
    type = 'text',
    error,
    required,
    prefix,
    suffix,
    disabled,
}: InputUIProps) {
    const maxValue = type === 'datetime-local' ? '9999-12-31T23:59' : type === 'date' ? '9999-12-31' : undefined

    return (
        <div>
            {label && (
                <label className="mb-2 block font-medium">
                    {label}
                    {required && <span className="text-red-600">*</span>}
                </label>
            )}
            <div className="flex w-full items-center">
                {prefix && <span className="mr-2 flex-shrink-0">{prefix}</span>}
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    type={type}
                    max={maxValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full rounded border px-3 py-2 text-base focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'cursor-not-allowed bg-gray-100 opacity-60' : ''}`}
                />
                {suffix && <span className="ml-2 flex-shrink-0">{suffix}</span>}
            </div>
            {error && <div className="mt-1 text-sm text-red-600">{error}</div>}
        </div>
    )
}
