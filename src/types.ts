// ---- Core domain types --------------------------------------------------

export type CravingCategory =
  | "pizza"
  | "pasta"
  | "burger"
  | "mexican"
  | "asian"
  | "any";

export type Craving = CravingCategory | "dontcare";

export type Effort = 0 | 10 | 20 | 30; // minutes; 0 = no cooking

export type Reason = "hunger" | "boredom" | "stress" | "fatigue";

export interface Meal {
  id: string;
  name: string;
  cravingCategory: CravingCategory;
  effortMinutes: Effort;
  proteinEstimate: number; // grams
  ingredients: string[];
  steps: string[];
  fallbackTakeout: string;
  notes?: string;
  /** true when this meal generates leftovers worth putting away first */
  leftovers?: boolean;
  /** flagged as a quick protein-first snack for boredom/stress moments */
  isSnack?: boolean;
}

// ---- Weekly planning ----------------------------------------------------

export type DayKey =
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat"
  | "Sun";

export const DAYS: DayKey[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** One of the 4 CookUnity meals for the week, optionally assigned to a day. */
export interface CookUnitySlot {
  id: string;
  name: string;
  day: DayKey | null;
  eaten: boolean;
}

/** A logged protein entry for the day. */
export interface ProteinEntry {
  id: string;
  label: string;
  grams: number;
  at: number; // epoch ms
}

export interface WeekState {
  /** ISO date (yyyy-mm-dd) of the Monday that starts this week. */
  weekStart: string;
  cookUnity: CookUnitySlot[];
  takeoutAvoided: number;
  proteinByDay: Record<string, ProteinEntry[]>; // key = yyyy-mm-dd
}

// ---- Decision flow ------------------------------------------------------

export interface Answers {
  craving: Craving;
  effort: Effort;
  hasCookUnity: boolean;
  reason: Reason;
}

export interface Recommendation {
  meal: Meal;
  why: string;
  /** optional protein-first nudge shown before takeout for boredom/stress */
  snackNudge?: Meal;
  /** true when the primary pick is a scheduled CookUnity meal */
  isCookUnity: boolean;
  cookUnityName?: string;
}
