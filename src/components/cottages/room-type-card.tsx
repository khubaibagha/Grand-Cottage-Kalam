import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BedDouble, Maximize, Users } from "lucide-react";
import { formatPKR } from "@/lib/format";
import type { RoomType } from "@/lib/data";

export function RoomTypeCard({ roomType }: { roomType: RoomType }) {
  return (
    <Link
      href={`/cottages/${roomType.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-mist transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={roomType.heroImage}
          alt={roomType.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink">
          {formatPKR(roomType.pricePerNight)} / night
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-xl text-ink">{roomType.name}</h3>
          <ArrowUpRight className="size-5 shrink-0 text-stone transition-colors group-hover:text-river" />
        </div>
        <p className="mt-1.5 text-sm text-stone">{roomType.tagline}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone">
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5 text-river" />
            {roomType.occupancy.min}-{roomType.occupancy.max} guests
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="size-3.5 text-river" />
            {roomType.beds.split("(")[0].trim()}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="size-3.5 text-river" />
            {roomType.sizeSqft} sqft
          </span>
        </div>
      </div>
    </Link>
  );
}
