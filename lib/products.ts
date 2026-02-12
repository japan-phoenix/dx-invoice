import apiClient from './api';

export interface ProductVariant {
  id: string;
  productItemId: string;
  name: string;
  imageUrl?: string;
  priceGeneral: number;
  priceMember: number;
  isActive: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  isActive: boolean;
  variants: ProductVariant[];
}

export async function getProducts(name?: string): Promise<ProductItem[]> {
  const url = name ? `/products?name=${encodeURIComponent(name)}` : '/products';
  const response = await apiClient.get<ProductItem[]>(url);
  return response.data;
}

export async function getProductVariants(productItemId: string): Promise<ProductVariant[]> {
  const response = await apiClient.get<ProductVariant[]>(`/products/${productItemId}/variants`);
  return response.data;
}
