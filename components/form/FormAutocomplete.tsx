'use client'

import { useController, FieldError, FieldErrorsImpl, FieldValues, Merge, Path, Control } from 'react-hook-form'
import { AutocompleteUI } from './ui/AutocompleteUI'

interface FormAutocompleteProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>>
    required?: boolean
    options: string[]
    disabled?: boolean
}

export function FormAutocomplete<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    error,
    required,
    options,
    disabled,
}: FormAutocompleteProps<T>) {
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    const { field } = useController({ name, control })

    return (
        <AutocompleteUI
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            label={label}
            placeholder={placeholder}
            error={errorMessage}
            required={required}
            options={options}
            disabled={disabled}
        />
    )
}
