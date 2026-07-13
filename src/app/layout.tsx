import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { DemoBar } from "@/components/site/demo-bar";

// Gudlack — the site's single typeface (display, body and utility roles).
// All eight weights are loaded locally so hierarchy is built from weight, not
// from mixing families.
const gudlack = localFont({
  variable: "--font-gudlack",
  display: "swap",
  src: [
    { path: "../../public/Fonts/GCGudlakDemo-Thin-BF695cd59bbba72.ttf", weight: "100", style: "normal" },
    { path: "../../public/Fonts/GCGudlakDemo-ExtraLight-BF695cd59ba678a.ttf", weight: "200", style: "normal" },
    { path: "../../public/Fonts/GCGudlakDemo-Light-BF695cd59b5a172.ttf", weight: "300", style: "normal" },
    { path: "../../public/Fonts/GCGudlakDemo-Regular-BF695cd59bb1a11.ttf", weight: "400", style: "normal" },
    { path: "../../public/Fonts/GCGudlakDemo-Medium-BF695cd59b7df0f.ttf", weight: "500", style: "normal" },
    { path: "../../public/Fonts/GCGudlakDemo-SemiBold-BF695cd59bc5211.ttf", weight: "600", style: "normal" },
    { path: "../../public/Fonts/GCGudlakDemo-Bold-BF695cd59b3f47c.ttf", weight: "700", style: "normal" },
    { path: "../../public/Fonts/GCGudlakDemo-ExtraBold-BF695cd59b73d76.ttf", weight: "800", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Grand Cottages Kalam | Mountain Cottages on the Swat River",
  description:
    "Grand Cottages Kalam — wood-clad mountain cottages overlooking the Swat valley. Book your stay in Kalam, Swat with real-time availability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${gudlack.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
        <WhatsAppButton />
        <DemoBar />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
