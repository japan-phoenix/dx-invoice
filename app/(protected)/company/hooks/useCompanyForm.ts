import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCompanyProfile, updateCompanyProfile, UpdateCompanyProfileData } from '@/lib/company'

export function useCompanyProfileQuery() {
    return useQuery({
        queryKey: ['companyProfile'],
        queryFn: getCompanyProfile,
        staleTime: 1000 * 60 * 5,
    })
}

export function useUpdateCompanyProfileMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: UpdateCompanyProfileData) => updateCompanyProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companyProfile'] })
        },
    })
}
