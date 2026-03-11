import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, createUser, updateUser, CreateUserData, UpdateUserData } from '@/lib/users'

export function useUsersQuery(name?: string) {
    return useQuery({
        queryKey: ['users', name],
        queryFn: () => getUsers(name || undefined),
    })
}

export function useCreateUserMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateUserData) => createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}

export function useUpdateUserMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateUserData }) => updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}
