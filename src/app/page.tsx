import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/home/hero";
import { RoomTypeCard } from "@/components/cottages/room-type-card";
import { StarRating } from "@/components/site/star-rating";
import { FieldNote } from "@/components/site/field-note";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/reveal";
import { getRoomTypes, getReviews, getSettings } from "@/lib/data";

const PROPERTY_NOTES = [
  {
    label: "View",
    title: "Right on the valley",
    text: "Every cottage looks straight out at the ridge line — no concrete blocking the view, no city noise underneath it.",
  },
  {
    label: "Warmth",
    title: "Built for the cold",
    text: "Heated rooms, hot water around the clock, and wood cladding that actually keeps Kalam's nights comfortable.",
  },
  {
    label: "People",
    title: "A team that's actually here",
    text: "Staff live on-site year-round — bonfire wood, jeep arrangements, and breakfast happen without three phone calls first.",
  },
];

const INVENTORY = [
  "Free Wi-Fi",
  "Heated rooms",
  "In-house meals",
  "Bonfire on request",
  "24/7 staff on-site",
  "Hot water, all hours",
  "Private porches",
  "Forest trails nearby",
];

const GALLERY_TEASER = [
  "/assets/images/exterior-row-foggy-dusk.jpg",
  "/assets/images/exterior-snow-mountains.jpg",
  "/assets/images/interior-bedroom.jpg",
  "/assets/images/exterior-night-pathway.jpg",
  "/assets/images/exterior-blue-sky-pathway-2.jpg",
  "/assets/images/exterior-row-overcast-day.jpg",
];

