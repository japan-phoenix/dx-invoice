import apiClient from './api'

export interface AddressCity {
    id: string
    name: string
    sortNo: number
    isActive: boolean
}

export interface AddressTown {
    id: string
    cityId: string
    name: string
    sortNo: number
    isActive: boolean
}

export interface PostalSearchResult {
    zipcode: string
    prefecture: string
    city: string
    town: string
    fullAddress: string
}

export async function getCities(): Promise<AddressCity[]> {
    const response = await apiClient.get<AddressCity[]>('/addresses/cities')
    return response.data
}

export async function getTowns(cityId: string): Promise<AddressTown[]> {
    const response = await apiClient.get<AddressTown[]>(`/addresses/towns?city=${cityId}`)
    return response.data
}

export async function searchPostalCode(zipcode: string): Promise<PostalSearchResult | null> {
    const response = await apiClient.get<{ data: PostalSearchResult | null }>('/addresses/postal-search', {
        params: { zipcode },
    })
    return response.data.data
}
