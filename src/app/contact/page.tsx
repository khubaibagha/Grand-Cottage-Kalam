import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ContactForm } from "@/components/contact/contact-form";
import { FieldNote } from "@/components/site/field-note";
import { getSettings } from "@/lib/data";

export const metadata = {
  title: "Contact | Grand Cottages Kalam",
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 bg-cream pt-20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="max-w-2xl">
            <FieldNote label="Contact" coords="35.49° N · 72.58° E" />
            <h1 className="mt-5 font-heading text-3xl text-ink sm:text-4xl">
              Get in touch
            </h1>
            <p className="mt-5 text-base leading-relaxed text-stone">
              Questions about availability, group bookings, or the road up to
              Kalam? Send us a message or reach out directly.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <dl className="divide-y divide-ink/10 border-y border-ink/10 text-sm">
                <div className="py-4">
                  <dt className="field-note text-[9px] text-stone">
                    Phone &amp; WhatsApp
                  </dt>
                  <dd className="price-figure mt-2 text-ink">
                    {settings.contactPhone}
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="field-note text-[9px] text-stone">Email</dt>
                  <dd className="mt-2 text-ink">{settings.contactEmail}</dd>
                </div>
                <div className="py-4">
                  <dt className="field-note text-[9px] text-stone">Address</dt>
                  <dd className="mt-2 leading-relaxed text-ink">
                    {settings.address}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 overflow-hidden border border-ink/10">
                <iframe
                  src="https://www.google.com/maps?q=Kalam,Swat,Pakistan&output=embed"
                  className="h-64 w-full border-0 grayscale-[35%]"
                  loading="lazy"
                  title="Grand Cottages Kalam location"
                />
              </div>
            </div>

            <div className="border border-ink/10 bg-card p-6 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
