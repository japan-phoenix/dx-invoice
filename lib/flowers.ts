import apiClient from './api';

export interface Flower {
  id: string;
  customerId: string;
  requesterName: string;
  labelName?: string;
  jointNames?: string;
  billToName: string;
  billToAddress: string;
  billToTel?: string;
  deliveryTo?: string;
  amount: number;
}

export interface FlowerBillingTarget {
  id: string;
  customerId: string;
  billToName: string;
  billToAddress: string;
  billToTel?: string;
  flowers: Flower[];
}

export async function getFlowers(customerId: string): Promise<FlowerBillingTarget[]> {
  const response = await apiClient.get<FlowerBillingTarget[]>(
    `/flowers/customers/${customerId}/flowers`,
  );
  return response.data;
}

export async function getFlower(id: string): Promise<Flower> {
  const response = await apiClient.get<Flower>(`/flowers/${id}`);
  return response.data;
}

export async function createFlower(customerId: string, data: any): Promise<Flower> {
  const response = await apiClient.post(`/flowers/customers/${customerId}/flowers`, data);
  return response.data;
}

export async function updateFlower(id: string, data: any): Promise<Flower> {
  const response = await apiClient.put(`/flowers/${id}`, data);
  return response.data;
}

export async function deleteFlower(id: string): Promise<void> {
  await apiClient.delete(`/flowers/${id}`);
}
