import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { getSettings } from "@/lib/data";

export const metadata = {
  title: "Book Your Stay | Grand Cottages Kalam",
};

export default async function BookPage() {
  const settings = await getSettings();

  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 bg-mist/30 pt-20">
        <Suspense
          fallback={
            <div className="flex items-center justify-center gap-2 py-32 text-stone">
              <Loader2 className="size-5 animate-spin" /> Loading booking
              form...
            </div>
          }
        >
          <BookingWizard settings={settings} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
