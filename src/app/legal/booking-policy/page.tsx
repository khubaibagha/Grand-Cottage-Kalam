import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { getSettings } from "@/lib/data";

export const metadata = {
  title: "Booking & Cancellation Policy | Grand Cottages Kalam",
};

export default async function BookingPolicyPage() {
  const settings = await getSettings();

  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 bg-mist/30 pt-20">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <h1 className="font-heading text-3xl text-ink">
            Booking & Cancellation Policy
          </h1>
          <div className="mt-8 space-y-8 rounded-2xl bg-white p-6 text-sm text-stone shadow-sm ring-1 ring-mist sm:p-10">
            <section>
              <h2 className="font-heading text-lg text-ink">Reservations</h2>
              <p className="mt-2">
                A booking is confirmed once a {settings.advancePercent}% advance
                payment is received. The remaining balance is settled in cash or
                via JazzCash/Easypaisa on arrival. Bank transfer payments are
                held as &ldquo;awaiting verification&rdquo; until our team
                confirms receipt, usually within a few hours.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-ink">Check-in & check-out</h2>
              <p className="mt-2">
                Check-in is from {settings.checkinTime} and check-out is by{" "}
                {settings.checkoutTime}. Early check-in or late check-out can
                usually be arranged on request, subject to availability.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-ink">Cancellations</h2>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>14+ days before check-in: full refund of the advance.</li>
                <li>7–13 days before check-in: 50% refund of the advance.</li>
                <li>Less than 7 days before check-in: advance is non-refundable.</li>
              </ul>
              <p className="mt-3">
                Date changes are free of charge once, subject to availability,
                if requested more than 7 days before check-in.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-ink">Group & long-stay bookings</h2>
              <p className="mt-2">
                For bookings of 3+ cottages or stays of 5+ nights, please contact
                us directly — we&rsquo;re usually able to offer better rates than
                what&rsquo;s shown in the booking flow.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
