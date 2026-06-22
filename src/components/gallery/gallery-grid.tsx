"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { RevealStagger, revealItem } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  src: string;
  alt: string;
  category: "Exterior" | "Interior";
}

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = React.useState<"All" | GalleryImage["category"]>("All");
  const [active, setActive] = React.useState<GalleryImage | null>(null);

  const filtered =
    filter === "All" ? images : images.filter((img) => img.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["All", "Exterior", "Interior"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === tab
                ? "bg-river text-white"
                : "bg-mist text-stone hover:bg-mist/70",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <RevealStagger
        key={filter}
        className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
      >
        {filtered.map((img) => (
          <motion.button
            key={img.src + img.alt}
            variants={revealItem}
            onClick={() => setActive(img)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {img.alt}
            </span>
          </motion.button>
        ))}
      </RevealStagger>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-3xl border-0 bg-transparent p-0 shadow-none"
        >
          <DialogTitle className="sr-only">{active?.alt}</DialogTitle>
          {active && (
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setActive(null)}
                aria-label="Close image"
                className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                <X className="size-4" />
              </button>
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4 text-sm text-white">
                {active.alt}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
