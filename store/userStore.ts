import { create } from "zustand";
import { User } from "@/types";

interface UsersState {
  users: User[];
  searchQuery: string;
  setUsers: (users: User[]) => void;
  setSearchQuery: (query: string) => void;
  getFilteredUsers: () => User[];
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  searchQuery: "",

  setUsers: (users: User[]) => set({ users }),

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  getFilteredUsers: () => {
    const { users, searchQuery } = get();
    const q = searchQuery.toLowerCase().trim();
    if (!q) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q),
    );
  },
}));
