"use client";

import * as React from "react";
import Link from "next/link";
import {
  BellRing,
  CalendarCheck,
  Loader2,
  MessageSquareText,
  ShieldAlert,
  Wallet,
} from "lucide-react";
import { getBookings, getInquiries, getRoomTypes } from "@/lib/data";
import type { Booking, Inquiry, RoomType } from "@/lib/data";
import { formatDateLong, formatPKR } from "@/lib/format";
import { BookingStatusBadge } from "@/components/admin/booking-status-badge";

export default function AdminOverviewPage() {
  const [loading, setLoading] = React.useState(true);
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [inquiries, setInquiries] = React.useState<Inquiry[]>([]);
  const [roomTypes, setRoomTypes] = React.useState<RoomType[]>([]);

  React.useEffect(() => {
    Promise.all([getBookings(), getInquiries(), getRoomTypes()]).then(
      ([b, i, r]) => {
        setBookings(b);
        setInquiries(i);
        setRoomTypes(r);
        setLoading(false);
      },
    );
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-32 text-stone">
        <Loader2 className="size-5 animate-spin" /> Loading dashboard...
      </div>
    );
  }

  const awaitingVerification = bookings.filter(
    (b) => b.status === "awaiting_verification",
  );
  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const newInquiries = inquiries.filter((i) => i.status === "new");
  const revenueThisYear = confirmed.reduce((acc, b) => acc + b.total, 0);

  const stats = [
    {
      label: "Awaiting verification",
      value: awaitingVerification.length,
      icon: ShieldAlert,
      tone: "bg-amber/15 text-amber",
      href: "/admin/bookings",
    },
    {
      label: "Confirmed bookings",
      value: confirmed.length,
      icon: CalendarCheck,
      tone: "bg-moss/15 text-moss",
      href: "/admin/bookings",
    },
    {
      label: "New inquiries",
      value: newInquiries.length,
      icon: MessageSquareText,
      tone: "bg-river/15 text-river",
      href: "/admin/inquiries",
    },
    {
      label: "Revenue (confirmed)",
      value: formatPKR(revenueThisYear),
      icon: Wallet,
      tone: "bg-ink/10 text-ink",
      href: "/admin/bookings",
    },
  ] as const;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl text-ink">Overview</h1>
        <p className="mt-1 text-sm text-stone">
          A snapshot of bookings, inquiries, and revenue across {roomTypes.length}{" "}
          cottage types.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, tone, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-mist transition-shadow hover:shadow-md"
          >
            <div className={`flex size-10 items-center justify-center rounded-full ${tone}`}>
              <Icon className="size-5" />
            </div>
            <p className="mt-4 font-heading text-2xl text-ink">{value}</p>
            <p className="text-sm text-stone">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mist">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg text-ink">Recent bookings</h2>
            <Link href="/admin/bookings" className="text-sm font-medium text-river">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {bookings.length === 0 && (
              <p className="text-sm text-stone">No bookings yet.</p>
            )}
            {bookings.slice(0, 5).map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between gap-3 border-b border-mist pb-3 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-ink">
                    {b.guestName} &middot; {b.roomTypeName}
                  </p>
                  <p className="text-xs text-stone">
                    {formatDateLong(b.checkIn)} &middot; {b.ref}
                  </p>
                </div>
                <BookingStatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mist">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg text-ink">New inquiries</h2>
            <Link href="/admin/inquiries" className="text-sm font-medium text-river">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {newInquiries.length === 0 && (
              <p className="text-sm text-stone">No new inquiries.</p>
            )}
            {newInquiries.slice(0, 5).map((i) => (
              <div
                key={i.id}
                className="flex items-start gap-3 border-b border-mist pb-3 last:border-0 last:pb-0"
              >
                <BellRing className="mt-0.5 size-4 shrink-0 text-amber" />
                <div className="min-w-0">
                  <p className="truncate text-sm text-ink">{i.name}</p>
                  <p className="truncate text-xs text-stone">{i.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
