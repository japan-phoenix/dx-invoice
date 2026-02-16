import React from 'react'
import { Controller, FieldValues, Path, Control, FieldError } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

interface FormCurrencyInputProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    error?: FieldError
    required?: boolean
}

export function FormCurrencyInput<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    error,
    required,
}: FormCurrencyInputProps<T>) {
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
                    <NumericFormat
                        {...field}
                        value={field.value || ''}
                        onValueChange={(values) => {
                            field.onChange(values.floatValue || '')
                        }}
                        thousandSeparator=","
                        decimalScale={0}
                        placeholder={placeholder || '0'}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: error ? '2px solid #dc3545' : '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem',
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
