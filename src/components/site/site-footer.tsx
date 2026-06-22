import Link from "next/link";
import { Mountain, Phone, Mail, MapPin } from "lucide-react";
import { FOOTER_LINKS } from "@/lib/nav";
import { DEFAULT_SETTINGS } from "@/lib/data/seed";

export function SiteFooter() {
  const settings = DEFAULT_SETTINGS;

  return (
    <footer className="bg-pine text-white/80">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-heading text-xl text-white"
            >
              <Mountain className="size-5 text-amber" strokeWidth={1.75} />
              Grand Cottages Kalam
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Wood-clad mountain cottages along the Swat valley in Kalam —
              private porches, valley views, and a fireplace&rsquo;s worth of quiet.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a
                href={`tel:${settings.contactPhone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 hover:text-amber transition-colors"
              >
                <Phone className="size-4" /> {settings.contactPhone}
              </a>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="flex items-center gap-2 hover:text-amber transition-colors"
              >
                <Mail className="size-4" /> {settings.contactEmail}
              </a>
              <p className="flex items-center gap-2 text-white/70">
                <MapPin className="size-4 shrink-0" /> {settings.address}
              </p>
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h3 className="font-heading text-sm uppercase tracking-[0.12em] text-amber">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Grand Cottages Kalam. All
            rights reserved.
          </p>
          <p>Mian Road, Kalam &middot; Swat, Khyber Pakhtunkhwa</p>
        </div>
      </div>
    </footer>
  );
}
