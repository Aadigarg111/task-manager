import React from 'react';
import {
  MagnifyingGlass,
  List,
  Sun,
  Moon,
  Bell,
  User,
} from '@phosphor-icons/react';
import { useAppStore } from '../../stores/appStore';
import { useAuthStore } from '../../stores/authStore';
import { useTaskStore } from '../../stores/taskStore';

export const Header: React.FC = () => {
  const { theme, setTheme, toggleSidebar } = useAppStore();
  const { user, logout } = useAuthStore();
  const { setFilters, filters } = useTaskStore();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between p-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <List className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Search */}
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="w-64 pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 pl-3 border-l border-gray-200 dark:border-gray-700">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
            <button
              onClick={logout}
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
            >
              <User className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};