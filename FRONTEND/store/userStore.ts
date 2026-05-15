import { create } from 'zustand';
import { User } from '@/types/schema';

interface UserState {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: bigint, updatedUser: Partial<User>) => void;
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
  getUserById: (id) => get().users.find((user) => user.id === id),
}));