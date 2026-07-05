import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { AmbientVideo } from "@/components/site/ambient-video";
import { FieldNote } from "@/components/site/field-note";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/reveal";

export const metadata = {
  title: "Explore Kalam | Grand Cottages Kalam",
};

const SPOTS = [
  {
    name: "Mahodand Lake",
    distance: "38 km · 2 hr drive",
    description:
      "The turquoise jewel of the Ushu Valley, ringed by pine forest and snowfields. Best reached by jeep from Kalam Bazaar.",
  },
  {
    name: "Ushu Forest",
    distance: "12 km · 25 min drive",
    description:
      "A dense pine forest along the Ushu River, popular for short hikes, picnics, and trout fishing spots.",
  },
  {
    name: "Kalam Bazaar",
    distance: "3 km · 10 min drive",
    description:
      "The main town market for local handicrafts, dry fruit, and a riverside food walk at dusk.",
  },
  {
    name: "Matiltan & Gabin Jabba",
    distance: "25 km · 1.5 hr drive",
    description:
      "Alpine meadows and the trailhead for Mankial Peak, with sweeping views back down the Swat Valley.",
  },
  {
    name: "Kundol Lake",
    distance: "45 km · jeep + short hike",
    description:
      "A quieter, less-visited alpine lake beyond Mahodand — recommended for an early morning departure.",
  },
  {
    name: "Daral Waterfall",
    distance: "30 km · 1.5 hr drive",
    description:
      "A dramatic seasonal waterfall on the way up from Bahrain, worth a stop for photos and tea stalls.",
  },
];

export default function ExploreKalamPage() {
  return (
    <>
      <SiteHeader variant="transparent" />
      <main className="flex-1">
        <section className="relative flex h-[60svh] min-h-[420px] items-end overflow-hidden bg-pine-deep">
          <Image
            src="/assets/images/exterior-snow-mountains.jpg"
            alt="Mountains surrounding the Kalam valley"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pine-deep/50 via-pine-deep/10 to-pine-deep/80" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8 lg:px-10">
            <p className="field-note text-[10px] text-river-bright sm:text-xs">
              Beyond the property
            </p>
            <h1 className="mt-5 font-heading text-4xl text-white sm:text-6xl">
              Explore Kalam
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Tucked into the upper Swat Valley, Kalam is the gateway to some
              of Pakistan&rsquo;s most striking alpine lakes, forests, and
              meadows — all within an easy drive of the cottages.
            </p>
          </div>
        </section>

        <section className="bg-cream px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <FieldNote label="Nearby to visit" />
            </Reveal>
            <RevealStagger className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {SPOTS.map((spot) => (
                <RevealItem
                  key={spot.name}
                  className="border-t border-ink/15 pt-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-heading text-xl text-ink">
                      {spot.name}
                    </h3>
                    <p className="field-note text-[9px] text-river">
                      {spot.distance}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-stone">
                    {spot.description}
                  </p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-cream px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <FieldNote label="From the valley floor" />
              <h2 className="mt-5 font-heading text-3xl text-ink sm:text-4xl">
                A look at the valley
              </h2>
            </Reveal>
            <RevealStagger className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-2">
              <RevealItem className="relative aspect-[9/16] overflow-hidden">
                <AmbientVideo
                  src="/assets/videos/forest.mp4"
                  className="absolute inset-0 h-full w-full"
                />
                <span className="field-note absolute inset-x-0 bottom-0 bg-gradient-to-t from-pine-deep/80 to-transparent px-4 pb-4 pt-10 text-[9px] text-white">
                  Ushu Forest
                </span>
              </RevealItem>
              <RevealItem className="relative aspect-[9/16] overflow-hidden">
                <AmbientVideo
                  src="/assets/videos/guest-clip-1.mp4"
                  className="absolute inset-0 h-full w-full"
                />
                <span className="field-note absolute inset-x-0 bottom-0 bg-gradient-to-t from-pine-deep/80 to-transparent px-4 pb-4 pt-10 text-[9px] text-white">
                  The Ushu River
                </span>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        <section className="bg-pine px-5 py-24 text-white sm:px-8 sm:py-28 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="field-note text-[10px] text-river-bright">
              When to come
            </p>
            <h2 className="mt-6 font-heading text-3xl sm:text-4xl">
              Best time to visit
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-base">
              Late April through October offers the clearest roads and mildest
              weather. July and August are peak season — book a few weeks
              ahead. Winter brings heavy snow and a quieter,
              fireplace-and-views kind of stay.
            </p>
            <Link
              href="/book"
              className="mt-9 inline-flex items-center bg-cream px-9 py-3.5 text-[13px] tracking-[0.08em] text-ink transition-colors duration-500 hover:bg-white"
            >
              Plan your stay
            </Link>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
