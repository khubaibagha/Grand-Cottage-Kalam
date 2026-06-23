"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { RevealStagger, revealItem } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

export type GalleryItem =
  | { type: "image"; src: string; alt: string; category: "Exterior" | "Interior" }
  | { type: "video"; src: string; poster?: string; alt: string; category: "Video" };

const TABS = ["All", "Exterior", "Interior", "Video"] as const;

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = React.useState<(typeof TABS)[number]>("All");
  const [active, setActive] = React.useState<GalleryItem | null>(null);

  const filtered =
    filter === "All" ? items : items.filter((item) => item.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
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
        {filtered.map((item) => (
          <motion.button
            key={item.src + item.alt}
            variants={revealItem}
            onClick={() => setActive(item)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl"
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                muted
                loop
                playsInline
                autoPlay
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
            {item.type === "video" && (
              <span className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/50 text-white">
                <Play className="size-3.5 fill-current" />
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.alt}
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
              {active.type === "video" ? (
                <video
                  src={active.src}
                  poster={active.poster}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  className="object-cover"
                />
              )}
              <button
                onClick={() => setActive(null)}
                aria-label={active.type === "video" ? "Close video" : "Close image"}
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
