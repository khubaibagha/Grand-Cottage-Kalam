"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2, Mail, MessageCircleReply, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getInquiries, markInquiryResponded } from "@/lib/data";
import type { Inquiry } from "@/lib/data";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function AdminInquiriesPage() {
  const [loading, setLoading] = React.useState(true);
  const [inquiries, setInquiries] = React.useState<Inquiry[]>([]);
  const [respondingId, setRespondingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    getInquiries().then((data) => {
      setInquiries(data);
      setLoading(false);
    });
  }, []);

  async function handleRespond(inquiry: Inquiry) {
    setRespondingId(inquiry.id);
    try {
      const updated = await markInquiryResponded(inquiry.id);
      setInquiries((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      toast.success(`Marked ${inquiry.name}'s inquiry as responded.`);
    } catch {
      toast.error("Could not update inquiry.");
    } finally {
      setRespondingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-32 text-stone">
        <Loader2 className="size-5 animate-spin" /> Loading inquiries...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-ink">Inquiries</h1>
        <p className="mt-1 text-sm text-stone">
          Messages submitted through the contact form.
        </p>
      </div>

      {inquiries.length === 0 ? (
        <p className="rounded-2xl bg-white px-6 py-12 text-center text-sm text-stone shadow-sm ring-1 ring-mist">
          No inquiries yet.
        </p>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-mist"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ink">{inquiry.name}</p>
                    <Badge
                      className={cn(
                        "rounded-full border-0 font-medium",
                        inquiry.status === "new"
                          ? "bg-amber/15 text-amber"
                          : "bg-moss/15 text-moss",
                      )}
                    >
                      {inquiry.status === "new" ? "New" : "Responded"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-stone">
                    {formatDateTime(inquiry.createdAt)}
                  </p>
                </div>
                {inquiry.status === "new" && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={respondingId === inquiry.id}
                    onClick={() => handleRespond(inquiry)}
                  >
                    {respondingId === inquiry.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <MessageCircleReply className="size-4" />
                    )}
                    Mark responded
                  </Button>
                )}
              </div>

              <p className="mt-3 text-sm text-ink">{inquiry.message}</p>

              <div className="mt-3 flex flex-wrap gap-4 text-xs text-stone">
                <span className="flex items-center gap-1.5">
                  <Mail className="size-3.5" /> {inquiry.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="size-3.5" /> {inquiry.phone}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
