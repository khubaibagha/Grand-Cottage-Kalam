import type {
  Booking,
  BlockedRange,
  Inquiry,
  ReviewsSummary,
  RoomType,
  SeasonalPriceRule,
  Settings,
} from "./types";

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

const today = () => new Date();

export const ROOM_TYPES: RoomType[] = [
  {
    id: "rt-deluxe",
    slug: "deluxe-cottage",
    name: "Deluxe Cottage",
    tagline: "Cosy wood-clad cottage with a private porch",
    description:
      "An intimate wood-panelled cottage with a private sit-out, built for couples and small families chasing mountain air.",
    longDescription:
      "The Deluxe Cottage is where most of our guests fall in love with Kalam. Set along the row of pine-shuttered cottages facing the valley, each unit has its own covered porch with seating, warm wood cladding, and a window framed straight at the ridge line. Inside: a plush queen bed, soft furnishing in cream and walnut tones, an attached bath with hot water around the clock, and heating for the cooler months. It's compact, quiet, and exactly enough.",
    occupancy: { min: 1, max: 3 },
    beds: "1 Queen bed (extra mattress on request)",
    sizeSqft: 220,
    pricePerNight: 12000,
    totalUnits: 6,
    amenities: [
      "Private covered porch",
      "Mountain-facing window",
      "Attached bath, hot water 24h",
      "Room heater",
      "Free Wi-Fi",
      "Flat-screen TV",
      "Daily housekeeping",
    ],
    images: [
      "/assets/images/exterior-single-cottage-dusk.jpg",
      "/assets/images/interior-bedroom.jpg",
      "/assets/images/exterior-row-foggy-dusk.jpg",
      "/assets/images/exterior-blue-sky-pathway.jpg",
    ],
    heroImage: "/assets/images/exterior-single-cottage-dusk.jpg",
  },
  {
    id: "rt-family",
    slug: "family-cottage",
    name: "Family Cottage",
    tagline: "Extra room to breathe, built for families",
    description:
      "A larger twin-bed cottage with more floor space and a sitting nook — comfortable for families of four or five.",
    longDescription:
      "The Family Cottage keeps everything guests love about the Deluxe Cottage and gives it room to stretch. Two well-spaced twin beds, a small sitting nook by the window, and enough floor space to unpack properly for a multi-night stay. Families travelling with kids or grandparents tend to book this one — it's close to the lawn, the porch seating fits the whole group for evening chai, and the layout means nobody is tripping over luggage.",
    occupancy: { min: 2, max: 5 },
    beds: "2 Twin beds + 1 extra mattress on request",
    sizeSqft: 320,
    pricePerNight: 18000,
    totalUnits: 4,
    amenities: [
      "Private covered porch",
      "Sitting nook",
      "Attached bath, hot water 24h",
      "Room heater",
      "Free Wi-Fi",
      "Flat-screen TV",
      "Mini fridge",
      "Daily housekeeping",
    ],
    images: [
      "/assets/images/exterior-row-overcast-day.jpg",
      "/assets/images/interior-bedroom.jpg",
      "/assets/images/exterior-row-foggy-dusk-2.jpg",
      "/assets/images/exterior-night-pathway.jpg",
    ],
    heroImage: "/assets/images/exterior-row-overcast-day.jpg",
  },
  {
    id: "rt-duplex",
    slug: "duplex-suite",
    name: "Duplex / Two-Storey Suite",
    tagline: "Our largest stay — two floors, full valley views",
    description:
      "A two-storey suite with a private upper deck — the most space and the best views on the property.",
    longDescription:
      "For groups who want the whole stay to themselves, the Duplex Suite is two storeys of private space — a lower living level and an upper sleeping deck with the widest valley views on the property. It suits two families travelling together, or a larger group that would rather not split across cottages. Expect more glass, more light, and a private upper balcony that catches the morning sun over the ridge before the rest of the property is awake.",
    occupancy: { min: 3, max: 6 },
    beds: "2 Queen beds + 2 extra mattresses on request",
    sizeSqft: 480,
    pricePerNight: 25000,
    totalUnits: 3,
    amenities: [
      "Private upper balcony",
      "Two-storey layout",
      "Living area",
      "Attached bath, hot water 24h",
      "Room heater (both floors)",
      "Free Wi-Fi",
      "Flat-screen TV",
      "Mini fridge",
      "Priority daily housekeeping",
    ],
    images: [
      "/assets/images/exterior-snow-mountains.jpg",
      "/assets/images/interior-bedroom.jpg",
      "/assets/images/exterior-blue-sky-pathway-2.jpg",
      "/assets/images/exterior-row-foggy-dusk.jpg",
    ],
    heroImage: "/assets/images/exterior-snow-mountains.jpg",
  },
];

