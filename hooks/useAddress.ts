import { useQuery } from '@tanstack/react-query'
import { getCities, getTowns } from '@/lib/address'

/**
 * 全都市を取得するクエリ
 */
export function useCitiesQuery() {
    return useQuery({
        queryKey: ['cities'],
        queryFn: getCities,
        staleTime: Infinity, // 都市は頻繁に変わるものではないため、常に新鮮なデータを使用
    })
}

/**
 * 指定された都市の町字を取得するクエリ
 */
export function useTownsQuery(cityId: string | null) {
    return useQuery({
        queryKey: ['towns', cityId],
        queryFn: () => getTowns(cityId!),
        enabled: !!cityId,
        staleTime: 1000 * 60 * 30, // 30分
    })
}
