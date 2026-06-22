import type {
  Booking,
  BlockedRange,
  Inquiry,
  RoomType,
  SeasonalPriceRule,
  Settings,
} from "./types";
import {
  BLOCKED_RANGES,
  BOOKINGS,
  DEFAULT_SETTINGS,
  INQUIRIES,
  ROOM_TYPES,
  SEASONAL_PRICING,
} from "./seed";

export interface DB {
  version: number;
  roomTypes: RoomType[];
  bookings: Booking[];
  blockedRanges: BlockedRange[];
  seasonalPricing: SeasonalPriceRule[];
  inquiries: Inquiry[];
  settings: Settings;
}

const STORAGE_KEY = "gck_mock_db_v1";
const DB_VERSION = 1;

function freshSeed(): DB {
  return {
    version: DB_VERSION,
    roomTypes: structuredClone(ROOM_TYPES),
    bookings: structuredClone(BOOKINGS),
    blockedRanges: structuredClone(BLOCKED_RANGES),
    seasonalPricing: structuredClone(SEASONAL_PRICING),
    inquiries: structuredClone(INQUIRIES),
    settings: structuredClone(DEFAULT_SETTINGS),
  };
}

let memoryDB: DB | null = null;

function loadDB(): DB {
  if (memoryDB) return memoryDB;

  if (typeof window === "undefined") {
    memoryDB = freshSeed();
    return memoryDB;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DB;
      if (parsed && parsed.version === DB_VERSION && parsed.roomTypes) {
        memoryDB = parsed;
        return memoryDB;
      }
    }
  } catch {
    // fall through to fresh seed on any parse/storage error
  }

  memoryDB = freshSeed();
  persist(memoryDB);
  return memoryDB;
}

function persist(db: DB) {
  memoryDB = db;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch {
      // storage full or unavailable — demo continues with in-memory state only
    }
  }
}

export function getDB(): DB {
  return loadDB();
}

export function setDB(updater: (db: DB) => DB): DB {
  const next = updater(loadDB());
  persist(next);
  return next;
}

export function resetDB(): DB {
  const fresh = freshSeed();
  persist(fresh);
  return fresh;
}
