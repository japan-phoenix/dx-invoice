import React from 'react'
import { Controller, FieldValues, Path, Control, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

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
}: FormInputProps<T>) {
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    return (
        <div>
            {label && (
                <label className="mb-2 block font-medium">
                    {label}
                    {required && <span className="text-red-600">*</span>}
                </label>
            )}
            <div className="flex w-full items-center">
                {prefix && <span className="mr-2 flex-shrink-0">{prefix}</span>}
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type={type}
                            placeholder={placeholder}
                            className={`w-full rounded border px-3 py-2 text-base focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}
                        />
                    )}
                />
                {suffix && <span className="ml-2 flex-shrink-0">{suffix}</span>}
            </div>
            {errorMessage && <div className="mt-1 text-sm text-red-600">{errorMessage}</div>}
        </div>
    )
}
