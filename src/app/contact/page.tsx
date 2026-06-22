import { Mail, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ContactForm } from "@/components/contact/contact-form";
import { getSettings } from "@/lib/data";

export const metadata = {
  title: "Contact | Grand Cottages Kalam",
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 bg-mist/30 pt-20">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="max-w-2xl">
            <h1 className="font-heading text-3xl text-ink sm:text-4xl">
              Get in touch
            </h1>
            <p className="mt-3 text-stone">
              Questions about availability, group bookings, or the road up to
              Kalam? Send us a message or reach out directly.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mist">
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-river" />
                    <div>
                      <p className="text-ink">{settings.contactPhone}</p>
                      <p className="text-stone">Phone & WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-river" />
                    <div>
                      <p className="text-ink">{settings.contactEmail}</p>
                      <p className="text-stone">Email</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-river" />
                    <div>
                      <p className="text-ink">{settings.address}</p>
                      <p className="text-stone">Address</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-mist">
                <iframe
                  src="https://www.google.com/maps?q=Kalam,Swat,Pakistan&output=embed"
                  className="h-64 w-full border-0"
                  loading="lazy"
                  title="Grand Cottages Kalam location"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mist sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
