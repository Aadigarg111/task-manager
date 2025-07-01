import React from 'react';
import { useAuthStore } from '../../stores/authStore';

export const NotificationSettings: React.FC = () => {
  const { user, updateProfile } = useAuthStore();

  const handleToggle = async (key: string, value: boolean) => {
    if (!user) return;
    
    const updatedPreferences = {
      ...user.preferences,
      notifications: {
        ...user.preferences.notifications,
        [key]: value,
      },
    };

    try {
      await updateProfile({ preferences: updatedPreferences });
    } catch (error) {
      // Error is handled in the store
    }
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Notification Settings
      </h3>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                Email Notifications
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive notifications via email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user?.preferences.notifications.email || false}
                onChange={(e) => handleToggle('email', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                Push Notifications
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive push notifications in your browser
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user?.preferences.notifications.push || false}
                onChange={(e) => handleToggle('push', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                Task Reminders
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get reminded about upcoming tasks
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user?.preferences.notifications.reminders || false}
                onChange={(e) => handleToggle('reminders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};