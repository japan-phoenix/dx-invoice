'use client'

import { useFormContext } from 'react-hook-form'
import { FormInput } from '@/components/form/FormInput'
import { UserFormData } from '../schemas/UserFormSchema'

interface UserFormSectionsProps {
    isEditing: boolean
}

export function UserFormSections({ isEditing }: UserFormSectionsProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext<UserFormData>()

    return (
        <div className="flex flex-col gap-4">
            <FormInput name="name" control={control} label="名前" required error={errors.name} />
            <FormInput name="tel" control={control} label="TEL" type="tel" required error={errors.tel} />
            <FormInput
                name="password"
                control={control}
                label={isEditing ? 'パスワード（変更する場合のみ入力）' : 'パスワード'}
                type="password"
                required={!isEditing}
                error={errors.password}
            />
            <FormInput name="email" control={control} label="Email" type="email" error={errors.email} />
            <FormInput name="birthDate" control={control} label="生年月日" type="date" error={errors.birthDate} />
        </div>
    )
}