export default async function Home() {
  const [roomTypes, reviews, settings] = await Promise.all([
    getRoomTypes(),
    getReviews(),
    getSettings(),
  ]);

  const [featuredReview, ...restReviews] = reviews.testimonials;

  return (
    <>
      <SiteHeader variant="transparent" />
      <main className="flex-1">
        <Hero />

        {/* Intro */}
        <section className="bg-cream px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <FieldNote label="The property" coords="35.49° N · 72.58° E" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading text-3xl leading-snug text-ink sm:text-4xl lg:text-[2.75rem]">
                A row of pine-shuttered cottages facing the Swat valley —
                a small property, run properly.
              </h2>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-stone">
                Grand Cottages Kalam was built for travellers who came for the
                mountains and would rather not leave them at the door. Private
                porches, warm wood interiors, and staff who live here
                year-round.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Cottages */}
        <section className="border-t border-ink/10 bg-cream px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <FieldNote label="The cottages" />
                <h2 className="mt-5 font-heading text-3xl text-ink sm:text-4xl">
                  Three ways to stay
                </h2>
              </div>
              <Link
                href="/cottages"
                className="field-note group pb-1 text-[10px] text-ink transition-colors hover:text-river"
              >
                All cottages
                <span className="mt-1 block h-px w-full origin-left bg-ink/30 transition-transform duration-500 group-hover:scale-x-50" />
              </Link>
            </Reveal>

            <RevealStagger className="mt-12 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {roomTypes.map((roomType) => (
                <RevealItem key={roomType.id} className="mb-8 lg:mb-0">
                  <RoomTypeCard roomType={roomType} />
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* Property notes — dark band */}
        <section className="bg-pine px-5 py-24 text-white sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <FieldNote label="Field notes" tone="dark" />
              <h2 className="mt-5 max-w-2xl font-heading text-3xl sm:text-4xl">
                What guests actually notice
              </h2>
            </Reveal>

            <RevealStagger className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
              {PROPERTY_NOTES.map((note) => (
                <RevealItem
                  key={note.label}
                  className="border-t border-white/15 pt-6"
                >
                  <p className="field-note text-[10px] text-river-bright">
                    {note.label}
                  </p>
                  <h3 className="mt-4 font-heading text-xl">{note.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {note.text}
                  </p>
                </RevealItem>
              ))}
            </RevealStagger>

            <Reveal className="mt-16 border-t border-white/15 pt-8">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {INVENTORY.map((item) => (
                  <li
                    key={item}
                    className="field-note text-[10px] text-white/50"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Gallery teaser */}
        <section className="bg-cream px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <FieldNote label="The record" />
                <h2 className="mt-5 font-heading text-3xl text-ink sm:text-4xl">
                  A look around the property
                </h2>
              </div>
              <Link
                href="/gallery"
                className="field-note group pb-1 text-[10px] text-ink transition-colors hover:text-river"
              >
                Full gallery
                <span className="mt-1 block h-px w-full origin-left bg-ink/30 transition-transform duration-500 group-hover:scale-x-50" />
              </Link>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {GALLERY_TEASER.map((src, i) => (
                <Link
                  key={src}
                  href="/gallery"
                  className={`group relative block overflow-hidden ${
                    i === 0
                      ? "col-span-2 row-span-2 aspect-square sm:aspect-auto"
                      : "aspect-square"
                  }`}
                >
                  <Image
                    src={src}
                    alt="Grand Cottages Kalam"
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Kalam */}
        <section className="border-t border-ink/10 bg-cream px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/assets/images/exterior-snow-mountains.jpg"
                alt="Mountains around Kalam"
                fill
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <FieldNote label="Beyond the property" />
              <h2 className="mt-5 font-heading text-3xl text-ink sm:text-4xl">
                Explore Kalam
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
                Mahodand Lake, the Ushu forest trails, and Kalam&apos;s own
                bazaar are all within a short drive. We help arrange jeeps and
                guides for guests who want to see more of the valley than just
                the view from the porch.
              </p>
              <Link
                href="/explore-kalam"
                className="mt-9 inline-flex items-center border border-ink/25 px-7 py-3 text-[13px] tracking-[0.08em] text-ink transition-all duration-500 hover:border-ink hover:bg-ink hover:text-cream"
              >
                See what&apos;s nearby
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-pine px-5 py-24 text-white sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <FieldNote label="Guest log" tone="dark" />
                <h2 className="mt-5 font-heading text-3xl sm:text-4xl">
                  In their own words
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="price-figure text-2xl text-white">
                  {reviews.average}
                </span>
                <div>
                  <StarRating rating={reviews.average} />
                  <p className="field-note mt-1.5 text-[9px] text-white/50">
                    {reviews.count} reviews
                  </p>
                </div>
              </div>
            </Reveal>

            {featuredReview && (
              <Reveal className="mt-14 border-t border-white/15 pt-10">
                <blockquote className="max-w-4xl font-heading text-2xl leading-normal text-white/90 sm:text-3xl">
                  &ldquo;{featuredReview.text}&rdquo;
                </blockquote>
                <p className="field-note mt-6 text-[10px] text-white/50">
                  {featuredReview.name} &middot; {featuredReview.location}
                </p>
              </Reveal>
            )}

            <RevealStagger className="mt-14 grid grid-cols-1 gap-10 border-t border-white/15 pt-10 sm:grid-cols-3 sm:gap-8">
              {restReviews.slice(0, 3).map((t) => (
                <RevealItem key={t.id}>
                  <StarRating rating={t.rating} />
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="field-note mt-5 text-[9px] text-white/45">
                    {t.name} &middot; {t.location}
                  </p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* Location */}
        <section className="bg-cream px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
            <Reveal>
              <FieldNote label="Getting here" coords="35.49° N · 72.58° E" />
              <h2 className="mt-5 font-heading text-3xl text-ink sm:text-4xl">
                Find us in Kalam
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
                {settings.address}
              </p>
              <dl className="mt-10 max-w-md divide-y divide-ink/10 border-y border-ink/10 text-sm">
                <div className="flex justify-between gap-6 py-3.5">
                  <dt className="field-note self-center text-[9px] text-stone">
                    Check-in
                  </dt>
                  <dd className="text-ink">from {settings.checkinTime}</dd>
                </div>
                <div className="flex justify-between gap-6 py-3.5">
                  <dt className="field-note self-center text-[9px] text-stone">
                    Check-out
                  </dt>
                  <dd className="text-ink">by {settings.checkoutTime}</dd>
                </div>
                <div className="flex justify-between gap-6 py-3.5">
                  <dt className="field-note self-center text-[9px] text-stone">
                    Phone
                  </dt>
                  <dd className="price-figure text-sm text-ink">
                    {settings.contactPhone}
                  </dd>
                </div>
              </dl>
              <a
                href={`https://wa.me/${settings.contactWhatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center border border-ink/25 px-7 py-3 text-[13px] tracking-[0.08em] text-ink transition-all duration-500 hover:border-ink hover:bg-ink hover:text-cream"
              >
                Message us on WhatsApp
              </a>
            </Reveal>
            <Reveal
              delay={0.1}
              className="aspect-[4/3] overflow-hidden border border-ink/10 lg:aspect-auto"
            >
              <iframe
                title="Grand Cottages Kalam location"
                src="https://www.google.com/maps?q=Kalam,Swat,Pakistan&output=embed"
                className="h-full min-h-72 w-full border-0 grayscale-[35%]"
                loading="lazy"
              />
            </Reveal>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative overflow-hidden px-5 py-32 sm:px-8 sm:py-40 lg:px-10">
          <Image
            src="/assets/images/exterior-row-foggy-dusk-2.jpg"
            alt="Grand Cottages Kalam at dusk"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-pine-deep/70" />
          <Reveal className="relative z-10 mx-auto max-w-3xl text-center text-white">
            <p className="field-note text-[10px] text-river-bright">
              Reservations
            </p>
            <h2 className="mt-6 font-heading text-4xl leading-tight sm:text-5xl">
              Ready to wake up to the valley?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
              Book directly and pay a 30% advance to hold your cottage. The
              mountains handle the rest.
            </p>
            <Link
              href="/book"
              className="mt-10 inline-flex items-center bg-cream px-10 py-4 text-[13px] tracking-[0.08em] text-ink transition-colors duration-500 hover:bg-white"
            >
              Reserve your stay
            </Link>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
