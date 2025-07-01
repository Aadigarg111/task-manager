import React from 'react';
import { motion } from 'framer-motion';
import {
  House,
  CheckSquare,
  Calendar,
  Gear,
  Plus,
  X,
  Folder,
  Tag,
} from '@phosphor-icons/react';
import { useAppStore } from '../../stores/appStore';
import { useTaskStore } from '../../stores/taskStore';

export const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar, currentView, setCurrentView } = useAppStore();
  const { categories } = useTaskStore();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: House },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Gear },
  ];

  const handleMenuClick = (view: any) => {
    setCurrentView(view);
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: sidebarOpen ? 0 : -320 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                TaskFlow
              </h1>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {/* Navigation */}
            <nav className="space-y-2 mb-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Categories */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Categories
                </h3>
                <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Plus className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">New Task</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Folder className="h-4 w-4" />
                  <span className="text-sm">New Category</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm">Manage Labels</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};