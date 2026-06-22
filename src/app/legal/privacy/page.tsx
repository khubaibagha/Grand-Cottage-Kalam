import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata = {
  title: "Privacy Policy | Grand Cottages Kalam",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 bg-mist/30 pt-20">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <h1 className="font-heading text-3xl text-ink">Privacy Policy</h1>
          <div className="mt-8 space-y-8 rounded-2xl bg-white p-6 text-sm text-stone shadow-sm ring-1 ring-mist sm:p-10">
            <section>
              <h2 className="font-heading text-lg text-ink">Information we collect</h2>
              <p className="mt-2">
                When you make a booking or send an inquiry, we collect your
                name, phone number, email address, and any details you share
                about your stay (dates, guest count, special requests).
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-ink">How we use it</h2>
              <p className="mt-2">
                Your information is used to confirm reservations, coordinate
                check-in, send booking updates, and respond to inquiries. We
                don&rsquo;t sell or rent guest information to third parties.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-ink">Payment information</h2>
              <p className="mt-2">
                Card and mobile wallet payments are processed by the relevant
                payment provider — we don&rsquo;t store full card numbers on our
                own systems. Bank transfer proofs are kept only as long as
                needed to verify a booking.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-ink">Your choices</h2>
              <p className="mt-2">
                You can ask us to update or delete your contact details at any
                time by emailing us using the address on our Contact page.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
