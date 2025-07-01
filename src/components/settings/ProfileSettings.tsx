import React from 'react';
import { useForm } from 'react-hook-form';
import { Camera, User, EnvelopeSimple } from '@phosphor-icons/react';
import { useAuthStore } from '../../stores/authStore';

interface ProfileFormData {
  name: string;
  email: string;
}

export const ProfileSettings: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data);
    } catch (error) {
      // Error is handled in the store
    }
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Profile Settings
      </h3>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Avatar Section */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-900 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
              <Camera className="h-4 w-4 text-white" />
            </button>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              Profile Picture
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Upload a new avatar for your profile
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <EnvelopeSimple className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};