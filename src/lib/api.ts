import axios from 'axios';
import { User, Task, Category } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
  
  updateProfile: async (data: Partial<User>) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },
  
  createTask: async (task: Omit<Task, '_id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post('/tasks', task);
    return response.data;
  },
  
  updateTask: async (id: string, task: Partial<Task>) => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },
  
  deleteTask: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

// Categories API
export const categoriesAPI = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  
  createCategory: async (category: Omit<Category, '_id' | 'userId'>) => {
    const response = await api.post('/categories', category);
    return response.data;
  },
  
  updateCategory: async (id: string, category: Partial<Category>) => {
    const response = await api.put(`/categories/${id}`, category);
    return response.data;
  },
  
  deleteCategory: async (id: string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};