"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteHeader({
  variant = "solid",
}: {
  variant?: "transparent" | "solid";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (variant !== "transparent") return;
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  // Lock the page behind the full-screen menu
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solidLook = variant === "solid" || scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          solidLook && !open
            ? "border-b border-white/10 bg-pine/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="flex h-20 w-full items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group relative z-50 flex flex-col leading-none text-white"
          >
            <span className="font-heading text-sm tracking-[0.08em] sm:text-base">
              Grand Cottages
            </span>
            <span className="field-note mt-1 text-[9px] text-river-bright transition-colors duration-300 group-hover:text-white sm:text-[10px]">
              Kalam &middot; 2,000 m
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative py-1 text-[13px] tracking-[0.04em] transition-colors duration-300",
                    active ? "text-white" : "text-white/70 hover:text-white",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-river-bright transition-transform duration-500 ease-out",
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className="hidden items-center border border-white/30 px-6 py-2.5 text-[13px] tracking-[0.08em] text-white transition-all duration-500 hover:border-cream hover:bg-cream hover:text-ink lg:inline-flex"
            >
              Reserve
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="field-note relative z-50 -mr-1 px-1 py-2 text-[11px] text-white lg:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[45] flex flex-col bg-pine-deep lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
              }}
              className="flex flex-1 flex-col justify-center gap-1 px-8 pt-20"
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 24 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: EASE },
                    },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block border-b border-white/10 py-4 font-heading text-3xl transition-colors duration-300",
                      pathname === link.href
                        ? "text-river-bright"
                        : "text-white hover:text-river-bright",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE },
                  },
                }}
                className="pt-8"
              >
                <Link
                  href="/book"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center bg-cream px-8 py-4 text-sm tracking-[0.08em] text-ink transition-colors duration-300 hover:bg-white"
                >
                  Reserve a cottage
                </Link>
              </motion.div>
            </motion.nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.6 } }}
              className="field-note px-8 pb-10 text-[10px] text-white/40"
            >
              35.49&deg; N &middot; 72.58&deg; E &mdash; Upper Swat Valley
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
