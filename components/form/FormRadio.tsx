import React from 'react'
import { Controller, FieldValues, Path, Control, FieldError } from 'react-hook-form'

interface FormRadioProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    options: Array<{ value: string | number; label: string }>
    error?: FieldError
    required?: boolean
    direction?: 'row' | 'column'
}

export function FormRadio<T extends FieldValues>({
    name,
    control,
    label,
    options,
    error,
    required,
    direction = 'row',
}: FormRadioProps<T>) {
    return (
        <div>
            {label && (
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    {label}
                    {required && <span style={{ color: 'red' }}>*</span>}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: direction === 'row' ? 'row' : 'column',
                            gap: direction === 'row' ? '1rem' : '0.5rem',
                        }}
                    >
                        {options.map((option) => (
                            <label
                                key={option.value}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                }}
                            >
                                <input
                                    type="radio"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                    onChange={() => field.onChange(option.value)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            />
            {error && (
                <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{error.message}</div>
            )}
        </div>
    )
}
