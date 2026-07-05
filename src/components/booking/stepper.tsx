import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stepper({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-3">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < current;
        const active = stepNum === current;
        return (
          <div key={label} className="flex items-center gap-1.5 sm:gap-3">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center border text-xs transition-colors duration-300 sm:size-8",
                  done && "border-ink bg-ink text-cream",
                  active && "border-ink bg-transparent text-ink",
                  !done && !active && "border-ink/25 text-stone/60",
                )}
              >
                {done ? (
                  <Check className="size-3.5" strokeWidth={2.5} />
                ) : (
                  <span className="price-figure">{stepNum}</span>
                )}
              </div>
              <span
                className={cn(
                  "field-note hidden text-[10px] sm:inline",
                  active ? "text-ink" : "text-stone/60",
                )}
              >
                {label}
              </span>
            </div>
            {stepNum < steps.length && (
              <div
                className={cn(
                  "h-px w-4 transition-colors duration-300 sm:w-10",
                  done ? "bg-ink" : "bg-ink/15",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
