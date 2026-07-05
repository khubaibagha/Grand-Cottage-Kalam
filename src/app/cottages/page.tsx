import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { RoomTypeCard } from "@/components/cottages/room-type-card";
import { AmbientVideo } from "@/components/site/ambient-video";
import { FieldNote } from "@/components/site/field-note";
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
        <section className="relative flex h-[60svh] min-h-[420px] items-end overflow-hidden bg-pine-deep">
          <Image
            src="/assets/images/exterior-row-overcast-day.jpg"
            alt="Row of cottages at Grand Cottages Kalam"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pine-deep/50 via-pine-deep/10 to-pine-deep/80" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8 lg:px-10">
            <p className="field-note text-[10px] text-river-bright sm:text-xs">
              The cottages
            </p>
            <h1 className="mt-5 font-heading text-4xl text-white sm:text-6xl">
              Three ways to stay
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Three layouts, every one of them facing the valley.
            </p>
          </div>
        </section>

        <section className="bg-cream px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealStagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {roomTypes.map((roomType) => (
                <RevealItem key={roomType.id}>
                  <RoomTypeCard roomType={roomType} />
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-cream px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden">
              <AmbientVideo
                src="/assets/videos/interior-tour.mp4"
                poster="/assets/images/interior-bedroom.jpg"
                className="absolute inset-0 h-full w-full"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <FieldNote label="Interiors" />
              <h2 className="mt-5 font-heading text-3xl text-ink sm:text-4xl">
                Step inside
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
                Wood-panelled walls, working fireplaces, and proper heating —
                every cottage is built for the mountain weather, not just the
                view of it. Take a quick look around before you book.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-32 lg:px-10">
          <Image
            src="/assets/images/exterior-night-pathway.jpg"
            alt="Grand Cottages Kalam at night"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-pine-deep/70" />
          <Reveal className="relative z-10 mx-auto max-w-2xl text-center text-white">
            <p className="field-note text-[10px] text-river-bright">
              Not sure which fits?
            </p>
            <h2 className="mt-6 font-heading text-3xl sm:text-4xl">
              Tell us who&apos;s coming
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/70">
              Message us your group size and dates — we&apos;ll point you to
              the right cottage.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-flex items-center bg-cream px-9 py-3.5 text-[13px] tracking-[0.08em] text-ink transition-colors duration-500 hover:bg-white"
            >
              Ask us
            </Link>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
