import Image from "next/image";
import Link from "next/link";
import { formatPKR } from "@/lib/format";
import type { RoomType } from "@/lib/data";

export function RoomTypeCard({ roomType }: { roomType: RoomType }) {
  return (
    <Link
      href={`/cottages/${roomType.slug}`}
      className="group block border border-ink/10 bg-card transition-colors duration-500 hover:border-ink/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={roomType.heroImage}
          alt={roomType.name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-heading text-xl text-ink">{roomType.name}</h3>
          <p className="price-figure shrink-0 text-xs text-stone">
            {formatPKR(roomType.pricePerNight)}
            <span className="text-stone/60"> / night</span>
          </p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-stone">
          {roomType.tagline}
        </p>

        <div className="field-note mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-ink/10 pt-4 text-[9px] text-stone/80">
          <span>
            {roomType.occupancy.min}&ndash;{roomType.occupancy.max} guests
          </span>
          <span aria-hidden className="text-ink/20">
            /
          </span>
          <span>{roomType.beds.split("(")[0].trim()}</span>
          <span aria-hidden className="text-ink/20">
            /
          </span>
          <span>{roomType.sizeSqft} sqft</span>
        </div>
      </div>
    </Link>
  );
}
