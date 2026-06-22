"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarRange,
  Home,
  LayoutDashboard,
  MessageSquare,
  Mountain,
  Settings as SettingsIcon,
  Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: Ticket },
  { href: "/admin/calendar", label: "Calendar", icon: CalendarRange },
  { href: "/admin/rooms", label: "Rooms & Pricing", icon: Mountain },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-mist/30">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-mist bg-white lg:flex">
        <div className="flex items-center gap-2 border-b border-mist px-6 py-5">
          <Mountain className="size-5 text-river" strokeWidth={1.75} />
          <div>
            <p className="font-heading text-base text-ink">GCK Admin</p>
            <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber">
              Demo
            </span>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-river/10 text-river"
                    : "text-stone hover:bg-mist/60 hover:text-ink",
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-mist p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone hover:bg-mist/60 hover:text-ink"
          >
            <Home className="size-4" />
            Back to site
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-mist bg-white px-5 py-4 lg:hidden">
          <div className="flex items-center gap-2">
            <Mountain className="size-5 text-river" strokeWidth={1.75} />
            <p className="font-heading text-base text-ink">GCK Admin</p>
          </div>
          <Link href="/" className="text-sm font-medium text-river">
            Back to site
          </Link>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-mist bg-white px-3 py-2 lg:hidden">
          {NAV.map(({ href, label }) => {
            const active =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  active ? "bg-river text-white" : "bg-mist text-stone",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <main className="flex-1 px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
