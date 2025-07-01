import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthPage } from './components/auth/AuthPage';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { SettingsPage } from './components/settings/SettingsPage';
import { useAuthStore } from './stores/authStore';
import { useAppStore } from './stores/appStore';
import { useTaskStore } from './stores/taskStore';

function App() {
  const { isAuthenticated, isLoading, loadUser } = useAuthStore();
  const { theme } = useAppStore();
  const { fetchTasks, fetchCategories } = useTaskStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
      fetchCategories();
    }
  }, [isAuthenticated, fetchTasks, fetchCategories]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <AuthPage />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="flex h-screen">
          <Sidebar />
          
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            
            <main className="flex-1 overflow-hidden">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<div className="p-6">Dashboard Coming Soon</div>} />
                <Route path="/tasks" element={<div className="p-6">Tasks Coming Soon</div>} />
                <Route path="/calendar" element={<div className="p-6">Calendar Coming Soon</div>} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </div>
        
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;