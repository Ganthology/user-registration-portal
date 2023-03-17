import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FormData } from '../types';

interface ZustandStore {
  formData: Partial<FormData> | null;
  setFormData: (auth: Partial<FormData> | null) => void;
}
export const useFormStore = create(
  persist<ZustandStore>(
    (set) => ({
      formData: null,
      setFormData: (formData) => set(() => ({ formData })),
    }),
    {
      name: 'form', // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    },
  ),
);
