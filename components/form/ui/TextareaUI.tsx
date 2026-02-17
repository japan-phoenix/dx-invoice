import React from 'react'

interface TextareaUIProps {
    value?: string
    onChange: (value: string) => void
    onBlur?: () => void
    label?: string
    placeholder?: string
    rows?: number
    error?: string
    required?: boolean
    disabled?: boolean
}

export function TextareaUI({
    value = '',
    onChange,
    onBlur,
    label,
    placeholder,
    rows = 4,
    error,
    required,
    disabled,
}: TextareaUIProps) {
    return (
        <div>
            {label && (
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    {label}
                    {required && <span style={{ color: 'red' }}>*</span>}
                </label>
            )}
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                placeholder={placeholder}
                rows={rows}
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: error ? '2px solid #dc3545' : '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    backgroundColor: disabled ? '#f5f5f5' : 'white',
                    cursor: disabled ? 'not-allowed' : 'text',
                }}
                disabled={disabled}
            />
            {error && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{error}</div>}
        </div>
    )
}
