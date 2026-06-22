"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Mountain, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function SiteHeader({
  variant = "solid",
}: {
  variant?: "transparent" | "solid";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (variant !== "transparent") return;
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const solidLook = variant === "solid" || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solidLook
          ? "bg-pine/95 backdrop-blur-sm shadow-[0_2px_20px_rgba(0,0,0,0.15)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg sm:text-xl text-white tracking-wide"
        >
          <Mountain className="size-5 text-amber" strokeWidth={1.75} />
          <span>
            Grand Cottages <span className="text-amber">Kalam</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-[0.12em] text-white/90 hover:text-amber transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            asChild
            className="bg-amber hover:bg-amber/90 text-ink rounded-full px-6"
          >
            <Link href="/book">Book Now</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="lg:hidden text-white p-2 -mr-2"
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="bg-pine border-pine-deep text-white w-full sm:max-w-sm p-0"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <span className="font-heading text-lg">Menu</span>
              <SheetClose className="p-1">
                <X className="size-5" />
              </SheetClose>
            </div>
            <nav className="flex flex-col px-6 py-6 gap-1">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="py-3 text-base border-b border-white/10 text-white/90 hover:text-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="px-6">
              <Button
                asChild
                className="w-full bg-amber hover:bg-amber/90 text-ink rounded-full"
              >
                <Link href="/book">Book Now</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
