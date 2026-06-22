"use client";

import { useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { resetMockData } from "@/lib/data";
import { cn } from "@/lib/utils";

export function DemoBar() {
  const [resetting, setResetting] = useState(false);

  async function handleReset() {
    setResetting(true);
    await resetMockData();
    toast.success("Demo data reset to defaults");
    setTimeout(() => window.location.reload(), 600);
  }

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-1.5 rounded-full bg-ink/85 backdrop-blur-sm px-3 py-2 text-white shadow-lg">
      <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-amber">
        <Sparkles className="size-3" /> Demo
      </span>
      <button
        onClick={handleReset}
        disabled={resetting}
        title="Reset all mock data"
        className={cn(
          "ml-1 flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] hover:bg-white/20 transition-colors",
          resetting && "opacity-60",
        )}
      >
        <RotateCcw className={cn("size-3", resetting && "animate-spin")} />
        Reset
      </button>
    </div>
  );
}
