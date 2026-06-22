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
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors sm:size-8",
                  done && "bg-river text-white",
                  active && "bg-amber text-white",
                  !done && !active && "bg-mist text-stone",
                )}
              >
                {done ? <Check className="size-3.5" /> : stepNum}
              </div>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:inline sm:text-sm",
                  active ? "text-ink" : "text-stone",
                )}
              >
                {label}
              </span>
            </div>
            {stepNum < steps.length && (
              <div className="h-px w-4 bg-mist sm:w-10" />
            )}
          </div>
        );
      })}
    </div>
  );
}
