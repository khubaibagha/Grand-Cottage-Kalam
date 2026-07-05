"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { format, addDays } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import type { DateRange } from "react-day-picker";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CalendarIcon,
  Check,
  CreditCard,
  Loader2,
  Smartphone,
  Upload,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Stepper } from "@/components/booking/stepper";
import { useMediaQuery } from "@/hooks/use-media-query";
import { checkAvailability, createBooking } from "@/lib/data";
import type { AvailabilityResult, PaymentMethod, Settings } from "@/lib/data";
import { cn } from "@/lib/utils";
import { formatPKR, nightsBetween } from "@/lib/format";

const STEPS = ["Dates", "Cottage", "Details", "Review", "Payment"];

const PAYMENT_OPTIONS: {
  value: PaymentMethod;
  label: string;
  icon: typeof CreditCard;
}[] = [
  { value: "card", label: "Credit / Debit Card", icon: CreditCard },
  { value: "jazzcash", label: "JazzCash", icon: Smartphone },
  { value: "easypaisa", label: "Easypaisa", icon: Smartphone },
  { value: "bank_transfer", label: "Bank Transfer", icon: Banknote },
];

export function BookingWizard({ settings }: { settings: Settings }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = React.useState(1);
  const [range, setRange] = React.useState<DateRange | undefined>(() => {
    const ci = searchParams.get("checkIn");
    const co = searchParams.get("checkOut");
    if (ci && co) {
      return { from: new Date(`${ci}T00:00:00`), to: new Date(`${co}T00:00:00`) };
    }
    return undefined;
  });
  const [guests, setGuests] = React.useState(searchParams.get("guests") ?? "2");
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const isWideScreen = useMediaQuery("(min-width: 640px)");

  const [availability, setAvailability] = React.useState<
    AvailabilityResult[] | null
  >(null);
  const [checkingAvailability, setCheckingAvailability] = React.useState(false);
  const [selectedRoomId, setSelectedRoomId] = React.useState<string | null>(
    null,
  );

  const [guestName, setGuestName] = React.useState("");
  const [guestPhone, setGuestPhone] = React.useState("");
  const [guestEmail, setGuestEmail] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod | null>(
    null,
  );
  const [proofImageName, setProofImageName] = React.useState<string>();
  const [cardNumber, setCardNumber] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const preselectedSlug = searchParams.get("room");

  async function runAvailabilityCheck() {
    if (!range?.from || !range?.to) return;
    setCheckingAvailability(true);
    setAvailability(null);
    try {
      const results = await checkAvailability({
        checkIn: format(range.from, "yyyy-MM-dd"),
        checkOut: format(range.to, "yyyy-MM-dd"),
        guests: Number(guests),
      });
      setAvailability(results);
      const preMatch = results.find(
        (r) => r.roomType.slug === preselectedSlug && r.available,
      );
      if (preMatch) setSelectedRoomId(preMatch.roomType.id);
    } finally {
      setCheckingAvailability(false);
    }
  }

  function goToStep(n: number) {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDatesContinue() {
    if (!range?.from || !range?.to) {
      toast.error("Please select your check-in and check-out dates.");
      return;
    }
    goToStep(2);
    void runAvailabilityCheck();
  }

  function handleRoomContinue() {
    if (!selectedRoomId) {
      toast.error("Please select a cottage to continue.");
      return;
    }
    goToStep(3);
  }

  function handleDetailsContinue() {
    if (!guestName.trim() || !guestPhone.trim() || !guestEmail.trim()) {
      toast.error("Please fill in your name, phone, and email.");
      return;
    }
    goToStep(4);
  }

  const selectedResult = availability?.find(
    (r) => r.roomType.id === selectedRoomId,
  );

  async function handlePayAndBook() {
    if (!paymentMethod) {
      toast.error("Please choose a payment method.");
      return;
    }
    if (paymentMethod === "bank_transfer" && !proofImageName) {
      toast.error("Please upload your transfer proof to continue.");
      return;
    }
    if (!selectedResult || !range?.from || !range?.to) return;

    setSubmitting(true);
    try {
      const booking = await createBooking({
        roomTypeId: selectedResult.roomType.id,
        checkIn: format(range.from, "yyyy-MM-dd"),
        checkOut: format(range.to, "yyyy-MM-dd"),
        guests: Number(guests),
        guestName,
        guestPhone,
        guestEmail,
        paymentMethod,
        proofImageName,
      });
      router.push(`/book/confirmation?ref=${booking.ref}`);
    } catch {
      toast.error("Something went wrong creating your booking. Please try again.");
      setSubmitting(false);
    }
  }

  const nights = range?.from && range?.to ? nightsBetween(
    format(range.from, "yyyy-MM-dd"),
    format(range.to, "yyyy-MM-dd"),
  ) : 0;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <Stepper steps={STEPS} current={step} />

      <div className="mt-10 overflow-hidden border border-ink/10 bg-card p-6 sm:p-8">
        <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key={1}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h2 className="font-heading text-2xl text-ink">
              When are you staying?
            </h2>
            <p className="mt-1.5 text-sm text-stone">
              Pick your dates and how many guests are coming.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-3 rounded-xl border border-ink/15 px-4 py-3 text-left transition-colors hover:border-river/40"
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
                    defaultMonth={range?.from ?? addDays(new Date(), 3)}
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>

              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="!h-auto w-full justify-start gap-3 rounded-md border-ink/20 !px-4 !py-3">
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
            </div>

            {nights > 0 && (
              <p className="mt-4 text-sm text-stone">
                {nights} {nights === 1 ? "night" : "nights"} &middot; {guests}{" "}
                {Number(guests) === 1 ? "guest" : "guests"}
              </p>
            )}

            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleDatesContinue}
                size="lg"
                className="h-auto rounded-xl bg-ink px-6 py-3 text-cream hover:bg-pine"
              >
                Check Availability <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key={2}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h2 className="font-heading text-2xl text-ink">
              Choose your cottage
            </h2>
            <p className="mt-1.5 text-sm text-stone">
              {range?.from && range?.to
                ? `${format(range.from, "d MMM")} – ${format(range.to, "d MMM yyyy")} · ${nights} ${nights === 1 ? "night" : "nights"}`
                : ""}
            </p>

            {checkingAvailability && (
              <div className="flex items-center justify-center gap-2 py-16 text-stone">
                <Loader2 className="size-5 animate-spin" />
                Checking availability...
              </div>
            )}

            {!checkingAvailability && availability && (
              <div className="mt-6 space-y-3">
                {availability.map((result) => {
                  const selected = selectedRoomId === result.roomType.id;
                  return (
                    <button
                      key={result.roomType.id}
                      type="button"
                      disabled={!result.available}
                      onClick={() => setSelectedRoomId(result.roomType.id)}
                      className={cn(
                        "flex w-full items-center gap-4 border p-3 text-left transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50",
                        selected
                          ? "border-ink bg-ink/[0.03]"
                          : "border-ink/15 hover:border-ink/40",
                      )}
                    >
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={result.roomType.heroImage}
                          alt={result.roomType.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-heading text-lg text-ink">
                            {result.roomType.name}
                          </p>
                          {selected && (
                            <Check className="size-5 shrink-0 text-ink" strokeWidth={2.5} />
                          )}
                        </div>
                        <p className="text-sm text-stone">
                          {result.roomType.occupancy.min}-
                          {result.roomType.occupancy.max} guests
                        </p>
                        <p className="mt-1 text-sm font-medium text-ink">
                          {formatPKR(result.ratePerNight)} / night &middot;{" "}
                          {formatPKR(result.totalPrice)} total
                        </p>
                        {!result.available ? (
                          <p className="mt-1 text-xs font-medium text-destructive">
                            Not available for these dates
                          </p>
                        ) : (
                          <p className="mt-1 text-xs text-moss">
                            {result.unitsLeft} unit
                            {result.unitsLeft === 1 ? "" : "s"} left
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={() => goToStep(1)}
                className="h-auto rounded-xl px-5 py-3"
              >
                <ArrowLeft className="size-4" /> Back
              </Button>
              <Button
                onClick={handleRoomContinue}
                size="lg"
                disabled={checkingAvailability}
                className="h-auto rounded-xl bg-ink px-6 py-3 text-cream hover:bg-pine"
              >
                Continue <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key={3}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h2 className="font-heading text-2xl text-ink">Your details</h2>
            <p className="mt-1.5 text-sm text-stone">
              We&apos;ll use this to confirm your booking.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="guestName">Full name</Label>
                <Input
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ahmed Raza"
                  className="mt-1.5 h-11 rounded-xl px-4"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="guestPhone">Phone number</Label>
                  <Input
                    id="guestPhone"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="mt-1.5 h-11 rounded-xl px-4"
                  />
                </div>
                <div>
                  <Label htmlFor="guestEmail">Email</Label>
                  <Input
                    id="guestEmail"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1.5 h-11 rounded-xl px-4"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything we should know — late arrival, bonfire request, etc."
                  className="mt-1.5 rounded-xl px-4 py-3"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={() => goToStep(2)}
                className="h-auto rounded-xl px-5 py-3"
              >
                <ArrowLeft className="size-4" /> Back
              </Button>
              <Button
                onClick={handleDetailsContinue}
                size="lg"
                className="h-auto rounded-xl bg-ink px-6 py-3 text-cream hover:bg-pine"
              >
                Review Booking <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 4 && selectedResult && range?.from && range?.to && (
          <motion.div
            key={4}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h2 className="font-heading text-2xl text-ink">
              Review your booking
            </h2>

            <div className="mt-6 overflow-hidden border border-ink/15">
              <div className="flex items-center gap-4 bg-mist/40 p-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={selectedResult.roomType.heroImage}
                    alt={selectedResult.roomType.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-heading text-lg text-ink">
                    {selectedResult.roomType.name}
                  </p>
                  <p className="text-sm text-stone">
                    {format(range.from, "d MMM")} –{" "}
                    {format(range.to, "d MMM yyyy")} &middot; {nights}{" "}
                    {nights === 1 ? "night" : "nights"} &middot; {guests}{" "}
                    {Number(guests) === 1 ? "guest" : "guests"}
                  </p>
                </div>
              </div>
              <div className="space-y-2 p-4 text-sm">
                <div className="flex justify-between text-stone">
                  <span>Guest</span>
                  <span className="text-ink">{guestName}</span>
                </div>
                <div className="flex justify-between text-stone">
                  <span>Phone</span>
                  <span className="text-ink">{guestPhone}</span>
                </div>
                <div className="flex justify-between text-stone">
                  <span>Email</span>
                  <span className="text-ink">{guestEmail}</span>
                </div>
                {notes && (
                  <div className="flex justify-between gap-4 text-stone">
                    <span>Notes</span>
                    <span className="text-right text-ink">{notes}</span>
                  </div>
                )}
                <div className="my-2 h-px bg-ink/10" />
                <div className="flex justify-between text-stone">
                  <span>
                    {formatPKR(selectedResult.ratePerNight)} &times; {nights}{" "}
                    {nights === 1 ? "night" : "nights"}
                  </span>
                  <span className="text-ink">
                    {formatPKR(selectedResult.totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-ink">
                  <span>
                    Advance due now ({settings.advancePercent}%)
                  </span>
                  <span>
                    {formatPKR(
                      Math.round(
                        (selectedResult.totalPrice * settings.advancePercent) /
                          100,
                      ),
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-stone">
                  <span>Balance on arrival</span>
                  <span>
                    {formatPKR(
                      selectedResult.totalPrice -
                        Math.round(
                          (selectedResult.totalPrice * settings.advancePercent) /
                            100,
                        ),
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={() => goToStep(3)}
                className="h-auto rounded-xl px-5 py-3"
              >
                <ArrowLeft className="size-4" /> Back
              </Button>
              <Button
                onClick={() => goToStep(5)}
                size="lg"
                className="h-auto rounded-xl bg-ink px-6 py-3 text-cream hover:bg-pine"
              >
                Continue to Payment <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 5 && selectedResult && (
          <motion.div
            key={5}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h2 className="font-heading text-2xl text-ink">
              Pay your advance
            </h2>
            <p className="mt-1.5 text-sm text-stone">
              {formatPKR(
                Math.round(
                  (selectedResult.totalPrice * settings.advancePercent) / 100,
                ),
              )}{" "}
              due now to confirm &middot; balance paid on arrival
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {PAYMENT_OPTIONS.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPaymentMethod(value)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors",
                    paymentMethod === value
                      ? "border-ink bg-ink/[0.03]"
                      : "border-ink/15 hover:border-ink/40",
                  )}
                >
                  <Icon className="size-5 text-river" />
                  <span className="text-xs font-medium text-ink">{label}</span>
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="mt-6 space-y-4 rounded-xl border border-ink/15 p-5">
                <div>
                  <Label>Card number</Label>
                  <Input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="mt-1.5 h-11 rounded-xl px-4"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Expiry</Label>
                    <Input
                      placeholder="MM/YY"
                      className="mt-1.5 h-11 rounded-xl px-4"
                    />
                  </div>
                  <div>
                    <Label>CVV</Label>
                    <Input
                      placeholder="123"
                      className="mt-1.5 h-11 rounded-xl px-4"
                    />
                  </div>
                </div>
                <p className="text-xs text-stone">
                  Demo only — this is a mock checkout. No card is charged.
                </p>
              </div>
            )}

            {(paymentMethod === "jazzcash" || paymentMethod === "easypaisa") && (
              <div className="mt-6 space-y-4 rounded-xl border border-ink/15 p-5">
                <div>
                  <Label>
                    {paymentMethod === "jazzcash" ? "JazzCash" : "Easypaisa"}{" "}
                    mobile number
                  </Label>
                  <Input
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="0345-1234567"
                    className="mt-1.5 h-11 rounded-xl px-4"
                  />
                </div>
                <p className="text-xs text-stone">
                  Demo only — you&apos;d normally receive a payment prompt on
                  this number.
                </p>
              </div>
            )}

            {paymentMethod === "bank_transfer" && (
              <div className="mt-6 space-y-4 rounded-xl border border-ink/15 p-5">
                <div className="space-y-1.5 text-sm">
                  <p className="text-stone">
                    Bank: <span className="text-ink">{settings.bankDetails.bankName}</span>
                  </p>
                  <p className="text-stone">
                    Account title:{" "}
                    <span className="text-ink">
                      {settings.bankDetails.accountTitle}
                    </span>
                  </p>
                  <p className="text-stone">
                    Account number:{" "}
                    <span className="text-ink">
                      {settings.bankDetails.accountNumber}
                    </span>
                  </p>
                  <p className="text-stone">
                    IBAN: <span className="text-ink">{settings.bankDetails.iban}</span>
                  </p>
                </div>

                <div>
                  <Label htmlFor="proof">Upload transfer proof</Label>
                  <label
                    htmlFor="proof"
                    className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-ink/25 px-4 py-3 text-sm text-stone hover:border-river/40"
                  >
                    <Upload className="size-4 text-river" />
                    {proofImageName ?? "Choose a screenshot or photo"}
                  </label>
                  <input
                    id="proof"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setProofImageName(e.target.files?.[0]?.name)
                    }
                  />
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={() => goToStep(4)}
                disabled={submitting}
                className="h-auto rounded-xl px-5 py-3"
              >
                <ArrowLeft className="size-4" /> Back
              </Button>
              <Button
                onClick={handlePayAndBook}
                size="lg"
                disabled={submitting}
                className="h-auto rounded-xl bg-ink px-6 py-3 text-cream hover:bg-pine"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Confirming...
                  </>
                ) : (
                  <>
                    Confirm Booking <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
