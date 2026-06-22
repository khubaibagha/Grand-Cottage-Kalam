import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { RoomTypeCard } from "@/components/cottages/room-type-card";
import { Button } from "@/components/ui/button";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/reveal";
import { getRoomTypes } from "@/lib/data";

export const metadata = {
  title: "Cottages | Grand Cottages Kalam",
};

export default async function CottagesPage() {
  const roomTypes = await getRoomTypes();

  return (
    <>
      <SiteHeader variant="transparent" />
      <main className="flex-1">
        <section className="relative flex h-[55vh] min-h-[420px] items-center justify-center overflow-hidden">
          <Image
            src="/assets/images/exterior-row-overcast-day.jpg"
            alt="Row of cottages at Grand Cottages Kalam"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/40" />
          <div className="relative z-10 px-5 text-center text-white">
            <p className="text-xs uppercase tracking-[0.25em] text-amber sm:text-sm">
              Stay
            </p>
            <h1 className="mt-4 font-heading text-4xl sm:text-6xl">
              Our Cottages
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Three layouts, every one of them facing the valley.
            </p>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {roomTypes.map((roomType) => (
                <RevealItem key={roomType.id}>
                  <RoomTypeCard roomType={roomType} />
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-10">
          <Image
            src="/assets/images/exterior-night-pathway.jpg"
            alt="Grand Cottages Kalam at night"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/65" />
          <Reveal className="relative z-10 mx-auto max-w-2xl text-center text-white">
            <h2 className="font-heading text-3xl sm:text-4xl">
              Not sure which cottage fits?
            </h2>
            <p className="mt-3 text-white/80">
              Message us your group size and dates — we&apos;ll point you to
              the right one.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 h-auto rounded-xl bg-amber px-8 py-3 text-base text-white hover:bg-amber/90"
            >
              <Link href="/contact">
                Ask us <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
