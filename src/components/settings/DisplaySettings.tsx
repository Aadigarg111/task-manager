import React from 'react';
import { List, SquaresFour, Calendar } from '@phosphor-icons/react';
import { useAuthStore } from '../../stores/authStore';

export const DisplaySettings: React.FC = () => {
  const { user, updateProfile } = useAuthStore();

  const handleDisplayChange = async (key: string, value: any) => {
    if (!user) return;
    
    const updatedPreferences = {
      ...user.preferences,
      taskDisplay: {
        ...user.preferences.taskDisplay,
        [key]: value,
      },
    };

    try {
      await updateProfile({ preferences: updatedPreferences });
    } catch (error) {
      // Error is handled in the store
    }
  };

  const viewOptions = [
    { id: 'list', name: 'List View', icon: List },
    { id: 'grid', name: 'Grid View', icon: SquaresFour },
    { id: 'calendar', name: 'Calendar View', icon: Calendar },
  ];

  const sortOptions = [
    { id: 'dueDate', name: 'Due Date' },
    { id: 'priority', name: 'Priority' },
    { id: 'created', name: 'Date Created' },
    { id: 'alphabetical', name: 'Alphabetical' },
  ];

  const groupOptions = [
    { id: 'none', name: 'No Grouping' },
    { id: 'priority', name: 'By Priority' },
    { id: 'category', name: 'By Category' },
    { id: 'status', name: 'By Status' },
  ];

  return (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Display Settings
      </h3>

      <div className="space-y-6">
        {/* Default View */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Default View
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Choose how you want to view your tasks by default
          </p>
          
          <div className="grid grid-cols-3 gap-3">
            {viewOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleDisplayChange('defaultView', option.id)}
                className={`flex flex-col items-center p-4 rounded-lg border transition-all duration-200 ${
                  user?.preferences.taskDisplay.defaultView === option.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <option.icon className="h-6 w-6 mb-2 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {option.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Default Sort Order
          </h4>
          <select
            value={user?.preferences.taskDisplay.sortBy || 'dueDate'}
            onChange={(e) => handleDisplayChange('sortBy', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Group By */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Default Grouping
          </h4>
          <select
            value={user?.preferences.taskDisplay.groupBy || 'none'}
            onChange={(e) => handleDisplayChange('groupBy', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          >
            {groupOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};