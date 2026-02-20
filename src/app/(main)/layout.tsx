import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/todo", label: "Todo" },
];

export default function MainGroupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <div className="app-shell-inner">
        <aside className="app-sidebar" aria-label="Main navigation">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Planora
          </h2>
          <nav className="mt-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="page-wrap">{children}</main>
      </div>
    </div>
  );
}
