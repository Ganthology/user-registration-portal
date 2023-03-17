import { useAuthStore } from '../store/useAuthStore';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const authToken = useAuthStore.getState().auth?.access_token;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };
  return await fetch(url, { ...options, headers });
}
