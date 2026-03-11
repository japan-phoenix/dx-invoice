'use client'

import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { User } from '@/lib/users'
import {
    UserFormData,
    createUserFormSchema,
    updateUserFormSchema,
    DEFAULT_FORM_VALUES,
} from '../schemas/UserFormSchema'
import { UserFormSections } from './UserFormSections'

interface UserFormDialogProps {
    open: boolean
    user: User | null
    onClose: () => void
    onSubmit: (data: UserFormData) => Promise<void>
}

export function UserFormDialog({ open, user, onClose, onSubmit }: UserFormDialogProps) {
    const isEditing = user !== null
    const schema = isEditing ? updateUserFormSchema : createUserFormSchema

    const methods = useForm<UserFormData>({
        resolver: zodResolver(schema),
        defaultValues: DEFAULT_FORM_VALUES,
    })

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods

    useEffect(() => {
        if (open) {
            if (user) {
                reset({
                    name: user.name,
                    tel: user.tel,
                    password: '',
                    email: user.email ?? '',
                    birthDate: user.birthDate ? user.birthDate.split('T')[0] : '',
                })
            } else {
                reset(DEFAULT_FORM_VALUES)
            }
        }
    }, [open, user, reset])

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{isEditing ? '社員編集' : '社員新規登録'}</DialogTitle>
                </DialogHeader>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <UserFormSections isEditing={isEditing} />
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-md bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                            >
                                キャンセル
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting ? '保存中...' : '保存'}
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}
