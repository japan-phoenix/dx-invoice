import React from 'react'
import { Controller, FieldValues, Path, Control, FieldError } from 'react-hook-form'
import { SwitchUI } from './ui/SwitchUI'

interface FormSwitchProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    error?: FieldError
    required?: boolean
    disabled?: boolean
}

export function FormSwitch<T extends FieldValues>({
    name,
    control,
    label,
    error,
    required,
    disabled,
}: FormSwitchProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <SwitchUI
                    checked={field.value || false}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    label={label}
                    error={error?.message as string}
                    required={required}
                    disabled={disabled}
                />
            )}
        />
    )
}
