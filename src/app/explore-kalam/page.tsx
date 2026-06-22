import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/reveal";

export const metadata = {
  title: "Explore Kalam | Grand Cottages Kalam",
};

const SPOTS = [
  {
    name: "Mahodand Lake",
    distance: "~38 km / 2 hr drive",
    description:
      "The turquoise jewel of the Ushu Valley, ringed by pine forest and snowfields. Best reached by jeep from Kalam Bazaar.",
  },
  {
    name: "Ushu Forest",
    distance: "~12 km / 25 min drive",
    description:
      "A dense pine forest along the Ushu River, popular for short hikes, picnics, and trout fishing spots.",
  },
  {
    name: "Kalam Bazaar",
    distance: "~3 km / 10 min drive",
    description:
      "The main town market for local handicrafts, dry fruit, and a riverside food walk at dusk.",
  },
  {
    name: "Matiltan & Gabin Jabba",
    distance: "~25 km / 1.5 hr drive",
    description:
      "Alpine meadows and the trailhead for Mankial Peak, with sweeping views back down the Swat Valley.",
  },
  {
    name: "Kundol Lake",
    distance: "~45 km / jeep + short hike",
    description:
      "A quieter, less-visited alpine lake beyond Mahodand — recommended for an early morning departure.",
  },
  {
    name: "Daral Waterfall",
    distance: "~30 km / 1.5 hr drive",
    description:
      "A dramatic seasonal waterfall on the way up from Bahrain, worth a stop for photos and tea stalls.",
  },
];

export default function ExploreKalamPage() {
  return (
    <>
      <SiteHeader variant="transparent" />
      <main className="flex-1">
        <section className="relative flex h-[55vh] min-h-[420px] items-end">
          <Image
            src="/assets/images/exterior-snow-mountains.jpg"
            alt="Mountains surrounding the Kalam valley"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="relative mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8">
            <h1 className="font-heading text-3xl text-white sm:text-5xl">
              Explore Kalam
            </h1>
            <p className="mt-3 max-w-xl text-white/85">
              Tucked into the upper Swat Valley, Kalam is the gateway to some of
              Pakistan&rsquo;s most striking alpine lakes, forests, and meadows —
              all within an easy drive of the cottages.
            </p>
          </div>
        </section>

        <section className="bg-mist/30 px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="font-heading text-2xl text-ink">Nearby to visit</h2>
            </Reveal>
            <RevealStagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SPOTS.map((spot) => (
                <RevealItem
                  key={spot.name}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mist"
                >
                  <h3 className="font-heading text-lg text-ink">{spot.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-river">
                    <MapPin className="size-3.5" /> {spot.distance}
                  </p>
                  <p className="mt-3 text-sm text-stone">{spot.description}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8">
          <Reveal className="mx-auto max-w-3xl rounded-2xl bg-pine px-6 py-10 text-center text-white sm:px-12">
            <Clock className="mx-auto size-8 text-amber" />
            <h2 className="mt-4 font-heading text-2xl">Best time to visit</h2>
            <p className="mt-3 text-white/80">
              Late April through October offers the clearest roads and mildest
              weather. July and August are peak season — book a few weeks ahead.
              Winter brings heavy snow and a quieter, fireplace-and-views kind of
              stay.
            </p>
            <Link
              href="/book"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-amber px-6 py-3 text-sm font-medium text-ink hover:bg-amber/90"
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
