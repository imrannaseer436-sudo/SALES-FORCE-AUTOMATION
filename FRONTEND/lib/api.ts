// API Configuration and Endpoints

// Change this to your backend API URL
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Users
  users: {
    list: '/users',
    detail: (id: string | bigint) => `/users/${id}`,
    create: '/users',
    update: (id: string | bigint) => `/users/${id}`,
    delete: (id: string | bigint) => `/users/${id}`,
  },

  // Employees
  employees: {
    list: '/employees',
    detail: (id: string | bigint) => `/employees/${id}`,
    create: '/employees',
    update: (id: string | bigint) => `/employees/${id}`,
    delete: (id: string | bigint) => `/employees/${id}`,
    search: '/employees/search',
  },

  // Contacts
  contacts: {
    list: '/contacts',
    detail: (id: string | bigint) => `/contacts/${id}`,
    create: '/contacts',
    update: (id: string | bigint) => `/contacts/${id}`,
    delete: (id: string | bigint) => `/contacts/${id}`,
    search: '/contacts/search',
  },

  // Hierarchy/RSM-Employee relationships
  hierarchy: {
    list: '/rsm-employees',
    detail: (id: string | bigint) => `/rsm-employees/${id}`,
    create: '/rsm-employees',
    update: (id: string | bigint) => `/rsm-employees/${id}`,
    delete: (id: string | bigint) => `/rsm-employees/${id}`,
    getByRsm: (rsmId: string | bigint) => `/rsm-employees/rsm/${rsmId}`,
  },
};

// API Request/Response types for future use
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
