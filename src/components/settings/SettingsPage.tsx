import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Palette,
  Bell,
  Shield,
  Globe,
  Clock,
  Eye,
} from '@phosphor-icons/react';
import { ProfileSettings } from './ProfileSettings';
import { ThemeSettings } from './ThemeSettings';
import { NotificationSettings } from './NotificationSettings';
import { SecuritySettings } from './SecuritySettings';
import { LanguageSettings } from './LanguageSettings';
import { TimezoneSettings } from './TimezoneSettings';
import { DisplaySettings } from './DisplaySettings';

const settingsCategories = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'language', label: 'Language', icon: Globe },
  { id: 'timezone', label: 'Timezone', icon: Clock },
  { id: 'display', label: 'Display', icon: Eye },
];

export const SettingsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('profile');

  const renderSettingsContent = () => {
    switch (activeCategory) {
      case 'profile':
        return <ProfileSettings />;
      case 'theme':
        return <ThemeSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'language':
        return <LanguageSettings />;
      case 'timezone':
        return <TimezoneSettings />;
      case 'display':
        return <DisplaySettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="flex h-full">
      {/* Settings Navigation */}
      <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Settings
        </h2>
        <nav className="space-y-2">
          {settingsCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <category.icon className="h-5 w-5" />
              <span>{category.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderSettingsContent()}
        </motion.div>
      </div>
    </div>
  );
};