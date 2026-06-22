"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { addDays, format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { CalendarIcon, Users, Search } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BookingWidget({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [range, setRange] = React.useState<DateRange | undefined>(undefined);
  const [guests, setGuests] = React.useState("2");
  const [open, setOpen] = React.useState(false);
  const isWideScreen = useMediaQuery("(min-width: 640px)");

  function handleSubmit() {
    const checkIn = range?.from ?? addDays(new Date(), 3);
    const checkOut = range?.to ?? addDays(checkIn, 2);
    const params = new URLSearchParams({
      checkIn: format(checkIn, "yyyy-MM-dd"),
      checkOut: format(checkOut, "yyyy-MM-dd"),
      guests,
    });
    router.push(`/book?${params.toString()}`);
  }

  return (
    <div
      className={`rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-black/5 sm:p-4 ${className}`}
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1.3fr_0.9fr_auto] sm:items-stretch sm:gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-3 rounded-xl border border-mist px-4 py-3 text-left transition-colors hover:border-river/40"
            >
              <CalendarIcon className="size-4 shrink-0 text-river" />
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wide text-stone">
                  Check-in &mdash; Check-out
                </p>
                <p className="truncate text-sm font-medium text-ink">
                  {range?.from && range?.to
                    ? `${format(range.from, "d MMM")} – ${format(range.to, "d MMM yyyy")}`
                    : "Add your dates"}
                </p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              numberOfMonths={isWideScreen ? 2 : 1}
              selected={range}
              onSelect={setRange}
              disabled={{ before: new Date() }}
              defaultMonth={new Date()}
              className="p-3"
            />
          </PopoverContent>
        </Popover>

        <Select value={guests} onValueChange={setGuests}>
          <SelectTrigger className="!h-auto w-full justify-start gap-3 rounded-xl border-mist !px-4 !py-3">
            <Users className="size-4 shrink-0 text-river" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n} {n === 1 ? "Guest" : "Guests"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleSubmit}
          size="lg"
          className="h-auto rounded-xl bg-amber px-6 py-3 text-base text-white hover:bg-amber/90"
        >
          <Search className="size-4" />
          Check Availability
        </Button>
      </div>
    </div>
  );
}