export const SEASONAL_PRICING: SeasonalPriceRule[] = [
  {
    id: "sp-eid",
    roomTypeId: "rt-deluxe",
    label: "Eid Holidays",
    startDate: isoDate(addDays(today(), 18)),
    endDate: isoDate(addDays(today(), 25)),
    pricePerNight: 15000,
  },
  {
    id: "sp-summer",
    roomTypeId: "rt-family",
    label: "Peak Summer",
    startDate: isoDate(addDays(today(), 5)),
    endDate: isoDate(addDays(today(), 70)),
    pricePerNight: 21000,
  },
  {
    id: "sp-summer-duplex",
    roomTypeId: "rt-duplex",
    label: "Peak Summer",
    startDate: isoDate(addDays(today(), 5)),
    endDate: isoDate(addDays(today(), 70)),
    pricePerNight: 29000,
  },
];

export const BLOCKED_RANGES: BlockedRange[] = [
  {
    id: "blk-1",
    roomTypeId: "rt-deluxe",
    startDate: isoDate(addDays(today(), 9)),
    endDate: isoDate(addDays(today(), 11)),
    reason: "Sold out — Eid rush",
  },
  {
    id: "blk-2",
    roomTypeId: "rt-family",
    startDate: isoDate(addDays(today(), 14)),
    endDate: isoDate(addDays(today(), 16)),
    reason: "Sold out",
  },
  {
    id: "blk-3",
    roomTypeId: "rt-duplex",
    startDate: isoDate(addDays(today(), 3)),
    endDate: isoDate(addDays(today(), 4)),
    reason: "Maintenance — repainting upper deck",
  },
  {
    id: "blk-4",
    roomTypeId: "rt-deluxe",
    startDate: isoDate(addDays(today(), 30)),
    endDate: isoDate(addDays(today(), 33)),
    reason: "Sold out — weekend group booking",
  },
];

const GUEST_NAMES = [
  "Ahmed Raza",
  "Sana Khalid",
  "Bilal Tariq",
  "Fatima Noor",
  "Hassan Ali",
  "Mehwish Iqbal",
  "Usman Farooq",
  "Ayesha Siddiqui",
  "Zain Abbas",
  "Hira Mansoor",
];

function makeBookingSeed(): Booking[] {
  const advancePercent = 30;
  const statuses: Booking["status"][] = [
    "confirmed",
    "confirmed",
    "confirmed",
    "confirmed",
    "awaiting_verification",
    "awaiting_verification",
    "pending",
    "pending",
    "cancelled",
    "confirmed",
  ];
  const methods: Booking["paymentMethod"][] = [
    "card",
    "easypaisa",
    "jazzcash",
    "bank_transfer",
    "bank_transfer",
    "bank_transfer",
    "card",
    "jazzcash",
    "easypaisa",
    "card",
  ];
  const roomCycle = [ROOM_TYPES[0], ROOM_TYPES[1], ROOM_TYPES[2]];

  return statuses.map((status, i) => {
    const room = roomCycle[i % roomCycle.length];
    const checkInOffset = i % 2 === 0 ? -(10 + i) : 4 + i * 3;
    const nights = 1 + (i % 3);
    const checkIn = addDays(today(), checkInOffset);
    const checkOut = addDays(checkIn, nights);
    const total = room.pricePerNight * nights;
    const advanceAmount = Math.round((total * advancePercent) / 100);
    return {
      id: `bk-${1000 + i}`,
      ref: `GCK-2026-${(100123 + i).toString().padStart(6, "0")}`,
      roomTypeId: room.id,
      roomTypeName: room.name,
      guestName: GUEST_NAMES[i],
      guestPhone: `03${(11 + i).toString().padStart(2, "0")}-${(1000000 + i * 137).toString().slice(0, 7)}`,
      guestEmail: `${GUEST_NAMES[i].toLowerCase().replace(/\s+/g, ".")}@example.com`,
      checkIn: isoDate(checkIn),
      checkOut: isoDate(checkOut),
      nights,
      guests: Math.min(room.occupancy.max, 2 + (i % 3)),
      ratePerNight: room.pricePerNight,
      total,
      advanceAmount,
      balanceAmount: total - advanceAmount,
      advancePercent,
      paymentMethod: methods[i],
      status,
      proofImageName:
        status === "awaiting_verification" ? "transfer-receipt.jpg" : undefined,
      createdAt: addDays(today(), checkInOffset > 0 ? -2 : checkInOffset - 1).toISOString(),
    };
  });
}

