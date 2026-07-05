import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex flex-1 items-center bg-cream pt-20">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
          <p className="field-note text-[10px] text-river">
            35.49&deg; N &middot; 72.58&deg; E &mdash; Off the map
          </p>
          <h1 className="mt-6 font-heading text-6xl text-ink sm:text-8xl">
            404
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
            This trail doesn&rsquo;t lead anywhere. The page you were looking
            for may have moved, or never existed.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center bg-ink px-8 py-3.5 text-[13px] tracking-[0.08em] text-cream transition-colors duration-500 hover:bg-pine"
            >
              Back to home
            </Link>
            <Link
              href="/cottages"
              className="inline-flex items-center border border-ink/25 px-8 py-3.5 text-[13px] tracking-[0.08em] text-ink transition-colors duration-500 hover:border-ink"
            >
              View the cottages
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
