import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/nav";
import { DEFAULT_SETTINGS } from "@/lib/data/seed";

export function SiteFooter() {
  const settings = DEFAULT_SETTINGS;

  return (
    <footer className="bg-pine-deep text-white/70">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="block leading-none text-white">
              <span className="font-heading text-2xl tracking-[0.08em]">
                Grand Cottages
              </span>
              <span className="field-note mt-2 block text-[10px] text-river-bright">
                Kalam &middot; Upper Swat Valley
              </span>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Wood-clad mountain cottages along the Swat valley in Kalam —
              private porches, valley views, and a fireplace&rsquo;s worth of
              quiet.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <a
                href={`tel:${settings.contactPhone.replace(/\s+/g, "")}`}
                className="block transition-colors duration-300 hover:text-white"
              >
                {settings.contactPhone}
              </a>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="block transition-colors duration-300 hover:text-white"
              >
                {settings.contactEmail}
              </a>
              <p className="text-white/50">{settings.address}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading}>
                <h3 className="field-note text-[10px] text-white/40">
                  {col.heading}
                </h3>
                <ul className="mt-5 space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/70 transition-colors duration-300 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Grand Cottages Kalam. All rights
            reserved.
          </p>
          <p className="field-note text-[10px] text-white/30">
            35.49&deg; N &middot; 72.58&deg; E &middot; Alt 2,000 m
          </p>
        </div>
      </div>
    </footer>
  );
}
