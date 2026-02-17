import React from 'react'
import { Controller, FieldValues, Path, Control, FieldError } from 'react-hook-form'
import { TextareaUI } from './ui/TextareaUI'

interface FormTextareaProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    rows?: number
    error?: FieldError
    required?: boolean
    disabled?: boolean
}

export function FormTextarea<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    rows = 4,
    error,
    required,
    disabled,
}: FormTextareaProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextareaUI
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    label={label}
                    placeholder={placeholder}
                    rows={rows}
                    error={error?.message as string}
                    required={required}
                    disabled={disabled}
                />
            )}
        />
    )
}
