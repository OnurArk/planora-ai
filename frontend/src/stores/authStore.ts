import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthPayload {
  user: User;
  token: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: AuthPayload) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: ({ user, token }: AuthPayload) => {
    set({ user, token, isAuthenticated: true });
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  },
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
}));
