import React from 'react';
import { useAuthStore } from '../../stores/authStore';

const timezones = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)' },
  { value: 'Europe/Moscow', label: 'Moscow Time (MSK)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
];

export const TimezoneSettings: React.FC = () => {
  const { user, updateProfile } = useAuthStore();

  const handleTimezoneChange = async (timezone: string) => {
    if (!user) return;
    
    const updatedPreferences = {
      ...user.preferences,
      timezone,
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
        Timezone Settings
      </h3>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Select your timezone
        </h4>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Choose your timezone to display dates and times correctly
        </p>

        <select
          value={user?.preferences.timezone || 'UTC'}
          onChange={(e) => handleTimezoneChange(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        >
          {timezones.map((timezone) => (
            <option key={timezone.value} value={timezone.value}>
              {timezone.label}
            </option>
          ))}
        </select>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Current time: {new Date().toLocaleString('en-US', {
              timeZone: user?.preferences.timezone || 'UTC',
              dateStyle: 'full',
              timeStyle: 'long',
            })}
          </p>
        </div>
      </div>
    </div>
  );
};