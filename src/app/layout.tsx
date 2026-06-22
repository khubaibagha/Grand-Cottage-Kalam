import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { DemoBar } from "@/components/site/demo-bar";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
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
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
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
