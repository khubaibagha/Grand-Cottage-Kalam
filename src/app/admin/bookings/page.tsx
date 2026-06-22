"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Banknote,
  Check,
  CreditCard,
  Eye,
  Loader2,
  Smartphone,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingStatusBadge } from "@/components/admin/booking-status-badge";
import { getBookings, updateBookingStatus } from "@/lib/data";
import type { Booking, BookingStatus } from "@/lib/data";
import { formatDateLong, formatPKR } from "@/lib/format";

const FILTERS: { value: BookingStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "awaiting_verification", label: "Awaiting Verification" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
];

const PAYMENT_ICONS = {
  card: CreditCard,
  jazzcash: Smartphone,
  easypaisa: Smartphone,
  bank_transfer: Banknote,
} as const;

export default function AdminBookingsPage() {
  const [loading, setLoading] = React.useState(true);
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [filter, setFilter] = React.useState<BookingStatus | "all">("all");
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [viewing, setViewing] = React.useState<Booking | null>(null);

  React.useEffect(() => {
    getBookings().then((data) => {
      setBookings(data);
      setLoading(false);
    });
  }, []);

  async function setStatus(booking: Booking, status: BookingStatus) {
    setUpdatingId(booking.id);
    try {
      const updated = await updateBookingStatus(booking.id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b)),
      );
      toast.success(
        status === "confirmed"
          ? `${booking.ref} confirmed`
          : `${booking.ref} marked ${status.replace("_", " ")}`,
      );
      setViewing((v) => (v && v.id === updated.id ? updated : v));
    } catch {
      toast.error("Could not update booking. Try again.");
    } finally {
      setUpdatingId(null);
    }
  }

  const visible =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-ink">Bookings</h1>
        <p className="mt-1 text-sm text-stone">
          Verify bank transfers and manage every reservation.
        </p>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as BookingStatus | "all")}>
        <TabsList className="flex-wrap">
          {FILTERS.map((f) => (
            <TabsTrigger key={f.value} value={f.value}>
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-mist">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-stone">
            <Loader2 className="size-5 animate-spin" /> Loading bookings...
          </div>
        ) : visible.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-stone">
            No bookings in this filter.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ref</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Cottage</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((b) => {
                const PaymentIcon = PAYMENT_ICONS[b.paymentMethod];
                const busy = updatingId === b.id;
                return (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium text-ink">
                      {b.ref}
                    </TableCell>
                    <TableCell>{b.guestName}</TableCell>
                    <TableCell>{b.roomTypeName}</TableCell>
                    <TableCell className="text-stone">
                      {formatDateLong(b.checkIn)} – {formatDateLong(b.checkOut)}
                    </TableCell>
                    <TableCell>{formatPKR(b.total)}</TableCell>
                    <TableCell>
                      <PaymentIcon className="size-4 text-river" />
                    </TableCell>
                    <TableCell>
                      <BookingStatusBadge status={b.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label={`View ${b.ref} details`}
                          className="size-8"
                          onClick={() => setViewing(b)}
                        >
                          <Eye className="size-4" />
                        </Button>
                        {(b.status === "awaiting_verification" ||
                          b.status === "pending") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`Confirm ${b.ref}`}
                            className="size-8 text-moss hover:bg-moss/10 hover:text-moss"
                            disabled={busy}
                            onClick={() => setStatus(b, "confirmed")}
                          >
                            {busy ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <Check className="size-4" />
                            )}
                          </Button>
                        )}
                        {b.status !== "cancelled" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`Cancel ${b.ref}`}
                            className="size-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            disabled={busy}
                            onClick={() => setStatus(b, "cancelled")}
                          >
                            <X className="size-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={!!viewing} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent className="max-w-lg">
          {viewing && (
            <>
              <DialogHeader>
                <DialogTitle>{viewing.ref}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone">Guest</span>
                  <span className="text-ink">{viewing.guestName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Phone</span>
                  <span className="text-ink">{viewing.guestPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Email</span>
                  <span className="text-ink">{viewing.guestEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Cottage</span>
                  <span className="text-ink">{viewing.roomTypeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Dates</span>
                  <span className="text-ink">
                    {formatDateLong(viewing.checkIn)} –{" "}
                    {formatDateLong(viewing.checkOut)} ({viewing.nights}{" "}
                    {viewing.nights === 1 ? "night" : "nights"})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Guests</span>
                  <span className="text-ink">{viewing.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Total</span>
                  <span className="text-ink">{formatPKR(viewing.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">
                    Advance ({viewing.advancePercent}%)
                  </span>
                  <span className="text-ink">
                    {formatPKR(viewing.advanceAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Balance</span>
                  <span className="text-ink">
                    {formatPKR(viewing.balanceAmount)}
                  </span>
                </div>
                {viewing.proofImageName && (
                  <div className="flex justify-between">
                    <span className="text-stone">Transfer proof</span>
                    <span className="text-ink">{viewing.proofImageName}</span>
                  </div>
                )}
                {viewing.notes && (
                  <div>
                    <span className="text-stone">Notes</span>
                    <p className="mt-1 rounded-lg bg-mist/40 p-3 text-ink">
                      {viewing.notes}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap justify-end gap-2 pt-2">
                {(viewing.status === "awaiting_verification" ||
                  viewing.status === "pending") && (
                  <Button onClick={() => setStatus(viewing, "confirmed")}>
                    Confirm booking
                  </Button>
                )}
                {viewing.status !== "cancelled" && (
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => setStatus(viewing, "cancelled")}
                  >
                    Cancel booking
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
