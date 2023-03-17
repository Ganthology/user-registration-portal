import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthData } from '../types';

interface ZustandStore {
  auth: AuthData | null;
  setAuth: (auth: AuthData | null) => void;
}
export const useAuthStore = create(
  persist<ZustandStore>(
    (set) => ({
      auth: null,
      setAuth: (auth) => set(() => ({ auth })),
    }),
    {
      name: 'auth', // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    },
  ),
);
