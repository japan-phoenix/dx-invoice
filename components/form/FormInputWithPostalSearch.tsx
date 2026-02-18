'use client'

import { useState } from 'react'
import { Controller, FieldValues, Path, Control, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { PostalCodeSearchDialog } from './PostalCodeSearchDialog'

interface FormInputWithPostalSearchProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>>
    required?: boolean
    disabled?: boolean
}

export function FormInputWithPostalSearch<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    error,
    required,
    disabled,
}: FormInputWithPostalSearchProps<T>) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined

    return (
        <div>
            {label && (
                <label className="mb-2 block font-medium">
                    {label}
                    {required && <span className="text-red-600">*</span>}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <div className="relative flex w-full items-center">
                            <input
                                {...field}
                                value={field.value || ''}
                                type="text"
                                placeholder={placeholder}
                                disabled={disabled}
                                className={`w-full rounded border px-3 py-2 pl-10 text-base focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'cursor-not-allowed bg-gray-100 opacity-60' : ''}`}
                            />
                            <button
                                type="button"
                                onClick={() => setIsDialogOpen(true)}
                                disabled={disabled}
                                className="absolute left-2 flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-30"
                                aria-label="郵便番号から検索"
                            >
                                <span className="material-symbols-outlined text-xl text-gray-600">search</span>
                            </button>
                        </div>
                        <PostalCodeSearchDialog
                            open={isDialogOpen}
                            onOpenChange={setIsDialogOpen}
                            onAddressSelect={(fullAddress) => {
                                field.onChange(fullAddress)
                            }}
                        />
                    </>
                )}
            />
            {errorMessage && <div className="mt-1 text-sm text-red-600">{errorMessage}</div>}
        </div>
    )
}
