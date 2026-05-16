import { create } from 'zustand';
import { User } from '@/types/schema';

interface UserState {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: bigint, updatedUser: Partial<User>) => void;
  deleteUser: (id: bigint) => void;
  getUserById: (id: bigint) => User | undefined;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  getUserById: (id) => get().users.find((user) => user.id === id),
}));