export const BOOKINGS: Booking[] = makeBookingSeed();

export const INQUIRIES: Inquiry[] = [
  {
    id: "inq-1",
    name: "Saad Mehmood",
    email: "saad.mehmood@example.com",
    phone: "0301-2345678",
    message:
      "Hi, do you allow late check-out till 2pm if the cottage isn't booked the same night? Planning a 3-night stay in July.",
    createdAt: addDays(today(), -2).toISOString(),
    status: "new",
  },
  {
    id: "inq-2",
    name: "Komal Aslam",
    email: "komal.aslam@example.com",
    phone: "0333-9988776",
    message:
      "Looking for a Duplex Suite for 6 people for a family trip around the third week of next month — is it available, and can you hold it for 24 hours?",
    createdAt: addDays(today(), -1).toISOString(),
    status: "new",
  },
  {
    id: "inq-3",
    name: "Imran Sheikh",
    email: "imran.sheikh@example.com",
    phone: "0345-1122334",
    message: "Do you arrange a jeep to Mahodand Lake from the property?",
    createdAt: addDays(today(), -5).toISOString(),
    status: "responded",
  },
];

export const REVIEWS: ReviewsSummary = {
  average: 4.6,
  count: 153,
  testimonials: [
    {
      id: "rv-1",
      name: "Areeba K.",
      location: "Lahore",
      rating: 5,
      text: "Woke up to the mountains right outside the window. The cottage was spotless and the staff arranged bonfire wood without us even asking twice.",
      date: isoDate(addDays(today(), -40)),
    },
    {
      id: "rv-2",
      name: "Furqan A.",
      location: "Islamabad",
      rating: 5,
      text: "Took the Duplex Suite for a family trip — two floors meant the kids had their own space. Will book again for Eid.",
      date: isoDate(addDays(today(), -65)),
    },
    {
      id: "rv-3",
      name: "Nimra S.",
      location: "Karachi",
      rating: 4,
      text: "Lovely property, very close to Kalam bazaar. Hot water was a little slow the first morning but the team fixed it fast.",
      date: isoDate(addDays(today(), -90)),
    },
    {
      id: "rv-4",
      name: "Owais R.",
      location: "Peshawar",
      rating: 5,
      text: "Best porch view in Kalam, hands down. Breakfast was simple but fresh. Booking advance through Easypaisa was painless.",
      date: isoDate(addDays(today(), -110)),
    },
  ],
};

export const DEFAULT_SETTINGS: Settings = {
  advancePercent: 30,
  checkinTime: "2:00 PM",
  checkoutTime: "12:00 PM",
  contactPhone: "+92 345 1234567",
  contactWhatsapp: "+923451234567",
  contactEmail: "stay@grandcottageskalam.com",
  address: "Mian Road, Kalam, Swat, Khyber Pakhtunkhwa, Pakistan",
  bankDetails: {
    bankName: "Meezan Bank",
    accountTitle: "Grand Cottages Kalam (Pvt) Ltd",
    accountNumber: "0123-4567890-1",
    iban: "PK36MEZN0001234567890123",
  },
  jazzcashNumber: "0345-1234567",
  easypaisaNumber: "0345-1234567",
};
