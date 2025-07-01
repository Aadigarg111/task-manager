import React from 'react';
import { useForm } from 'react-hook-form';
import { Lock, Shield } from '@phosphor-icons/react';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const SecuritySettings: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>();

  const newPassword = watch('newPassword');

  const onSubmit = async (data: PasswordFormData) => {
    // TODO: Implement password change
    console.log('Password change:', data);
    reset();
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Security Settings
      </h3>

      <div className="space-y-6">
        {/* Change Password */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                Change Password
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update your password to keep your account secure
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Password
              </label>
              <input
                {...register('currentPassword', {
                  required: 'Current password is required',
                })}
                type="password"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                placeholder="Enter current password"
              />
              {errors.currentPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <input
                {...register('newPassword', {
                  required: 'New password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type="password"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                {...register('confirmPassword', {
                  required: 'Please confirm your new password',
                  validate: (value) =>
                    value === newPassword || 'Passwords do not match',
                })}
                type="password"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};