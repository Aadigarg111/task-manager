export interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
  };
  taskDisplay: {
    defaultView: 'list' | 'grid' | 'calendar';
    sortBy: 'dueDate' | 'priority' | 'created' | 'alphabetical';
    groupBy: 'none' | 'priority' | 'category' | 'status';
  };
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  labels: string[];
  dueDate?: Date;
  reminderDate?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  color: string;
  icon: string;
  userId: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface TaskState {
  tasks: Task[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  filters: {
    status: string[];
    priority: string[];
    category: string[];
    search: string;
  };
}

export interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  currentView: 'dashboard' | 'tasks' | 'calendar' | 'settings';
}