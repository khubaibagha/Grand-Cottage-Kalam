import Image from "next/image";
import Link from "next/link";
import { Flame, Mountain, ShieldCheck, Trees } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/reveal";

export const metadata = {
  title: "About | Grand Cottages Kalam",
};

const VALUES = [
  {
    icon: Mountain,
    title: "Rooted in the valley",
    text: "Built into the hillside above Kalam, using local timber and stone so every cottage feels part of the landscape, not bolted onto it.",
  },
  {
    icon: Flame,
    title: "Comfort, not just a view",
    text: "Working fireplaces, proper heating, and hot water year-round — the basics done right, even when it's snowing outside.",
  },
  {
    icon: ShieldCheck,
    title: "A team that's actually here",
    text: "Caretakers live on-site, so check-in, housekeeping, and anything you need is a short walk away — not a phone call to the city.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 pt-20">
        <section className="px-5 py-16 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h1 className="font-heading text-3xl text-ink sm:text-4xl">
                Our story
              </h1>
              <p className="mt-4 text-stone">
                Grand Cottages Kalam started as a single family cottage built for
                weekend escapes from Lahore. Over time, neighbours and friends
                kept asking to rent it out when we weren&rsquo;t using it —
                eventually that turned into three cottages, a small caretaking
                team, and a proper booking desk.
              </p>
              <p className="mt-4 text-stone">
                We&rsquo;re still a small, family-run property. No big hotel
                chain, no call centre — just a team in Kalam who knows the
                valley, the weather, and exactly what a tired group of travellers
                needs after the drive up from Mingora.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/assets/images/exterior-row-overcast-day.jpg"
                alt="Grand Cottages Kalam, exterior row"
                fill
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        <section className="bg-mist/30 px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="font-heading text-2xl text-ink">What we care about</h2>
            </Reveal>
            <RevealStagger className="mt-8 grid gap-6 sm:grid-cols-3">
              {VALUES.map(({ icon: Icon, title, text }) => (
                <RevealItem
                  key={title}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mist"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-river/10 text-river">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg text-ink">{title}</h3>
                  <p className="mt-2 text-sm text-stone">{text}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl bg-pine px-6 py-10 text-center text-white sm:px-12">
            <Trees className="size-8 text-amber" />
            <h2 className="font-heading text-2xl">Come see it for yourself</h2>
            <p className="text-white/80">
              Three cottage types, one quiet stretch of hillside above the
              Ushu River.
            </p>
            <Link
              href="/cottages"
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-amber px-6 py-3 text-sm font-medium text-ink hover:bg-amber/90"
            >
              View the cottages
            </Link>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
