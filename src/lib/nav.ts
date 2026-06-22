export const NAV_LINKS = [
  { href: "/cottages", label: "Cottages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/explore-kalam", label: "Explore Kalam" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = [
  {
    heading: "Stay",
    links: [
      { href: "/cottages", label: "All cottages" },
      { href: "/book", label: "Book a stay" },
      { href: "/gallery", label: "Gallery" },
      { href: "/explore-kalam", label: "Explore Kalam" },
    ],
  },
  {
    heading: "Property",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/contact", label: "Contact us" },
      { href: "/admin", label: "Admin" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/legal/booking-policy", label: "Booking & cancellation" },
      { href: "/legal/privacy", label: "Privacy policy" },
      { href: "/legal/terms", label: "Terms of use" },
    ],
  },
] as const;
