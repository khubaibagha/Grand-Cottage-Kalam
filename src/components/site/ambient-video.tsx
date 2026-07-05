"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Muted, looping ambient video that autoplays reliably on mobile.
 * - `muted` is set imperatively before play() — React's SSR output can
 *   drop the muted attribute, which blocks iOS/Android autoplay.
 * - Pauses when scrolled out of view; sits still if the visitor
 *   prefers reduced motion.
 */
export function AmbientVideo({
  src,
  poster,
  className,
  priority = false,
}: {
  src: string;
  poster?: string;
  className?: string;
  priority?: boolean;
}) {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      autoPlay
      preload={priority ? "auto" : "metadata"}
      poster={poster}
      disablePictureInPicture
      aria-hidden
      tabIndex={-1}
      className={cn("pointer-events-none object-cover", className)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
