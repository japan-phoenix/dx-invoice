import React from 'react'
import { Controller, FieldValues, Path, Control, FieldError } from 'react-hook-form'

interface FormSelectProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    options: Array<{ value: string | number; label: string }>
    error?: FieldError
    required?: boolean
    placeholder?: string
}

export function FormSelect<T extends FieldValues>({
    name,
    control,
    label,
    options,
    error,
    required,
    placeholder,
}: FormSelectProps<T>) {
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
                    <select
                        {...field}
                        value={field.value || ''}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: error ? '2px solid #dc3545' : '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem',
                        }}
                    >
                        {placeholder && <option value="">{placeholder}</option>}
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            />
            {error && (
                <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{error.message}</div>
            )}
        </div>
    )
}
