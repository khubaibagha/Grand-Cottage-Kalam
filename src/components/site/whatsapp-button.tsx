"use client";

import { DEFAULT_SETTINGS } from "@/lib/data/seed";

const MESSAGE = encodeURIComponent(
  "Hi! I'd like to know more about staying at Grand Cottages Kalam.",
);

export function WhatsAppButton() {
  const number = DEFAULT_SETTINGS.contactWhatsapp.replace(/[^\d]/g, "");

  return (
    <a
      href={`https://wa.me/${number}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 active:scale-95"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-7"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.93.56 3.73 1.5 5.27L2 22l4.97-1.6a9.9 9.9 0 0 0 5.07 1.38h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.7a8.2 8.2 0 0 1 5.83 2.41 8.16 8.16 0 0 1 2.42 5.8c0 4.55-3.7 8.25-8.26 8.25a8.27 8.27 0 0 1-4.2-1.15l-.3-.18-2.93.94.95-2.83-.2-.3a8.18 8.18 0 0 1-1.27-4.4c0-4.56 3.7-8.54 8.26-8.54ZM8.5 7.3c-.16 0-.43.06-.62.27-.2.21-.76.74-.76 1.8 0 1.06.78 2.08.9 2.23.1.14 1.55 2.38 3.8 3.25 1.88.73 2.26.61 2.67.57.4-.04 1.3-.53 1.48-1.05.18-.51.18-.95.13-1.05-.06-.1-.22-.16-.46-.28-.24-.12-1.4-.7-1.62-.77-.21-.08-.37-.12-.53.12-.16.24-.6.77-.74.92-.13.16-.27.17-.5.06-.23-.1-.97-.36-1.85-1.15-.68-.6-1.14-1.35-1.27-1.58-.13-.23-.01-.36.1-.49.12-.13.27-.34.4-.5.13-.18.18-.3.27-.5.08-.2.04-.37-.04-.51-.08-.14-.6-1.46-.83-2-.18-.4-.36-.4-.5-.41Z" />
      </svg>
    </a>
  );
}
