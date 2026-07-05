import { cn } from "@/lib/utils";

/**
 * Surveyor-style section eyebrow — the site's structural device.
 * Renders `35.49° N · 72.58° E — LABEL` with a hairline rule.
 */
export function FieldNote({
  label,
  coords,
  tone = "light",
  className,
}: {
  label: string;
  coords?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "field-note flex items-center gap-4",
        tone === "light" ? "text-river" : "text-river-bright",
        className,
      )}
    >
      <span className="shrink-0">
        {coords && (
          <span
            className={cn(
              "mr-3 hidden sm:inline",
              tone === "light" ? "text-stone/70" : "text-white/40",
            )}
          >
            {coords}
          </span>
        )}
        {label}
      </span>
      <span
        aria-hidden
        className={cn(
          "h-px flex-1 max-w-24",
          tone === "light" ? "bg-ink/15" : "bg-white/20",
        )}
      />
    </div>
  );
}
