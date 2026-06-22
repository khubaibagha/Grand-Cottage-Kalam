import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BedDouble,
  Check,
  Maximize,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { RoomGallery } from "@/components/cottages/room-gallery";
import { RoomTypeCard } from "@/components/cottages/room-type-card";
import { Button } from "@/components/ui/button";
import { getRoomTypeBySlug, getRoomTypes } from "@/lib/data";
import { formatPKR } from "@/lib/format";

export async function generateStaticParams() {
  const roomTypes = await getRoomTypes();
  return roomTypes.map((r) => ({ slug: r.slug }));
}

export default async function RoomTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [roomType, allRoomTypes] = await Promise.all([
    getRoomTypeBySlug(slug),
    getRoomTypes(),
  ]);

  if (!roomType) notFound();

  const otherRooms = allRoomTypes.filter((r) => r.id !== roomType.id);

  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 pt-20">
        <section className="px-5 py-12 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/cottages"
              className="text-sm font-medium text-river hover:text-river-bright"
            >
              &larr; All cottages
            </Link>

            <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
              <div>
                <RoomGallery images={roomType.images} name={roomType.name} />

                <div className="mt-10">
                  <p className="text-xs uppercase tracking-[0.2em] text-river">
                    {roomType.tagline}
                  </p>
                  <h1 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
                    {roomType.name}
                  </h1>

                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone">
                    <span className="flex items-center gap-2">
                      <Users className="size-4 text-river" />
                      {roomType.occupancy.min}-{roomType.occupancy.max} guests
                    </span>
                    <span className="flex items-center gap-2">
                      <BedDouble className="size-4 text-river" />
                      {roomType.beds}
                    </span>
                    <span className="flex items-center gap-2">
                      <Maximize className="size-4 text-river" />
                      {roomType.sizeSqft} sqft
                    </span>
                  </div>

                  <p className="mt-6 text-base leading-relaxed text-stone">
                    {roomType.longDescription}
                  </p>

                  <h2 className="mt-10 font-heading text-xl text-ink">
                    What&apos;s included
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {roomType.amenities.map((a) => (
                      <div key={a} className="flex items-center gap-2.5 text-sm text-stone">
                        <Check className="size-4 shrink-0 text-river" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-mist">
                  <p className="font-heading text-3xl text-ink">
                    {formatPKR(roomType.pricePerNight)}
                    <span className="text-sm font-normal text-stone">
                      {" "}
                      / night
                    </span>
                  </p>
                  <p className="mt-1.5 text-sm text-stone">
                    {roomType.totalUnits} units on the property &middot; 30%
                    advance to confirm
                  </p>

                  <Button
                    asChild
                    size="lg"
                    className="mt-6 h-auto w-full rounded-xl bg-amber px-6 py-3 text-base text-white hover:bg-amber/90"
                  >
                    <Link href={`/book?room=${roomType.slug}`}>
                      Book This Cottage <ArrowRight className="size-4" />
                    </Link>
                  </Button>

                  <p className="mt-4 text-center text-xs text-stone">
                    No payment taken yet &mdash; you&apos;ll choose dates next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-mist/40 px-5 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-heading text-2xl text-ink sm:text-3xl">
              Other cottages
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {otherRooms.map((r) => (
                <RoomTypeCard key={r.id} roomType={r} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
