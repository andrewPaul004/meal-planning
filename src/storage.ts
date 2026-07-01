import type { CookUnitySlot, ProteinEntry, WeekState } from "./types";

const KEY = "wsae.week.v1";

export const PROTEIN_TARGET = 150; // g/day

// ---- Date helpers -------------------------------------------------------

/** yyyy-mm-dd in local time. */
export function isoDate(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Monday (local) that starts the week containing `d`. */
export function mondayOf(d = new Date()): string {
  const copy = new Date(d);
  const dow = (copy.getDay() + 6) % 7; // 0 = Monday
  copy.setDate(copy.getDate() - dow);
  copy.setHours(0, 0, 0, 0);
  return isoDate(copy);
}

let counter = 0;
export function makeId(prefix = "id"): string {
  counter += 1;
  return `${prefix}_${Date.now().toString(36)}_${counter}`;
}

// ---- Fresh week ---------------------------------------------------------

function freshCookUnity(): CookUnitySlot[] {
  return Array.from({ length: 4 }, (_, i) => ({
    id: makeId("cu"),
    name: `CookUnity Meal ${i + 1}`,
    day: null,
    eaten: false,
  }));
}

export function freshWeek(weekStart = mondayOf()): WeekState {
  return {
    weekStart,
    cookUnity: freshCookUnity(),
    takeoutAvoided: 0,
    proteinByDay: {},
  };
}

// ---- Persistence --------------------------------------------------------

export function loadWeek(): WeekState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return freshWeek();
    const parsed = JSON.parse(raw) as WeekState;

    // New calendar week? Roll over to a fresh sheet (keep names, reset progress).
    const currentMonday = mondayOf();
    if (parsed.weekStart !== currentMonday) {
      const rolled = freshWeek(currentMonday);
      rolled.cookUnity = parsed.cookUnity.map((c, i) => ({
        ...freshCookUnity()[i],
        name: c.name,
      }));
      return rolled;
    }
    return {
      ...freshWeek(currentMonday),
      ...parsed,
      proteinByDay: parsed.proteinByDay ?? {},
    };
  } catch {
    return freshWeek();
  }
}

export function saveWeek(week: WeekState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(week));
  } catch {
    // localStorage unavailable / full — fail silently, app still works in-memory.
  }
}

// ---- Derived stats ------------------------------------------------------

export function proteinToday(week: WeekState): ProteinEntry[] {
  return week.proteinByDay[isoDate()] ?? [];
}

export function proteinTodayTotal(week: WeekState): number {
  return proteinToday(week).reduce((sum, e) => sum + e.grams, 0);
}

export function cookUnityEaten(week: WeekState): number {
  return week.cookUnity.filter((c) => c.eaten).length;
}
