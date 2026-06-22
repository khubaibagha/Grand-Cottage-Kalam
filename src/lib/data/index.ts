import { getDB, resetDB, setDB } from "./store";
import { REVIEWS } from "./seed";
import { nightsBetween } from "@/lib/format";
import type {
  AvailabilityResult,
  Booking,
  BlockedRange,
  BookingStatus,
  Inquiry,
  PaymentMethod,
  ReviewsSummary,
  RoomType,
  SeasonalPriceRule,
  Settings,
} from "./types";

export type * from "./types";

function delay(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function rangesOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  return aStart < bEnd && bStart < aEnd;
}

// ---------- Room types ----------

export async function getRoomTypes(): Promise<RoomType[]> {
  await delay(350);
  return getDB().roomTypes;
}

export async function getRoomTypeBySlug(
  slug: string,
): Promise<RoomType | undefined> {
  await delay(350);
  return getDB().roomTypes.find((r) => r.slug === slug);
}

export async function updateRoomType(
  id: string,
  patch: Partial<Pick<RoomType, "pricePerNight" | "totalUnits">>,
): Promise<RoomType> {
  await delay(450);
  const db = setDB((db) => ({
    ...db,
    roomTypes: db.roomTypes.map((r) => (r.id === id ? { ...r, ...patch } : r)),
  }));
  const updated = db.roomTypes.find((r) => r.id === id);
  if (!updated) throw new Error("Room type not found");
  return updated;
}

// ---------- Availability ----------

function effectiveRate(
  roomType: RoomType,
  checkIn: string,
  checkOut: string,
  seasonalPricing: SeasonalPriceRule[],
): number {
  const match = seasonalPricing.find(
    (rule) =>
      rule.roomTypeId === roomType.id &&
      rangesOverlap(checkIn, checkOut, rule.startDate, rule.endDate),
  );
  return match ? match.pricePerNight : roomType.pricePerNight;
}

export async function checkAvailability(params: {
  checkIn: string;
  checkOut: string;
  guests: number;
}): Promise<AvailabilityResult[]> {
  await delay(900);
  const { checkIn, checkOut, guests } = params;
  const db = getDB();
  const nights = Math.max(1, nightsBetween(checkIn, checkOut));

  return db.roomTypes.map((roomType) => {
    const isBlocked = db.blockedRanges.some(
      (b) =>
        b.roomTypeId === roomType.id &&
        rangesOverlap(checkIn, checkOut, b.startDate, b.endDate),
    );

    const activeOverlaps = db.bookings.filter(
      (b) =>
        b.roomTypeId === roomType.id &&
        b.status !== "cancelled" &&
        rangesOverlap(checkIn, checkOut, b.checkIn, b.checkOut),
    ).length;

    const fitsGuests = guests <= roomType.occupancy.max;
    const unitsLeft = isBlocked
      ? 0
      : Math.max(0, roomType.totalUnits - activeOverlaps);

    const ratePerNight = effectiveRate(
      roomType,
      checkIn,
      checkOut,
      db.seasonalPricing,
    );

    return {
      roomType,
      available: fitsGuests && unitsLeft > 0,
      unitsLeft,
      nights,
      ratePerNight,
      totalPrice: ratePerNight * nights,
    };
  });
}

// ---------- Bookings ----------

function generateRef(existing: Booking[]): string {
  const year = new Date().getFullYear();
  const max = existing.reduce((acc, b) => {
    const n = Number(b.ref.split("-").pop());
    return Number.isFinite(n) ? Math.max(acc, n) : acc;
  }, 100122);
  return `GCK-${year}-${(max + 1).toString().padStart(6, "0")}`;
}

export interface CreateBookingInput {
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  paymentMethod: PaymentMethod;
  proofImageName?: string;
}

