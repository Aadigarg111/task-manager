import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';
import { authAPI } from '../lib/api';
import toast from 'react-hot-toast';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { user, token } = await authAPI.login(email, password);
          localStorage.setItem('token', token);
          set({ user, token, isAuthenticated: true, isLoading: false });
          toast.success('Welcome back!');
        } catch (error: any) {
          set({ isLoading: false });
          toast.error(error.response?.data?.message || 'Login failed');
          throw error;
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { user, token } = await authAPI.register(name, email, password);
          localStorage.setItem('token', token);
          set({ user, token, isAuthenticated: true, isLoading: false });
          toast.success('Account created successfully!');
        } catch (error: any) {
          set({ isLoading: false });
          toast.error(error.response?.data?.message || 'Registration failed');
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
        toast.success('Logged out successfully');
      },

      updateProfile: async (data: Partial<User>) => {
        try {
          const updatedUser = await authAPI.updateProfile(data);
          set({ user: updatedUser });
          toast.success('Profile updated successfully');
        } catch (error: any) {
          toast.error(error.response?.data?.message || 'Failed to update profile');
          throw error;
        }
      },

      loadUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        set({ isLoading: true });
        try {
          const user = await authAPI.getProfile();
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          localStorage.removeItem('token');
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
);