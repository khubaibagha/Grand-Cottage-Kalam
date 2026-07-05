import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { FieldNote } from "@/components/site/field-note";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/reveal";

export const metadata = {
  title: "About | Grand Cottages Kalam",
};

const VALUES = [
  {
    label: "Place",
    title: "Rooted in the valley",
    text: "Built into the hillside above Kalam, using local timber and stone so every cottage feels part of the landscape, not bolted onto it.",
  },
  {
    label: "Warmth",
    title: "Comfort, not just a view",
    text: "Working fireplaces, proper heating, and hot water year-round — the basics done right, even when it's snowing outside.",
  },
  {
    label: "People",
    title: "A team that's actually here",
    text: "Caretakers live on-site, so check-in, housekeeping, and anything you need is a short walk away — not a phone call to the city.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 pt-20">
        <section className="bg-cream px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <FieldNote label="Our story" />
              <h1 className="mt-5 font-heading text-3xl text-ink sm:text-4xl">
                It started with one cottage
              </h1>
              <p className="mt-6 text-base leading-relaxed text-stone">
                Grand Cottages Kalam started as a single family cottage built
                for weekend escapes from Lahore. Over time, neighbours and
                friends kept asking to rent it out when we weren&rsquo;t using
                it — eventually that turned into three cottages, a small
                caretaking team, and a proper booking desk.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone">
                We&rsquo;re still a small, family-run property. No big hotel
                chain, no call centre — just a team in Kalam who knows the
                valley, the weather, and exactly what a tired group of
                travellers needs after the drive up from Mingora.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/assets/images/exterior-row-overcast-day.jpg"
                alt="Grand Cottages Kalam, exterior row"
                fill
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-cream px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <FieldNote label="What we care about" />
            </Reveal>
            <RevealStagger className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {VALUES.map(({ label, title, text }) => (
                <RevealItem key={title} className="border-t border-ink/15 pt-6">
                  <p className="field-note text-[10px] text-river">{label}</p>
                  <h3 className="mt-4 font-heading text-xl text-ink">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone">
                    {text}
                  </p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-32 lg:px-10">
          <Image
            src="/assets/images/exterior-single-cottage-dusk.jpg"
            alt="A cottage at dusk"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-pine-deep/70" />
          <Reveal className="relative z-10 mx-auto max-w-2xl text-center text-white">
            <p className="field-note text-[10px] text-river-bright">
              See it yourself
            </p>
            <h2 className="mt-6 font-heading text-3xl sm:text-4xl">
              One quiet stretch of hillside
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/70">
              Three cottage types above the Ushu River, all facing the same
              view.
            </p>
            <Link
              href="/cottages"
              className="mt-9 inline-flex items-center bg-cream px-9 py-3.5 text-[13px] tracking-[0.08em] text-ink transition-colors duration-500 hover:bg-white"
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
