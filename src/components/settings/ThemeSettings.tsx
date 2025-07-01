import React from 'react';
import { Sun, Moon, Monitor } from '@phosphor-icons/react';
import { useAppStore } from '../../stores/appStore';

export const ThemeSettings: React.FC = () => {
  const { theme, setTheme } = useAppStore();

  const themes = [
    {
      id: 'light',
      name: 'Light',
      description: 'Clean and bright interface',
      icon: Sun,
    },
    {
      id: 'dark',
      name: 'Dark',
      description: 'Easy on the eyes in low light',
      icon: Moon,
    },
    {
      id: 'system',
      name: 'System',
      description: 'Follows your system preference',
      icon: Monitor,
    },
  ];

  return (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Theme Settings
      </h3>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Choose your theme
        </h4>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Select the theme that best suits your preference
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id as any)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                theme === themeOption.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    theme === themeOption.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <themeOption.icon className="h-6 w-6" />
                </div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                  {themeOption.name}
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {themeOption.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};