export async function createBooking(
  input: CreateBookingInput,
): Promise<Booking> {
  await delay(1100);
  const db = getDB();
  const roomType = db.roomTypes.find((r) => r.id === input.roomTypeId);
  if (!roomType) throw new Error("Room type not found");

  const nights = Math.max(1, nightsBetween(input.checkIn, input.checkOut));
  const ratePerNight = effectiveRate(
    roomType,
    input.checkIn,
    input.checkOut,
    db.seasonalPricing,
  );
  const total = ratePerNight * nights;
  const advancePercent = db.settings.advancePercent;
  const advanceAmount = Math.round((total * advancePercent) / 100);
  const balanceAmount = total - advanceAmount;

  const status: BookingStatus =
    input.paymentMethod === "bank_transfer" ? "awaiting_verification" : "confirmed";

  const booking: Booking = {
    id: `bk-${Date.now()}`,
    ref: generateRef(db.bookings),
    roomTypeId: roomType.id,
    roomTypeName: roomType.name,
    guestName: input.guestName,
    guestPhone: input.guestPhone,
    guestEmail: input.guestEmail,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    nights,
    guests: input.guests,
    ratePerNight,
    total,
    advanceAmount,
    balanceAmount,
    advancePercent,
    paymentMethod: input.paymentMethod,
    status,
    proofImageName: input.proofImageName,
    createdAt: new Date().toISOString(),
  };

  setDB((db) => ({ ...db, bookings: [booking, ...db.bookings] }));
  return booking;
}

export async function getBookings(): Promise<Booking[]> {
  await delay(500);
  return [...getDB().bookings].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export async function getBookingByRef(
  ref: string,
): Promise<Booking | undefined> {
  await delay(400);
  return getDB().bookings.find((b) => b.ref === ref);
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<Booking> {
  await delay(500);
  const db = setDB((db) => ({
    ...db,
    bookings: db.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
  }));
  const updated = db.bookings.find((b) => b.id === id);
  if (!updated) throw new Error("Booking not found");
  return updated;
}

// ---------- Seasonal pricing ----------

export async function getSeasonalPricing(): Promise<SeasonalPriceRule[]> {
  await delay(350);
  return getDB().seasonalPricing;
}

export async function removeSeasonalRule(id: string): Promise<void> {
  await delay(400);
  setDB((db) => ({
    ...db,
    seasonalPricing: db.seasonalPricing.filter((r) => r.id !== id),
  }));
}

export async function addSeasonalRule(
  rule: Omit<SeasonalPriceRule, "id">,
): Promise<SeasonalPriceRule> {
  await delay(450);
  const newRule: SeasonalPriceRule = { ...rule, id: `sp-${Date.now()}` };
  setDB((db) => ({
    ...db,
    seasonalPricing: [...db.seasonalPricing, newRule],
  }));
  return newRule;
}

// ---------- Blocked ranges / calendar ----------

export async function getBlockedRanges(
  roomTypeId?: string,
): Promise<BlockedRange[]> {
  await delay(350);
  const ranges = getDB().blockedRanges;
  return roomTypeId ? ranges.filter((r) => r.roomTypeId === roomTypeId) : ranges;
}

export async function blockDates(input: {
  roomTypeId: string;
  startDate: string;
  endDate: string;
  reason: string;
}): Promise<BlockedRange> {
  await delay(500);
  const range: BlockedRange = { ...input, id: `blk-${Date.now()}` };
  setDB((db) => ({ ...db, blockedRanges: [...db.blockedRanges, range] }));
  return range;
}

export async function unblockRange(id: string): Promise<void> {
  await delay(400);
  setDB((db) => ({
    ...db,
    blockedRanges: db.blockedRanges.filter((r) => r.id !== id),
  }));
}

// ---------- Settings ----------

export async function getSettings(): Promise<Settings> {
  await delay(300);
  return getDB().settings;
}

export async function updateSettings(
  patch: Partial<Settings>,
): Promise<Settings> {
  await delay(500);
  const db = setDB((db) => ({
    ...db,
    settings: { ...db.settings, ...patch },
  }));
  return db.settings;
}

// ---------- Inquiries ----------

export async function getInquiries(): Promise<Inquiry[]> {
  await delay(400);
  return [...getDB().inquiries].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export async function submitInquiry(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<Inquiry> {
  await delay(900);
  const inquiry: Inquiry = {
    ...input,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  setDB((db) => ({ ...db, inquiries: [inquiry, ...db.inquiries] }));
  return inquiry;
}

export async function markInquiryResponded(id: string): Promise<Inquiry> {
  await delay(350);
  const db = setDB((db) => ({
    ...db,
    inquiries: db.inquiries.map((i) =>
      i.id === id ? { ...i, status: "responded" as const } : i,
    ),
  }));
  const updated = db.inquiries.find((i) => i.id === id);
  if (!updated) throw new Error("Inquiry not found");
  return updated;
}

// ---------- Reviews ----------

export async function getReviews(): Promise<ReviewsSummary> {
  await delay(300);
  return REVIEWS;
}

// ---------- Demo controls ----------

export async function resetMockData(): Promise<void> {
  await delay(300);
  resetDB();
}
