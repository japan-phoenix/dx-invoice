import apiClient from './api';
import Cookies from 'js-cookie';

export interface LoginCredentials {
  tel: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  tel: string;
  email?: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  if (response.data.access_token) {
    Cookies.set('access_token', response.data.access_token, { expires: 7 });
  }
  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await apiClient.get<User>('/auth/me');
  return response.data;
}

export function logout() {
  Cookies.remove('access_token');
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

export function isAuthenticated(): boolean {
  return !!Cookies.get('access_token');
}
