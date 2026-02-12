import apiClient from './api';

export interface User {
  id: string;
  name: string;
  tel: string;
  email?: string;
  birthDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserData {
  name: string;
  tel: string;
  password: string;
  email?: string;
  birthDate?: string;
}

export interface UpdateUserData {
  name?: string;
  tel?: string;
  password?: string;
  email?: string;
  birthDate?: string;
}

export async function getUsers(name?: string): Promise<User[]> {
  const params = name ? { name } : {};
  const response = await apiClient.get<User[]>('/users', { params });
  return response.data;
}

export async function getUser(id: string): Promise<User> {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
}

export async function createUser(data: CreateUserData): Promise<User> {
  const response = await apiClient.post<User>('/users', data);
  return response.data;
}

export async function updateUser(id: string, data: UpdateUserData): Promise<User> {
  const response = await apiClient.put<User>(`/users/${id}`, data);
  return response.data;
}
