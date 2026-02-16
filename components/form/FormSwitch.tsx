import React from 'react'
import { Controller, FieldValues, Path, Control, FieldError } from 'react-hook-form'

interface FormSwitchProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    error?: FieldError
    required?: boolean
}

export function FormSwitch<T extends FieldValues>({ name, control, label, error, required }: FormSwitchProps<T>) {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <div
                            style={{
                                position: 'relative',
                                width: '50px',
                                height: '24px',
                                backgroundColor: field.value ? '#28a745' : '#ddd',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onClick={() => field.onChange(!field.value)}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '2px',
                                    left: field.value ? '26px' : '2px',
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
                )}
            />
            {error && (
                <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', marginLeft: '3.5rem' }}>
                    {error.message}
                </div>
            )}
        </div>
    )
}
