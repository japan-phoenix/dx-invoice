import axios from 'axios';
import Cookies from 'js-cookie';

// Vercel環境では相対パスを使用、ローカルでは環境変数またはデフォルト値
const getApiUrl = () => {
  if (typeof window === 'undefined') {
    // サーバーサイド
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }
  // クライアントサイド
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl && apiUrl !== 'undefined') {
    return apiUrl;
  }
  // 環境変数が設定されていない場合は相対パスを使用（Vercel環境）
  return '/api';
};

const API_URL = getApiUrl();

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30秒のタイムアウト
});

// リクエストインターセプター: トークンを自動付与
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// レスポンスインターセプター: エラーハンドリング
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.message, error.response?.status, error.config?.url);
    
    // タイムアウトエラーやネットワークエラーの場合
    if (!error.response) {
      console.error('Network error or timeout:', error.message);
      // ログイン画面へのリダイレクトは行わない（ログイン画面自体がリダイレクトされる可能性がある）
      return Promise.reject(error);
    }
    
    if (error.response?.status === 401) {
      // 認証エラーの場合、ログイン画面へリダイレクト
      // ただし、ログイン画面からのリクエストの場合はリダイレクトしない
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        Cookies.remove('access_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
