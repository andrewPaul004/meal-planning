import type { DayKey, WeekState } from "../types";
import { DAYS } from "../types";
import { cookUnityEaten } from "../storage";

interface Props {
  week: WeekState;
  update: (fn: (w: WeekState) => WeekState) => void;
}

export default function WeekPlanner({ week, update }: Props) {
  function rename(id: string, name: string) {
    update((w) => ({
      ...w,
      cookUnity: w.cookUnity.map((c) => (c.id === id ? { ...c, name } : c)),
    }));
  }

  function setDay(id: string, day: DayKey | null) {
    update((w) => ({
      ...w,
      cookUnity: w.cookUnity.map((c) => (c.id === id ? { ...c, day } : c)),
    }));
  }

  function toggleEaten(id: string) {
    update((w) => ({
      ...w,
      cookUnity: w.cookUnity.map((c) =>
        c.id === id ? { ...c, eaten: !c.eaten } : c,
      ),
    }));
  }

  // Show scheduled meals in day order (unscheduled last), never random.
  const ordered = [...week.cookUnity].sort((a, b) => {
    const ai = a.day ? DAYS.indexOf(a.day) : 99;
    const bi = b.day ? DAYS.indexOf(b.day) : 99;
    return ai - bi;
  });

  return (
    <div className="card">
      <h2>This Week's CookUnity ({cookUnityEaten(week)}/4 eaten)</h2>
      <div className="week-grid">
        {ordered.map((slot) => (
          <div key={slot.id} className={`cu-row${slot.eaten ? " eaten" : ""}`}>
            <button
              className={`check${slot.eaten ? " on" : ""}`}
              onClick={() => toggleEaten(slot.id)}
              title="Mark eaten"
              aria-label="Mark eaten"
            >
              {slot.eaten ? "✓" : ""}
            </button>
            <input
              className="cu-name"
              value={slot.name}
              onChange={(e) => rename(slot.id, e.target.value)}
              spellCheck={false}
            />
            <select
              className="cu-day"
              value={slot.day ?? ""}
              onChange={(e) =>
                setDay(slot.id, (e.target.value || null) as DayKey | null)
              }
            >
              <option value="">Any day</option>
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <p className="muted center" style={{ fontSize: 13, marginBottom: 0 }}>
        Assign your 4 meals to days, then check them off as you eat them.
      </p>
    </div>
  );
}
