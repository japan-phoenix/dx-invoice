import React from 'react'
import { Controller, FieldValues, Path, Control, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { CurrencyInputUI } from './ui/CurrencyInputUI'

interface FormCurrencyInputProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>>
    required?: boolean
    disabled?: boolean
    prefix?: React.ReactNode
    suffix?: React.ReactNode
}

export function FormCurrencyInput<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    error,
    required,
    disabled,
    prefix,
    suffix,
}: FormCurrencyInputProps<T>) {
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <CurrencyInputUI
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    label={label}
                    placeholder={placeholder}
                    error={errorMessage}
                    required={required}
                    disabled={disabled}
                    prefix={prefix}
                    suffix={suffix}
                />
            )}
        />
    )
}
