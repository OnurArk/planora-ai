"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

type StoredUser = {
  id: string;
  email: string;
  name: string;
};

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, login } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) return;

    const rawUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!rawUser || !token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.replace("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(rawUser) as StoredUser;
      if (!parsedUser.id || !parsedUser.email || !parsedUser.name) {
        localStorage.removeItem("user");
        router.replace("/login");
        return;
      }

      login({
        user: parsedUser,
        token,
      });
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.replace("/login");
    }
  }, [isAuthenticated, login, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
