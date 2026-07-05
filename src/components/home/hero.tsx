"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AmbientVideo } from "@/components/site/ambient-video";

const EASE = [0.16, 1, 0.3, 1] as const;

function HeroLine({
  children,
  delay,
  reduceMotion,
}: {
  children: React.ReactNode;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={reduceMotion ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduceMotion = !!useReducedMotion();

  return (
    <section className="relative flex h-svh min-h-[560px] flex-col overflow-hidden bg-pine-deep">
      <motion.div
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <AmbientVideo
          src="/assets/videos/hero.mp4"
          poster="/assets/images/exterior-row-foggy-dusk.jpg"
          priority
          className="h-full w-full"
        />
      </motion.div>

      {/* Cinematic grade: darker at the base so the strip and header read */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 1 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-pine-deep/60 via-pine-deep/10 to-pine-deep/80"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center text-white">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          className="field-note text-[10px] text-river-bright sm:text-xs"
        >
          35.49&deg; N &middot; 72.58&deg; E &mdash; Kalam, Upper Swat
        </motion.p>

        <h1 className="mt-7 font-heading text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-7xl">
          <HeroLine delay={0.55} reduceMotion={reduceMotion}>
            Two thousand metres
          </HeroLine>
          <HeroLine delay={0.7} reduceMotion={reduceMotion}>
            above the noise
          </HeroLine>
        </h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
          className="mt-6 max-w-md text-sm leading-relaxed text-white/75 sm:text-base"
        >
          Wood-clad cottages on a quiet shelf of the Swat valley.
        </motion.p>
      </div>

      {/* Field strip */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4, ease: EASE }}
        className="relative z-10 flex w-full items-end justify-between px-5 pb-8 text-white/60 sm:px-8 lg:px-12 xl:px-16"
      >
        <p className="field-note text-[9px] sm:text-[10px]">
          Grand Cottages Kalam
        </p>
        <div
          aria-hidden
          className="flex flex-col items-center gap-2 self-center"
        >
          <span className="relative block h-12 w-px overflow-hidden bg-white/20">
            <motion.span
              initial={false}
              animate={
                reduceMotion
                  ? { y: 0 }
                  : { y: ["-100%", "100%"] }
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute inset-x-0 top-0 h-full bg-river-bright"
            />
          </span>
        </div>
        <p className="field-note text-[9px] sm:text-[10px]">
          Alt 2,000 m &middot; Swat, Pakistan
        </p>
      </motion.div>
    </section>
  );
}
