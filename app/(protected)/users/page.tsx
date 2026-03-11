'use client'

import { useState } from 'react'
import { User } from '@/lib/users'
import { toast } from '@/hooks/use-toast'
import { UserFormData } from './schemas/UserFormSchema'
import { useUsersQuery, useCreateUserMutation, useUpdateUserMutation } from './hooks/useUserForm'
import { UserFormDialog } from './components/UserFormDialog'
import { UserTable } from './components/UserTable'
import { SearchButton } from '@/components/button/SearchButton'
import { ResetButton } from '@/components/button/ResetButton'
import { CreateButton } from '@/components/button/CreateButton'

export default function UsersPage() {
    const [searchName, setSearchName] = useState('')
    const [appliedSearch, setAppliedSearch] = useState('')
    const [editDialog, setEditDialog] = useState<{ open: boolean; user: User | null }>({
        open: false,
        user: null,
    })

    const { data: users = [], isLoading } = useUsersQuery(appliedSearch || undefined)
    const createMutation = useCreateUserMutation()
    const updateMutation = useUpdateUserMutation()

    const handleSearch = () => {
        setAppliedSearch(searchName)
    }

    const handleReset = () => {
        setSearchName('')
        setAppliedSearch('')
    }

    const handleNewUser = () => {
        setEditDialog({ open: true, user: null })
    }

    const handleEditUser = (user: User) => {
        setEditDialog({ open: true, user })
    }

    const handleCloseDialog = () => {
        setEditDialog({ open: false, user: null })
    }

    const handleSubmit = async (data: UserFormData) => {
        try {
            if (editDialog.user) {
                const updateData = {
                    name: data.name,
                    tel: data.tel,
                    email: data.email || undefined,
                    birthDate: data.birthDate || undefined,
                    ...(data.password ? { password: data.password } : {}),
                }
                await updateMutation.mutateAsync({ id: editDialog.user.id, data: updateData })
                toast({ title: '更新しました' })
            } else {
                await createMutation.mutateAsync({
                    name: data.name,
                    tel: data.tel,
                    password: data.password!,
                    email: data.email || undefined,
                    birthDate: data.birthDate || undefined,
                })
                toast({ title: '登録しました' })
            }
            handleCloseDialog()
        } catch (error: any) {
            toast({
                title: editDialog.user ? '更新に失敗しました' : '登録に失敗しました',
                description: error?.response?.data?.message,
                variant: 'destructive',
            })
        }
    }

    if (isLoading) {
        return <div className="p-8">読み込み中...</div>
    }

    return (
        <div className="mx-auto max-w-4xl p-8">
            <div className="flex items-start justify-between">
                <h1 className="mb-8 text-2xl font-bold">社員管理</h1>
                <CreateButton onClick={handleNewUser}>新規登録</CreateButton>
            </div>

            {/* 検索条件エリア */}
            <section className="mb-6 rounded-lg border bg-gray-50 p-6">
                <div className="grid grid-cols-[1fr_auto] items-end gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-semibold">名前で検索</label>
                        <input
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="名前を入力"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <SearchButton onClick={handleSearch} isLoading={isLoading} />
                        <ResetButton onClick={handleReset} />
                    </div>
                </div>
            </section>

            {/* ユーザー一覧 */}
            <UserTable users={users} onEdit={handleEditUser} />

            {/* 編集ダイアログ */}
            <UserFormDialog
                open={editDialog.open}
                user={editDialog.user}
                onClose={handleCloseDialog}
                onSubmit={handleSubmit}
            />
        </div>
    )
}
