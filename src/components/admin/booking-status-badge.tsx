import { Badge } from "@/components/ui/badge";
import type { BookingStatus } from "@/lib/data";
import { cn } from "@/lib/utils";

const STYLES: Record<BookingStatus, string> = {
  confirmed: "bg-moss/15 text-moss",
  awaiting_verification: "bg-amber/15 text-amber",
  pending: "bg-river/15 text-river",
  cancelled: "bg-destructive/10 text-destructive",
};

const LABELS: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  awaiting_verification: "Awaiting Verification",
  pending: "Pending",
  cancelled: "Cancelled",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <Badge className={cn("rounded-full border-0 font-medium", STYLES[status])}>
      {LABELS[status]}
    </Badge>
  );
}
