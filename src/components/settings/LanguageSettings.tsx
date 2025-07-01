import React from 'react';
import { useAuthStore } from '../../stores/authStore';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export const LanguageSettings: React.FC = () => {
  const { user, updateProfile } = useAuthStore();

  const handleLanguageChange = async (languageCode: string) => {
    if (!user) return;
    
    const updatedPreferences = {
      ...user.preferences,
      language: languageCode,
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
        Language Settings
      </h3>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Choose your language
        </h4>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Select your preferred language for the interface
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                user?.preferences.language === language.code
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span className="text-2xl">{language.flag}</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {language.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};