import React from 'react'
import { Controller, FieldValues, Path, Control, FieldError } from 'react-hook-form'
import { RadioUI } from './ui/RadioUI'

interface FormRadioProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    options: Array<{ value: string | number; label: string }>
    error?: FieldError
    required?: boolean
    disabled?: boolean
    direction?: 'row' | 'column'
}

export function FormRadio<T extends FieldValues>({
    name,
    control,
    label,
    options,
    error,
    required,
    disabled,
    direction = 'row',
}: FormRadioProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <RadioUI
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    label={label}
                    options={options}
                    error={error?.message as string}
                    required={required}
                    disabled={disabled}
                    direction={direction}
                />
            )}
        />
    )
}
