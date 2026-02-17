import React from 'react'
import { Controller, FieldValues, Path, Control, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { InputUI } from './ui/InputUI'

interface FormInputProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    type?: string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>>
    required?: boolean
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    disabled?: boolean
}

export function FormInput<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    type = 'text',
    error,
    required,
    prefix,
    suffix,
    disabled,
}: FormInputProps<T>) {
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <InputUI
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    label={label}
                    placeholder={placeholder}
                    type={type}
                    error={errorMessage}
                    required={required}
                    prefix={prefix}
                    suffix={suffix}
                    disabled={disabled}
                />
            )}
        />
    )
}
