import type { Meal } from "../types";

/**
 * Default meal library. Protein estimates are per-serving for one person.
 * Everything here fits Andrew's tastes: no cucumber, no cottage cheese,
 * no tuna/salmon packets, and eggs are kept to a single low-effort option.
 */
export const MEALS: Meal[] = [
  {
    id: "chicken-fajita-bowl",
    name: "Chicken Fajita Bowl",
    cravingCategory: "mexican",
    effortMinutes: 20,
    proteinEstimate: 45,
    ingredients: [
      "Pre-cooked or rotisserie chicken (or quick-seared strips)",
      "Bell peppers + onion (fresh or frozen fajita blend)",
      "Fajita seasoning",
      "Microwave rice or a small tortilla",
      "Salsa, hot sauce, shredded cheese",
    ],
    steps: [
      "Sauté peppers & onion 6–8 min with fajita seasoning.",
      "Add chicken to warm through, 3–4 min.",
      "Serve over microwave rice; top with salsa, cheese, hot sauce.",
    ],
    fallbackTakeout:
      "If you still want takeout: Chipotle chicken bowl (double chicken, no chips) hits the same craving with the protein locked in.",
    notes: "Scratches the Taco Bell / Mexican itch without the drive-thru.",
    leftovers: true,
  },
  {
    id: "shrimp-stir-fry-bowl",
    name: "Shrimp Stir-Fry Bowl",
    cravingCategory: "asian",
    effortMinutes: 20,
    proteinEstimate: 40,
    ingredients: [
      "Frozen raw shrimp (thawed under cold water)",
      "Frozen stir-fry vegetable blend",
      "Soy/teriyaki or stir-fry sauce",
      "Microwave rice",
    ],
    steps: [
      "Sear shrimp 2–3 min per side, set aside.",
      "Stir-fry the veg blend 5–6 min.",
      "Return shrimp, add sauce, toss 1 min. Serve over rice.",
    ],
    fallbackTakeout:
      "If you still want takeout: order a shrimp or chicken teriyaki bowl — skip sushi for now since it recently upset your stomach.",
    notes: "Picked over sushi on purpose — sushi has been rough on you lately.",
    leftovers: true,
  },
  {
    id: "protein-pasta-sausage",
    name: "Protein Pasta with Chicken Sausage",
    cravingCategory: "pasta",
    effortMinutes: 20,
    proteinEstimate: 42,
    ingredients: [
      "High-protein pasta (chickpea or Barilla Protein+)",
      "Pre-cooked chicken or turkey sausage, sliced",
      "Jarred marinara or rosé sauce",
      "Parmesan",
    ],
    steps: [
      "Boil protein pasta per box (~10 min).",
      "Brown sliced sausage in a pan while pasta cooks.",
      "Combine with sauce, simmer 2 min, top with parmesan.",
    ],
    fallbackTakeout:
      "If you still want takeout: a grilled chicken pasta from a local spot — ask for extra chicken, half the pasta.",
    leftovers: true,
  },
  {
    id: "high-protein-pizza-night",
    name: "High-Protein Frozen Pizza Night",
    cravingCategory: "pizza",
    effortMinutes: 10,
    proteinEstimate: 40,
    ingredients: [
      "High-protein frozen pizza (e.g. Real Good / Caulipower + toppings)",
      "Extra pre-cooked chicken or pepperoni to load on top",
      "Optional bagged side salad",
    ],
    steps: [
      "Preheat oven per box.",
      "Add extra protein toppings before baking.",
      "Bake, slice, done. Add a side salad if you want volume.",
    ],
    fallbackTakeout:
      "If you still want takeout: order a thin-crust pizza and add double chicken — eat 2–3 slices with a side salad instead of the whole pie.",
    notes: "A controlled pizza fix beats a whole delivery pie.",
  },
  {
    id: "burger-bowl",
    name: "Burger Bowl / Turkey Burger",
    cravingCategory: "burger",
    effortMinutes: 20,
    proteinEstimate: 45,
    ingredients: [
      "Lean beef or turkey patty (or two)",
      "Chopped lettuce, tomato, pickle, diced onion",
      "Cheese slice, mustard, a little special sauce",
      "Optional: microwave sweet-potato side",
    ],
    steps: [
      "Cook patties 4–5 min per side.",
      "Build a bowl over chopped lettuce with all the burger fixings.",
      "Add a controlled side (small sweet potato) if you want it.",
    ],
    fallbackTakeout:
      "If you still want takeout: order a burger protein-style (lettuce wrap) or a double with only one bun, and skip the fries or get a small.",
    notes: "The burger craving, minus the bun-and-fries spiral.",
  },
  {
    id: "rotisserie-chicken-wrap",
    name: "Rotisserie Chicken Wrap",
    cravingCategory: "any",
    effortMinutes: 10,
    proteinEstimate: 38,
    ingredients: [
      "Store rotisserie chicken, pulled",
      "High-protein / low-carb wrap",
      "Cheese, lettuce, hot sauce or light dressing",
    ],
    steps: [
      "Pile chicken, cheese, and greens on a wrap.",
      "Add hot sauce or a light dressing.",
      "Roll, and optionally toast in a dry pan 2 min.",
    ],
    fallbackTakeout:
      "If you still want takeout: a grilled chicken wrap or bowl from anywhere nearby — you're basically already there.",
    notes: "Rotisserie chicken is your fastest real-food protein anchor.",
    leftovers: true,
  },
  {
    id: "greek-yogurt-bowl",
    name: "Greek Yogurt Bowl",
    cravingCategory: "any",
    effortMinutes: 0,
    proteinEstimate: 25,
    ingredients: [
      "Plain or vanilla Greek yogurt (high protein)",
      "Berries or banana",
      "Granola or a spoon of peanut butter",
      "Optional scoop of protein powder stirred in",
    ],
    steps: [
      "Scoop yogurt into a bowl.",
      "Top with fruit and a crunch of granola or PB.",
    ],
    fallbackTakeout:
      "If you still want takeout: you probably don't need it — this is a fast bridge to your next real meal.",
    notes: "No eggs, no cooking. Good boredom/stress catch before takeout.",
    isSnack: true,
  },
  {
    id: "protein-shake-banana",
    name: "Protein Shake + Banana",
    cravingCategory: "any",
    effortMinutes: 0,
    proteinEstimate: 30,
    ingredients: [
      "Protein powder (2 scoops or 1 + milk)",
      "Milk or water",
      "1 banana",
    ],
    steps: ["Blend or shake the protein.", "Eat the banana alongside it."],
    fallbackTakeout:
      "If you still want takeout: give it 20 minutes after this — the craving is usually boredom, not hunger.",
    notes: "The lowest-friction protein hit when nothing sounds good.",
    isSnack: true,
  },
  {
    id: "salad-kit-rotisserie",
    name: "Bagged Salad Kit + Rotisserie Chicken",
    cravingCategory: "any",
    effortMinutes: 10,
    proteinEstimate: 40,
    ingredients: [
      "Bagged salad kit (with dressing/toppings included)",
      "Rotisserie chicken, pulled",
    ],
    steps: [
      "Empty the salad kit into a bowl.",
      "Top with a generous pile of rotisserie chicken and toss.",
    ],
    fallbackTakeout:
      "If you still want takeout: a chicken salad or grain bowl — but this is faster than delivery.",
    notes: "Kit does the work; chicken makes it a real dinner.",
  },
  {
    id: "emergency-no-cook-plate",
    name: "Emergency No-Cook Protein Plate",
    cravingCategory: "any",
    effortMinutes: 0,
    proteinEstimate: 35,
    ingredients: [
      "Deli turkey or pre-cooked chicken",
      "Cheese sticks or slices",
      "Whatever crunchy veg/crackers you have",
      "Hot sauce or mustard",
    ],
    steps: [
      "Plate the protein, cheese, and something crunchy.",
      "Add a condiment and eat. No cooking, no decisions.",
    ],
    fallbackTakeout:
      "If you still want takeout: eat this first, then decide in 15 minutes — you usually won't order.",
    notes: "The zero-decision, zero-cook floor when everything feels like too much.",
    isSnack: true,
  },
];

export const MEALS_BY_ID: Record<string, Meal> = Object.fromEntries(
  MEALS.map((m) => [m.id, m]),
);
