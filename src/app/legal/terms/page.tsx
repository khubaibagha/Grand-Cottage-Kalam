import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata = {
  title: "Terms of Use | Grand Cottages Kalam",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 bg-mist/30 pt-20">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <h1 className="font-heading text-3xl text-ink">Terms of Use</h1>
          <div className="mt-8 space-y-8 rounded-2xl bg-white p-6 text-sm text-stone shadow-sm ring-1 ring-mist sm:p-10">
            <section>
              <h2 className="font-heading text-lg text-ink">Using this site</h2>
              <p className="mt-2">
                This website is provided to help you browse cottages, check
                availability, and make bookings with Grand Cottages Kalam. By
                using it, you agree to provide accurate information when
                booking or contacting us.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-ink">Pricing & availability</h2>
              <p className="mt-2">
                Rates shown are per night, in Pakistani Rupees, and may vary by
                season. We make reasonable efforts to keep availability
                accurate, but a booking is only guaranteed once confirmed and
                the advance payment is received.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-ink">Property use</h2>
              <p className="mt-2">
                Guests are responsible for the condition of the cottage during
                their stay. Any damage beyond normal wear will be charged at
                cost. Maximum occupancy per cottage must be respected.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-ink">Liability</h2>
              <p className="mt-2">
                Grand Cottages Kalam is not liable for personal injury,
                weather-related travel disruption, or loss of personal
                belongings during your stay, except where required by law.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-ink">Contact</h2>
              <p className="mt-2">
                Questions about these terms can be sent through our{" "}
                <Link href="/contact" className="text-river underline">
                  Contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
