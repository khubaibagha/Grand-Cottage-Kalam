"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        <AnimatePresence initial={false}>
          <motion.div
            key={images[active]}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${name} — photo ${active + 1}`}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <span className="field-note absolute bottom-3 right-3 bg-pine-deep/60 px-2.5 py-1.5 text-[9px] text-white backdrop-blur-sm">
          {active + 1} / {images.length}
        </span>
      </div>
      {images.length > 1 && (
        <div className="mt-2 grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              className={cn(
                "relative aspect-[4/3] overflow-hidden transition-opacity duration-300",
                active === i
                  ? "opacity-100 ring-1 ring-ink"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={src}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                sizes="15vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
