import apiClient from './api';

export interface AddressCity {
  id: string;
  name: string;
  sortNo: number;
  isActive: boolean;
}

export interface AddressTown {
  id: string;
  cityId: string;
  name: string;
  sortNo: number;
  isActive: boolean;
}

export async function getCities(): Promise<AddressCity[]> {
  const response = await apiClient.get<AddressCity[]>('/addresses/cities');
  return response.data;
}

export async function getTowns(cityId: string): Promise<AddressTown[]> {
  const response = await apiClient.get<AddressTown[]>(
    `/addresses/towns?city=${cityId}`,
  );
  return response.data;
}
