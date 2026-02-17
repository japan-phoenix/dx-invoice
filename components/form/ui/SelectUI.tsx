import React from 'react'

interface SelectUIProps {
    value?: string | number
    onChange: (value: string) => void
    onBlur?: () => void
    label?: string
    options: Array<{ value: string | number; label: string }>
    error?: string
    required?: boolean
    disabled?: boolean
    placeholder?: string
}

export function SelectUI({
    value = '',
    onChange,
    onBlur,
    label,
    options,
    error,
    required,
    disabled,
    placeholder,
}: SelectUIProps) {
    return (
        <div>
            {label && (
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    {label}
                    {required && <span style={{ color: 'red' }}>*</span>}
                </label>
            )}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: error ? '2px solid #dc3545' : '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    backgroundColor: disabled ? '#f5f5f5' : 'white',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                }}
                disabled={disabled}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{error}</div>}
        </div>
    )
}
