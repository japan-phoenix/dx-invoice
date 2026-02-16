import React from 'react'
import { Controller, FieldValues, Path, Control, FieldError } from 'react-hook-form'

interface FormTextareaProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    rows?: number
    error?: FieldError
    required?: boolean
}

export function FormTextarea<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    rows = 4,
    error,
    required,
}: FormTextareaProps<T>) {
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
                    <textarea
                        {...field}
                        value={field.value || ''}
                        placeholder={placeholder}
                        rows={rows}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: error ? '2px solid #dc3545' : '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                        }}
                    />
                )}
            />
            {error && (
                <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{error.message}</div>
            )}
        </div>
    )
}
