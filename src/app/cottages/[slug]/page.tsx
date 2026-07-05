import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { RoomGallery } from "@/components/cottages/room-gallery";
import { RoomTypeCard } from "@/components/cottages/room-type-card";
import { FieldNote } from "@/components/site/field-note";
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
              className="field-note text-[10px] text-stone transition-colors hover:text-river"
            >
              &larr; All cottages
            </Link>

            <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr]">
              <div>
                <RoomGallery images={roomType.images} name={roomType.name} />

                <div className="mt-12">
                  <FieldNote label={roomType.tagline} />
                  <h1 className="mt-4 font-heading text-3xl text-ink sm:text-4xl">
                    {roomType.name}
                  </h1>

                  <div className="field-note mt-7 flex flex-wrap gap-x-5 gap-y-2 border-y border-ink/10 py-4 text-[10px] text-stone">
                    <span>
                      {roomType.occupancy.min}&ndash;{roomType.occupancy.max}{" "}
                      guests
                    </span>
                    <span aria-hidden className="text-ink/20">
                      /
                    </span>
                    <span>{roomType.beds}</span>
                    <span aria-hidden className="text-ink/20">
                      /
                    </span>
                    <span>{roomType.sizeSqft} sqft</span>
                  </div>

                  <p className="mt-7 max-w-2xl text-base leading-relaxed text-stone">
                    {roomType.longDescription}
                  </p>

                  <h2 className="mt-12 font-heading text-xl text-ink">
                    What&apos;s included
                  </h2>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {roomType.amenities.map((a) => (
                      <div
                        key={a}
                        className="flex items-center gap-3 text-sm text-stone"
                      >
                        <Check
                          className="size-3.5 shrink-0 text-river"
                          strokeWidth={2.5}
                        />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="border border-ink/15 bg-card p-7">
                  <p className="field-note text-[9px] text-stone">Rate</p>
                  <p className="price-figure mt-3 text-3xl text-ink">
                    {formatPKR(roomType.pricePerNight)}
                    <span className="text-sm text-stone"> / night</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-stone">
                    {roomType.totalUnits} units on the property &middot; 30%
                    advance to confirm
                  </p>

                  <Link
                    href={`/book?room=${roomType.slug}`}
                    className="mt-7 inline-flex w-full items-center justify-center bg-ink px-6 py-4 text-[13px] tracking-[0.08em] text-cream transition-colors duration-500 hover:bg-pine"
                  >
                    Reserve this cottage
                  </Link>

                  <p className="mt-5 text-center text-xs text-stone">
                    No payment taken yet &mdash; you&apos;ll choose dates next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-cream px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <FieldNote label="Other cottages" />
            <h2 className="mt-5 font-heading text-2xl text-ink sm:text-3xl">
              Also on the property
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
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
