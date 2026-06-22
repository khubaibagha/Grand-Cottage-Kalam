import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Flame,
  Mountain as MountainIcon,
  ShieldCheck,
  Trees,
  Utensils,
  Wifi,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { BookingWidget } from "@/components/home/booking-widget";
import { RoomTypeCard } from "@/components/cottages/room-type-card";
import { StarRating } from "@/components/site/star-rating";
import { Button } from "@/components/ui/button";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/reveal";
import { getRoomTypes, getReviews, getSettings } from "@/lib/data";
import { formatDateLong } from "@/lib/format";

const AMENITIES = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Flame, label: "Bonfire on request" },
  { icon: Utensils, label: "In-house meals" },
  { icon: MountainIcon, label: "Valley views" },
  { icon: ShieldCheck, label: "24/7 staff on-site" },
  { icon: Trees, label: "Forest trails nearby" },
];

const WHY_FEATURES = [
  {
    title: "Right on the valley",
    text: "Every cottage looks straight out at the ridge line — no concrete blocking the view, no city noise underneath it.",
  },
  {
    title: "Built for the cold",
    text: "Heated rooms, hot water around the clock, and wood cladding that actually keeps Kalam's nights comfortable.",
  },
  {
    title: "A team that's actually here",
    text: "Staff live on-site year-round — bonfire wood, jeep arrangements, and breakfast happen without three phone calls first.",
  },
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

  return (
    <>
      <SiteHeader variant="transparent" />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex h-[100vh] min-h-[640px] items-center justify-center overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/images/exterior-blue-sky-pathway.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/assets/videos/resort-reel-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/40" />

          <div className="relative z-10 flex w-full flex-col items-center px-5 text-center text-white">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-amber sm:text-sm">
              Kalam &middot; Swat &middot; Pakistan
            </p>
            <h1 className="max-w-3xl font-heading text-4xl leading-tight sm:text-6xl lg:text-7xl">
              Mountain cottages on the edge of the Swat valley
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
              Wood-clad rooms, private porches, and a ridge line view from
              every window. Three cottage types, one quiet stretch of Kalam.
            </p>

            <div className="mt-10 w-full max-w-3xl">
              <BookingWidget />
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-cream px-5 py-20 sm:px-8 lg:px-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-river">
              Welcome to Grand Cottages Kalam
            </p>
            <h2 className="mt-3 font-heading text-3xl text-ink sm:text-4xl">
              A quiet stretch of Kalam, built around the view
            </h2>
            <p className="mt-5 text-base leading-relaxed text-stone">
              Set along a row of pine-shuttered cottages facing the Swat
              valley, Grand Cottages Kalam was built for travellers who came
              for the mountains and would rather not leave them at the door.
              Private porches, warm wood interiors, and staff who live here
              year-round — it&apos;s a small property, run properly.
            </p>
          </Reveal>
        </section>

        {/* Featured cottages */}
        <section className="bg-mist/40 px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-river">
                  Stay
                </p>
                <h2 className="mt-3 font-heading text-3xl text-ink sm:text-4xl">
                  Three cottage types
                </h2>
              </div>
              <Link
                href="/cottages"
                className="flex items-center gap-1.5 text-sm font-medium text-river hover:text-river-bright"
              >
                View all cottages <ArrowRight className="size-4" />
              </Link>
            </Reveal>

            <RevealStagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {roomTypes.map((roomType) => (
                <RevealItem key={roomType.id}>
                  <RoomTypeCard roomType={roomType} />
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* Amenities strip */}
        <section className="bg-pine px-5 py-12 sm:px-8 lg:px-10">
          <RevealStagger className="mx-auto grid max-w-7xl grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {AMENITIES.map(({ icon: Icon, label }) => (
              <RevealItem
                key={label}
                className="flex flex-col items-center gap-2.5 text-center"
              >
                <Icon className="size-6 text-amber" strokeWidth={1.5} />
                <p className="text-xs text-white/80 sm:text-sm">{label}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </section>

        {/* Why Grand Cottages */}
        <section className="px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-river">
                Why Grand Cottages
              </p>
              <h2 className="mt-3 font-heading text-3xl text-ink sm:text-4xl">
                What guests actually notice
              </h2>
            </Reveal>

            <RevealStagger className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {WHY_FEATURES.map((f, i) => (
                <RevealItem
                  key={f.title}
                  className="text-center sm:text-left"
                >
                  <span className="font-heading text-4xl text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-heading text-xl text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">
                    {f.text}
                  </p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* Gallery teaser */}
        <section className="bg-mist/40 px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-river">
                  Gallery
                </p>
                <h2 className="mt-3 font-heading text-3xl text-ink sm:text-4xl">
                  A look around the property
                </h2>
              </div>
              <Link
                href="/gallery"
                className="flex items-center gap-1.5 text-sm font-medium text-river hover:text-river-bright"
              >
                Full gallery <ArrowRight className="size-4" />
              </Link>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {GALLERY_TEASER.map((src, i) => (
                <Link
                  key={src}
                  href="/gallery"
                  className={`relative block aspect-square overflow-hidden rounded-xl ${
                    i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : ""
                  }`}
                >
                  <Image
                    src={src}
                    alt="Grand Cottages Kalam"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Kalam teaser */}
        <section className="px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/assets/images/exterior-snow-mountains.jpg"
                alt="Mountains around Kalam"
                fill
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xs uppercase tracking-[0.2em] text-river">
                Beyond the property
              </p>
              <h2 className="mt-3 font-heading text-3xl text-ink sm:text-4xl">
                Explore Kalam
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone">
                Mahodand Lake, the Ushu forest trails, and Kalam&apos;s own
                bazaar are all within a short drive. We help arrange jeeps and
                guides for guests who want to see more of the valley than
                just the view from the porch.
              </p>
              <Button asChild className="mt-6 bg-river hover:bg-river/90">
                <Link href="/explore-kalam">
                  See what&apos;s nearby <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-pine px-5 py-20 text-white sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-amber">
                Guest reviews
              </p>
              <div className="mt-3 flex items-center justify-center gap-3">
                <h2 className="font-heading text-4xl">{reviews.average}</h2>
                <div>
                  <StarRating rating={reviews.average} />
                  <p className="mt-1 text-sm text-white/70">
                    {reviews.count} reviews
                  </p>
                </div>
              </div>
            </Reveal>

            <RevealStagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {reviews.testimonials.map((t) => (
                <RevealItem
                  key={t.id}
                  className="rounded-2xl bg-pine-deep p-5 ring-1 ring-white/10"
                >
                  <StarRating rating={t.rating} />
                  <p className="mt-3 text-sm leading-relaxed text-white/85">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="mt-4 text-xs text-white/60">
                    {t.name} &middot; {t.location} &middot;{" "}
                    {formatDateLong(t.date)}
                  </p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* Location + map */}
        <section className="px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-river">
                Location
              </p>
              <h2 className="mt-3 font-heading text-3xl text-ink sm:text-4xl">
                Find us in Kalam
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone">
                {settings.address}
              </p>
              <div className="mt-6 space-y-2 text-sm text-stone">
                <p>Check-in from {settings.checkinTime}</p>
                <p>Check-out by {settings.checkoutTime}</p>
                <p>{settings.contactPhone}</p>
              </div>
              <Button asChild className="mt-6 bg-amber text-white hover:bg-amber/90">
                <a
                  href={`https://wa.me/${settings.contactWhatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message us on WhatsApp
                </a>
              </Button>
            </Reveal>
            <Reveal delay={0.1} className="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-mist">
              <iframe
                title="Grand Cottages Kalam location"
                src="https://www.google.com/maps?q=Kalam,Swat,Pakistan&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
              />
            </Reveal>
          </div>
        </section>

        {/* Instagram strip */}
        <section className="bg-mist/40 px-5 py-16 sm:px-8 lg:px-10">
          <Reveal className="mx-auto max-w-7xl text-center">
            <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-river">
              <Camera className="size-4" /> Follow along
            </p>
            <h2 className="mt-3 font-heading text-3xl text-ink sm:text-4xl">
              @grandcottageskalam
            </h2>
            <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {GALLERY_TEASER.map((src) => (
                <a
                  key={src}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={src}
                    alt="Instagram preview"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors group-hover:bg-ink/30">
                    <Camera className="size-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Footer CTA */}
        <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-10">
          <Image
            src="/assets/images/exterior-row-foggy-dusk-2.jpg"
            alt="Grand Cottages Kalam at dusk"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/60" />
          <Reveal className="relative z-10 mx-auto max-w-2xl text-center text-white">
            <h2 className="font-heading text-3xl sm:text-4xl">
              Ready to wake up to the valley?
            </h2>
            <p className="mt-3 text-white/80">
              Book directly and pay a 30% advance to lock in your cottage.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 h-auto rounded-xl bg-amber px-8 py-3 text-base text-white hover:bg-amber/90"
            >
              <Link href="/book">Book Your Stay</Link>
            </Button>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
