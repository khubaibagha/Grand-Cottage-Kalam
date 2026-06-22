"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function RoomGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = React.useState(0);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-mist">
        <Image
          src={images[active]}
          alt={`${name} — photo ${active + 1}`}
          fill
          priority
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-xl ring-2 transition-all",
                active === i
                  ? "ring-river"
                  : "ring-transparent opacity-80 hover:opacity-100",
              )}
            >
              <Image
                src={src}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
