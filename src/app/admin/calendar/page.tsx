"use client";

import * as React from "react";
import { toast } from "sonner";
import { CalendarRange, Loader2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { blockDates, getBlockedRanges, getRoomTypes, unblockRange } from "@/lib/data";
import type { BlockedRange, RoomType } from "@/lib/data";
import { formatDateLong } from "@/lib/format";

export default function AdminCalendarPage() {
  const [loading, setLoading] = React.useState(true);
  const [roomTypes, setRoomTypes] = React.useState<RoomType[]>([]);
  const [roomTypeId, setRoomTypeId] = React.useState<string>("");
  const [ranges, setRanges] = React.useState<BlockedRange[]>([]);
  const [range, setRange] = React.useState<DateRange | undefined>();
  const [reason, setReason] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    getRoomTypes().then((rooms) => {
      setRoomTypes(rooms);
      setRoomTypeId(rooms[0]?.id ?? "");
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (!roomTypeId) return;
    getBlockedRanges(roomTypeId).then(setRanges);
  }, [roomTypeId]);

  const blockedDates = React.useMemo(() => {
    const days: Date[] = [];
    for (const r of ranges) {
      const start = new Date(`${r.startDate}T00:00:00`);
      const end = new Date(`${r.endDate}T00:00:00`);
      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d));
      }
    }
    return days;
  }, [ranges]);

  async function handleBlock() {
    if (!range?.from || !range?.to) {
      toast.error("Select a date range to block.");
      return;
    }
    if (!reason.trim()) {
      toast.error("Add a reason (e.g. maintenance, owner stay).");
      return;
    }
    setSubmitting(true);
    try {
      const created = await blockDates({
        roomTypeId,
        startDate: format(range.from, "yyyy-MM-dd"),
        endDate: format(range.to, "yyyy-MM-dd"),
        reason: reason.trim(),
      });
      setRanges((prev) => [...prev, created]);
      setRange(undefined);
      setReason("");
      toast.success("Dates blocked.");
    } catch {
      toast.error("Could not block dates. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUnblock(id: string) {
    setRanges((prev) => prev.filter((r) => r.id !== id));
    try {
      await unblockRange(id);
      toast.success("Range unblocked.");
    } catch {
      toast.error("Could not unblock. Refresh and try again.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-32 text-stone">
        <Loader2 className="size-5 animate-spin" /> Loading calendar...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-ink">Calendar & Availability</h1>
        <p className="mt-1 text-sm text-stone">
          Block dates for maintenance or owner stays, per cottage.
        </p>
      </div>

      <div className="max-w-xs">
        <Label>Cottage</Label>
        <Select value={roomTypeId} onValueChange={setRoomTypeId}>
          <SelectTrigger className="mt-1.5 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roomTypes.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mist">
          <h2 className="font-heading text-lg text-ink">Block new dates</h2>
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            disabled={{ before: new Date() }}
            modifiers={{ blocked: blockedDates }}
            modifiersClassNames={{
              blocked: "bg-destructive/10 text-destructive rounded-md",
            }}
            className="mt-3 w-full"
          />
          <div className="mt-4 space-y-3">
            <div>
              <Label>Reason</Label>
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Maintenance, owner stay, etc."
                className="mt-1.5"
              />
            </div>
            <Button onClick={handleBlock} disabled={submitting} className="w-full">
              {submitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <CalendarRange className="size-4" />
              )}
              Block dates
            </Button>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mist">
          <h2 className="font-heading text-lg text-ink">Blocked ranges</h2>
          <div className="mt-4 space-y-3">
            {ranges.length === 0 && (
              <p className="text-sm text-stone">No blocked dates for this cottage.</p>
            )}
            {ranges.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between gap-3 rounded-lg bg-mist/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm text-ink">
                    {formatDateLong(r.startDate)} – {formatDateLong(r.endDate)}
                  </p>
                  <p className="text-xs text-stone">{r.reason}</p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Unblock ${formatDateLong(r.startDate)} to ${formatDateLong(r.endDate)}`}
                  className="size-8 text-destructive hover:bg-destructive/10"
                  onClick={() => handleUnblock(r.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
