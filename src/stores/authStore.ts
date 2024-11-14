import { IUserResponse } from '@/types';
import { create } from 'zustand';

interface AuthState {
  userData: IUserResponse | null; // Define el tipo según la estructura de tu respuesta
  setUserData: (data: IUserResponse) => void;
  clearUserData: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
  clearUserData: () => set({ userData: null }),
}));
