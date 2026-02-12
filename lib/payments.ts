import apiClient from './api';

export interface CreatePaymentData {
  paidAt: string;
  memo?: string;
}

export async function createInvoicePayment(
  invoiceId: string,
  data: CreatePaymentData,
) {
  const response = await apiClient.post(`/payments/invoice/${invoiceId}/paid`, data);
  return response.data;
}

export async function cancelInvoicePayment(
  invoiceId: string,
  data: CreatePaymentData,
) {
  const response = await apiClient.post(`/payments/invoice/${invoiceId}/cancel`, data);
  return response.data;
}

export async function createFlowerTargetPayment(targetId: string) {
  const response = await apiClient.post(`/payments/flower-target/${targetId}/paid`);
  return response.data;
}

export async function cancelFlowerTargetPayment(targetId: string) {
  const response = await apiClient.post(`/payments/flower-target/${targetId}/cancel`);
  return response.data;
}
