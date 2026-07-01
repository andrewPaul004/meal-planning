import type { Answers, CravingCategory, Meal, Recommendation } from "../types";
import { MEALS, MEALS_BY_ID } from "../data/meals";

/** Primary meal per craving, straight from the decision rules. */
const CRAVING_PICK: Record<CravingCategory, string> = {
  pizza: "high-protein-pizza-night",
  pasta: "protein-pasta-sausage",
  mexican: "chicken-fajita-bowl",
  burger: "burger-bowl",
  asian: "shrimp-stir-fry-bowl",
  any: "rotisserie-chicken-wrap",
};

/** Lowest-friction protein option when nothing sounds good. */
const LOWEST_FRICTION = "protein-shake-banana";

function pick(id: string): Meal {
  return MEALS_BY_ID[id];
}

/**
 * If the ideal pick takes longer than the user's effort budget, swap to the
 * closest lower-effort option that still respects the craving where possible.
 */
function respectEffort(meal: Meal, effort: Answers["effort"]): Meal {
  if (meal.effortMinutes <= effort) return meal;

  // Same craving, but faster.
  const sameCravingFaster = MEALS.filter(
    (m) => m.cravingCategory === meal.cravingCategory && m.effortMinutes <= effort,
  ).sort((a, b) => b.proteinEstimate - a.proteinEstimate)[0];
  if (sameCravingFaster) return sameCravingFaster;

  // Otherwise the highest-protein option that fits the time budget.
  const anyFaster = MEALS.filter((m) => m.effortMinutes <= effort).sort(
    (a, b) => b.proteinEstimate - a.proteinEstimate,
  )[0];
  return anyFaster ?? meal;
}

/** A quick protein-first snack to throw in front of a boredom/stress takeout urge. */
function snackNudge(effort: Answers["effort"]): Meal {
  const snacks = MEALS.filter((m) => m.isSnack && m.effortMinutes <= Math.max(effort, 10));
  return (
    snacks.sort((a, b) => b.proteinEstimate - a.proteinEstimate)[0] ??
    pick(LOWEST_FRICTION)
  );
}

export function recommend(answers: Answers): Recommendation {
  const { craving, effort, hasCookUnity, reason } = answers;
  const stronglyCraving = craving !== "dontcare";
  const emotional = reason === "boredom" || reason === "stress";

  // Rule 1: CookUnity is available and there's no strong craving -> eat it first.
  if (hasCookUnity && !stronglyCraving) {
    const anchor = pick("rotisserie-chicken-wrap"); // shown for structure/ingredients feel
    return {
      meal: anchor,
      isCookUnity: true,
      cookUnityName: "your scheduled CookUnity meal",
      why:
        "You've got a CookUnity meal ready and you're not craving anything specific. " +
        "Eat that first — it's already paid for, it's protein-forward, and it saves you from a takeout decision.",
      snackNudge: emotional ? snackNudge(effort) : undefined,
    };
  }

  // Rule: nothing sounds good -> lowest-friction protein option.
  if (craving === "dontcare") {
    const meal = pick(LOWEST_FRICTION);
    return {
      meal,
      isCookUnity: false,
      why:
        "Nothing sounds good, so don't force a decision. Grab the lowest-friction protein hit, " +
        "then reassess in 20 minutes — the urge to order usually fades.",
      snackNudge: emotional ? snackNudge(effort) : undefined,
    };
  }

  // Craving-driven pick, adjusted to the effort budget.
  const ideal = pick(CRAVING_PICK[craving as CravingCategory]);
  const meal = respectEffort(ideal, effort);

  const whyByCraving: Record<CravingCategory, string> = {
    pizza:
      "You want pizza — so have pizza, just the controlled version. A high-protein pie at home lands the craving without a whole delivery box.",
    pasta:
      "Pasta craving handled: protein pasta plus chicken sausage keeps the comfort and pushes you toward your protein goal.",
    mexican:
      "Taco Bell energy, redirected. A chicken fajita bowl gives you the same flavors with real protein and no drive-thru.",
    burger:
      "Burger craving, minus the bun-and-fries spiral. A burger bowl (or turkey burger) keeps it satisfying and protein-heavy.",
    asian:
      "Going with shrimp stir-fry instead of sushi on purpose — sushi's been rough on your stomach lately, and this hits the same note.",
    any: "A fast, protein-forward anchor that works for basically any mood.",
  };

  let why = whyByCraving[craving as CravingCategory];
  if (meal.id !== ideal.id) {
    why += ` (Swapped to a ${meal.effortMinutes}-minute option to fit the time you've got.)`;
  }

  return {
    meal,
    isCookUnity: false,
    why,
    snackNudge: emotional ? snackNudge(effort) : undefined,
  };
}
