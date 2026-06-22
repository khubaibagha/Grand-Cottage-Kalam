export type RoomTypeSlug = "deluxe-cottage" | "family-cottage" | "duplex-suite";

export interface RoomType {
  id: string;
  slug: RoomTypeSlug;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  occupancy: { min: number; max: number };
  beds: string;
  sizeSqft: number;
  pricePerNight: number;
  totalUnits: number;
  amenities: string[];
  images: string[];
  heroImage: string;
}

export type PaymentMethod = "card" | "jazzcash" | "easypaisa" | "bank_transfer";

export type BookingStatus =
  | "confirmed"
  | "awaiting_verification"
  | "pending"
  | "cancelled";

export interface Booking {
  id: string;
  ref: string;
  roomTypeId: string;
  roomTypeName: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  nights: number;
  guests: number;
  ratePerNight: number;
  total: number;
  advanceAmount: number;
  balanceAmount: number;
  advancePercent: number;
  paymentMethod: PaymentMethod;
  status: BookingStatus;
  proofImageName?: string;
  notes?: string;
  createdAt: string; // ISO datetime
}

export interface SeasonalPriceRule {
  id: string;
  roomTypeId: string;
  label: string;
  startDate: string;
  endDate: string;
  pricePerNight: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "new" | "responded";
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface ReviewsSummary {
  average: number;
  count: number;
  testimonials: Testimonial[];
}

export interface BankDetails {
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
}

export interface Settings {
  advancePercent: number;
  checkoutTime: string;
  checkinTime: string;
  contactPhone: string;
  contactWhatsapp: string;
  contactEmail: string;
  address: string;
  bankDetails: BankDetails;
  jazzcashNumber: string;
  easypaisaNumber: string;
}

export interface AvailabilityResult {
  roomType: RoomType;
  available: boolean;
  unitsLeft: number;
  nights: number;
  ratePerNight: number;
  totalPrice: number;
}

export interface BlockedRange {
  id: string;
  roomTypeId: string;
  startDate: string;
  endDate: string;
  reason: string;
}
