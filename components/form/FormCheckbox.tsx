import React from 'react'
import { Controller, FieldValues, Path, Control, FieldError } from 'react-hook-form'

interface FormCheckboxProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    error?: FieldError
    required?: boolean
}

export function FormCheckbox<T extends FieldValues>({ name, control, label, error, required }: FormCheckboxProps<T>) {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            {...field}
                            type="checkbox"
                            checked={field.value || false}
                            onChange={(e) => field.onChange(e.target.checked)}
                            style={{
                                cursor: 'pointer',
                                borderColor: error ? '#dc3545' : undefined,
                            }}
                        />
                        <span style={{ fontWeight: '500' }}>
                            {label}
                            {required && <span style={{ color: 'red' }}>*</span>}
                        </span>
                    </label>
                )}
            />
            {error && (
                <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', marginLeft: '1.5rem' }}>
                    {error.message}
                </div>
            )}
        </div>
    )
}
