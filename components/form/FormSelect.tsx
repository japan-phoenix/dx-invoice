import React from 'react'
import { Controller, FieldValues, Path, Control, FieldError } from 'react-hook-form'
import { SelectUI } from './ui/SelectUI'

interface FormSelectProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    options: Array<{ value: string | number; label: string }>
    error?: FieldError
    required?: boolean
    disabled?: boolean
    placeholder?: string
}

export function FormSelect<T extends FieldValues>({
    name,
    control,
    label,
    options,
    error,
    required,
    disabled,
    placeholder,
}: FormSelectProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <SelectUI
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    label={label}
                    options={options}
                    error={error?.message as string}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder}
                />
            )}
        />
    )
}
