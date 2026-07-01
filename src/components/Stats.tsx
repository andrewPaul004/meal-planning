import { useState } from "react";
import type { WeekState } from "../types";
import {
  PROTEIN_TARGET,
  cookUnityEaten,
  isoDate,
  makeId,
  proteinToday,
  proteinTodayTotal,
} from "../storage";

interface Props {
  week: WeekState;
  update: (fn: (w: WeekState) => WeekState) => void;
}

const QUICK = [
  { label: "Chicken breast", grams: 40 },
  { label: "Protein shake", grams: 30 },
  { label: "Greek yogurt", grams: 20 },
  { label: "2 eggs", grams: 12 },
  { label: "Shrimp", grams: 24 },
];

export default function Stats({ week, update }: Props) {
  const [label, setLabel] = useState("");
  const [grams, setGrams] = useState("");

  const total = proteinTodayTotal(week);
  const entries = proteinToday(week);
  const pct = Math.min(100, Math.round((total / PROTEIN_TARGET) * 100));
  const remaining = Math.max(0, PROTEIN_TARGET - total);

  function addProtein(lbl: string, g: number) {
    if (!g || g <= 0) return;
    const today = isoDate();
    update((w) => ({
      ...w,
      proteinByDay: {
        ...w.proteinByDay,
        [today]: [
          ...(w.proteinByDay[today] ?? []),
          { id: makeId("p"), label: lbl || "Protein", grams: g, at: Date.now() },
        ],
      },
    }));
  }

  function removeEntry(id: string) {
    const today = isoDate();
    update((w) => ({
      ...w,
      proteinByDay: {
        ...w.proteinByDay,
        [today]: (w.proteinByDay[today] ?? []).filter((e) => e.id !== id),
      },
    }));
  }

  function submit() {
    addProtein(label.trim(), Number(grams));
    setLabel("");
    setGrams("");
  }

  function adjustTakeout(delta: number) {
    update((w) => ({
      ...w,
      takeoutAvoided: Math.max(0, w.takeoutAvoided + delta),
    }));
  }

  return (
    <>
      <div className="card">
        <h2>Protein Today</h2>
        <div className="protein-head">
          <span className="num">
            {total}
            <span className="muted" style={{ fontSize: 15 }}>
              {" "}
              / {PROTEIN_TARGET}g
            </span>
          </span>
          <span className="muted">
            {remaining > 0 ? `${remaining}g to go` : "🎯 Goal hit!"}
          </span>
        </div>
        <div className="bar">
          <span style={{ width: `${pct}%` }} />
        </div>

        <div className="add-protein">
          <input
            className="lbl"
            placeholder="What did you eat?"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          <input
            className="grams"
            type="number"
            inputMode="numeric"
            placeholder="grams"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          <button onClick={submit} aria-label="Add protein">
            +
          </button>
        </div>

        <div className="quick-add">
          {QUICK.map((q) => (
            <button
              key={q.label}
              className="chip"
              onClick={() => addProtein(q.label, q.grams)}
            >
              + {q.label} ({q.grams}g)
            </button>
          ))}
        </div>

        {entries.length > 0 && (
          <div style={{ marginTop: 12 }}>
            {entries.map((e) => (
              <div key={e.id} className="entry">
                <span>{e.label}</span>
                <span>
                  <strong>{e.grams}g</strong>{" "}
                  <button onClick={() => removeEntry(e.id)} aria-label="Remove">
                    ✕
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2>This Week</h2>
        <div className="stat-grid">
          <div className="stat">
            <div className="big">{cookUnityEaten(week)}/4</div>
            <div className="cap">CookUnity eaten</div>
          </div>
          <div className="stat">
            <div className="big">{week.takeoutAvoided}</div>
            <div className="cap">Takeout avoided</div>
          </div>
        </div>
        <div className="add-protein" style={{ marginTop: 12 }}>
          <button className="chip" onClick={() => adjustTakeout(1)}>
            + Avoided one takeout
          </button>
          {week.takeoutAvoided > 0 && (
            <button className="chip" onClick={() => adjustTakeout(-1)}>
              − Undo
            </button>
          )}
        </div>
      </div>
    </>
  );
}
