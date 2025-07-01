import { create } from 'zustand';
import { TaskState, Task, Category } from '../types';
import { tasksAPI, categoriesAPI } from '../lib/api';
import toast from 'react-hot-toast';

interface TaskStore extends TaskState {
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<Task, '_id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  createCategory: (category: Omit<Category, '_id' | 'userId'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  setFilters: (filters: Partial<TaskState['filters']>) => void;
  clearError: () => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  categories: [],
  isLoading: false,
  error: null,
  filters: {
    status: [],
    priority: [],
    category: [],
    search: '',
  },

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await tasksAPI.getTasks();
      set({ tasks, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch tasks', isLoading: false });
      toast.error('Failed to fetch tasks');
    }
  },

  createTask: async (taskData) => {
    try {
      const newTask = await tasksAPI.createTask(taskData);
      set((state) => ({ tasks: [...state.tasks, newTask] }));
      toast.success('Task created successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      throw error;
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const updatedTask = await tasksAPI.updateTask(id, taskData);
      set((state) => ({
        tasks: state.tasks.map((task) => (task._id === id ? updatedTask : task)),
      }));
      toast.success('Task updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await tasksAPI.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));
      toast.success('Task deleted successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await categoriesAPI.getCategories();
      set({ categories });
    } catch (error: any) {
      toast.error('Failed to fetch categories');
    }
  },

  createCategory: async (categoryData) => {
    try {
      const newCategory = await categoriesAPI.createCategory(categoryData);
      set((state) => ({ categories: [...state.categories, newCategory] }));
      toast.success('Category created successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create category');
      throw error;
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const updatedCategory = await categoriesAPI.updateCategory(id, categoryData);
      set((state) => ({
        categories: state.categories.map((cat) => (cat._id === id ? updatedCategory : cat)),
      }));
      toast.success('Category updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update category');
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      await categoriesAPI.deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== id),
      }));
      toast.success('Category deleted successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
      throw error;
    }
  },

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  clearError: () => {
    set({ error: null });
  },
}));