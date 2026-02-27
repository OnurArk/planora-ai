import type { ReactNode } from "react";
import GuestGuard from "@/app/views/components/auth/GuestGuard";

export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  return (
    <GuestGuard>
      <main className="auth-wrap">{children}</main>
    </GuestGuard>
  );
}
