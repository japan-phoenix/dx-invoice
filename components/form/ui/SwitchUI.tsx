import React from 'react'

interface SwitchUIProps {
    checked?: boolean
    onChange: (checked: boolean) => void
    onBlur?: () => void
    label?: string
    error?: string
    required?: boolean
    disabled?: boolean
}

export function SwitchUI({ checked = false, onChange, onBlur, label, error, required, disabled }: SwitchUIProps) {
    return (
        <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <div
                    style={{
                        position: 'relative',
                        width: '50px',
                        height: '24px',
                        backgroundColor: checked ? '#28a745' : '#ddd',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                    onClick={() => !disabled && onChange(!checked)}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '2px',
                            left: checked ? '26px' : '2px',
                            width: '20px',
                            height: '20px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            transition: 'left 0.3s',
                        }}
                    />
                </div>
                <span style={{ fontWeight: '500' }}>
                    {label}
                    {required && <span style={{ color: 'red' }}>*</span>}
                </span>
            </label>
            {error && (
                <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', marginLeft: '3.5rem' }}>
                    {error}
                </div>
            )}
        </div>
    )
}
