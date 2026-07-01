# What Should Andrew Eat?

A local-first meal decision app for one person on a GLP-1 medication. It exists
to kill decision fatigue at 6–7pm, hit a **150g/day protein** target, use up the
weekly CookUnity meals, and cut down on boredom/stress takeout — without any
manual grocery inventory tracking.

## The one thing it does

Home screen has a single button: **"Tell me what to eat."** Four taps
(craving → effort → CookUnity available? → why are you eating?) and it gives you
one clear recommendation with protein, prep time, ingredients, steps, a
"if you still want takeout" fallback, and a "put leftovers away first" reminder.

## Decision rules (in `src/engine/recommend.ts`)

- CookUnity available + no strong craving → **eat the CookUnity meal first**.
- Bored or stressed → a **protein-first snack nudge** appears before takeout.
- Pizza → high-protein frozen pizza night.
- Pasta → protein pasta with chicken sausage.
- Taco Bell/Mexican → chicken fajita bowl.
- Burger/McDonald's → burger bowl / turkey burger.
- Asian/sushi → **shrimp stir-fry** (sushi recently upset your stomach).
- Nothing sounds good → lowest-friction protein option.
- Effort budget too tight for the ideal pick → auto-swaps to a faster option.

## Tabs

- **Eat** — the decision flow.
- **Week** — assign your 4 CookUnity meals to days and check them off as eaten.
- **Stats** — daily protein toward 150g (quick-add chips + manual), CookUnity
  eaten this week, and takeout avoided.

## Tech

React + TypeScript + Vite. All state lives in `localStorage` (`wsae.week.v1`)
and rolls over automatically each Monday. No calorie tracking, no barcode
scanning, no inventory entry — by design (v1).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
```
