'use client'

import { useEffect, useState } from 'react'
import { useController, FieldError, FieldErrorsImpl, FieldValues, Merge, Path, Control } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'

interface FormAutocompleteProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>>
    required?: boolean
    options: string[]
}

export function FormAutocomplete<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    error,
    required,
    options,
}: FormAutocompleteProps<T>) {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const normalizedInput = inputValue.trim()
    const filteredOptions = normalizedInput ? options.filter((option) => option.includes(normalizedInput)) : options
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined

    const { field } = useController({ name, control })

    useEffect(() => {
        if (typeof field.value === 'string') {
            setInputValue(field.value)
        }
    }, [field.value])

    return (
        <div>
            {label && (
                <label className="mb-2 block font-medium">
                    {label}
                    {required && <span className="text-red-600">*</span>}
                </label>
            )}
            <Popover open={open && filteredOptions.length > 0} onOpenChange={setOpen}>
                <PopoverAnchor asChild>
                    <Input
                        value={inputValue}
                        placeholder={placeholder}
                        onChange={(event) => {
                            const value = event.target.value
                            setInputValue(value)
                            field.onChange(value)
                            const nextOptions = value.trim()
                                ? options.filter((option) => option.includes(value.trim()))
                                : options
                            setOpen(nextOptions.length > 0)
                        }}
                        onFocus={() => setOpen(filteredOptions.length > 0)}
                        onClick={() => setOpen(filteredOptions.length > 0)}
                        className={cn(
                            'h-auto w-full rounded border px-3 py-2 text-left text-base shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                            error ? 'border-red-500' : 'border-gray-300'
                        )}
                    />
                </PopoverAnchor>
                {filteredOptions.length > 0 && (
                    <PopoverContent
                        className="w-[var(--radix-popover-trigger-width)] bg-white p-0"
                        align="start"
                        onOpenAutoFocus={(event) => event.preventDefault()}
                        onCloseAutoFocus={(event) => event.preventDefault()}
                    >
                        <Command>
                            <CommandList>
                                <CommandGroup>
                                    {filteredOptions.map((option) => (
                                        <CommandItem
                                            key={option}
                                            value={option}
                                            className="justify-start text-left"
                                            onSelect={(value) => {
                                                setInputValue(value)
                                                field.onChange(value)
                                                setOpen(false)
                                            }}
                                        >
                                            {option}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                )}
            </Popover>
            {errorMessage && <div className="mt-1 text-sm text-red-600">{errorMessage}</div>}
        </div>
    )
}
