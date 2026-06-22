import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Banknote,
  CalendarCheck,
  Check,
  Clock,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { getBookingByRef } from "@/lib/data";
import { formatDateLong, formatPKR } from "@/lib/format";

const PAYMENT_LABELS: Record<string, string> = {
  card: "Credit / Debit Card",
  jazzcash: "JazzCash",
  easypaisa: "Easypaisa",
  bank_transfer: "Bank Transfer",
};

const PAYMENT_ICONS: Record<string, typeof CreditCard> = {
  card: CreditCard,
  jazzcash: Smartphone,
  easypaisa: Smartphone,
  bank_transfer: Banknote,
};

export const metadata = {
  title: "Booking Confirmed | Grand Cottages Kalam",
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const booking = ref ? await getBookingByRef(ref) : undefined;

  if (!booking) notFound();

  const isPendingVerification = booking.status === "awaiting_verification";
  const PaymentIcon = PAYMENT_ICONS[booking.paymentMethod];

  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 bg-mist/30 pt-20">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-mist sm:p-10">
            <div
              className={`mx-auto flex size-16 items-center justify-center rounded-full ${
                isPendingVerification ? "bg-amber/15" : "bg-moss/15"
              }`}
            >
              {isPendingVerification ? (
                <Clock className="size-8 text-amber" />
              ) : (
                <Check className="size-8 text-moss" />
              )}
            </div>

            <h1 className="mt-6 font-heading text-3xl text-ink">
              {isPendingVerification
                ? "Booking received — pending verification"
                : "Booking confirmed!"}
            </h1>
            <p className="mt-2 text-sm text-stone">
              {isPendingVerification
                ? "We're verifying your transfer proof. You'll get a confirmation shortly."
                : "A confirmation has been sent to your email."}
            </p>

            <div className="mt-8 rounded-xl bg-mist/40 px-5 py-4">
              <p className="text-xs uppercase tracking-wide text-stone">
                Booking reference
              </p>
              <p className="mt-1 font-heading text-2xl text-ink">
                {booking.ref}
              </p>
            </div>

            <div className="mt-8 space-y-3 text-left text-sm">
              <div className="flex items-center gap-3 border-b border-mist pb-3">
                <CalendarCheck className="size-4 shrink-0 text-river" />
                <div>
                  <p className="text-ink">{booking.roomTypeName}</p>
                  <p className="text-stone">
                    {formatDateLong(booking.checkIn)} –{" "}
                    {formatDateLong(booking.checkOut)} &middot;{" "}
                    {booking.nights}{" "}
                    {booking.nights === 1 ? "night" : "nights"} &middot;{" "}
                    {booking.guests}{" "}
                    {booking.guests === 1 ? "guest" : "guests"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-b border-mist pb-3">
                <PaymentIcon className="size-4 shrink-0 text-river" />
                <div>
                  <p className="text-ink">
                    {PAYMENT_LABELS[booking.paymentMethod]}
                  </p>
                  <p className="text-stone">
                    {isPendingVerification
                      ? "Awaiting verification of your proof"
                      : "Advance payment received"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-stone">Total</span>
                <span className="text-ink">{formatPKR(booking.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone">
                  Advance paid ({booking.advancePercent}%)
                </span>
                <span className="font-medium text-ink">
                  {formatPKR(booking.advanceAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone">Balance on arrival</span>
                <span className="text-ink">
                  {formatPKR(booking.balanceAmount)}
                </span>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="rounded-xl border border-mist px-6 py-3 text-sm font-medium text-ink hover:border-river/40"
              >
                Back to home
              </Link>
              <Link
                href="/cottages"
                className="rounded-xl bg-river px-6 py-3 text-sm font-medium text-white hover:bg-river/90"
              >
                Browse more cottages
              </Link>
            </div>
          </div>

          <div className="relative mt-8 aspect-[3/1] overflow-hidden rounded-2xl">
            <Image
              src="/assets/images/exterior-blue-sky-pathway.jpg"
              alt="Grand Cottages Kalam"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
