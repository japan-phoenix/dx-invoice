'use client'

import { User } from '@/lib/users'

interface UserTableProps {
    users: User[]
    onEdit: (user: User) => void
}

function formatDate(dateString: string | null | undefined): string {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('ja-JP')
}

export function UserTable({ users, onEdit }: UserTableProps) {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            名前
                        </th>
                        <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            TEL
                        </th>
                        <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Email
                        </th>
                        <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            生年月日
                        </th>
                        <th className="border-b border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700">
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                社員が見つかりません
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-100 last:border-0">
                                <td className="px-4 py-3 text-sm">{user.name}</td>
                                <td className="px-4 py-3 text-sm">{user.tel}</td>
                                <td className="px-4 py-3 text-sm">{user.email || '-'}</td>
                                <td className="px-4 py-3 text-sm">{formatDate(user.birthDate)}</td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => onEdit(user)}
                                        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-700"
                                    >
                                        編集
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
