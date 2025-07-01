import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState } from '../types';

interface AppStore extends AppState {
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  setCurrentView: (view: AppState['currentView']) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      sidebarOpen: false,
      currentView: 'dashboard',

      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setCurrentView: (currentView) => {
        set({ currentView });
      },
    }),
    {
      name: 'app-storage',
    }
  )
);