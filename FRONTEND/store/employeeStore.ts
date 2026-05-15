import { create } from 'zustand';
import { Employee, User } from '@/types/schema';

interface EmployeeState {
  employees: (Employee & { user?: User })[];
  loading: boolean;
  error: string | null;

  // Actions
  setEmployees: (employees: (Employee & { user?: User })[]) => void;
  addEmployee: (employee: Employee & { user?: User }) => void;
  updateEmployee: (id: bigint, employee: Partial<Employee & { user?: User }>) => void;
  deleteEmployee: (id: bigint) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: [],
  loading: false,
  error: null,

  setEmployees: (employees) => set({ employees }),

  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),

  updateEmployee: (id, updatedEmployee) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedEmployee } : emp
      ),
    })),

  deleteEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),
}));