import { useEffect, useMemo, useState } from "react";
import type { Answers, Recommendation, WeekState } from "./types";
import { recommend } from "./engine/recommend";
import {
  isoDate,
  loadWeek,
  makeId,
  saveWeek,
} from "./storage";
import Questionnaire from "./components/Questionnaire";
import RecommendationCard from "./components/RecommendationCard";
import WeekPlanner from "./components/WeekPlanner";
import Stats from "./components/Stats";

type Tab = "eat" | "week" | "stats";
type EatPhase = "home" | "asking" | "result";

const TODAY_LABEL = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  month: "short",
  day: "numeric",
});

export default function App() {
  const [tab, setTab] = useState<Tab>("eat");
  const [phase, setPhase] = useState<EatPhase>("home");
  const [rec, setRec] = useState<Recommendation | null>(null);

  const [week, setWeek] = useState<WeekState>(() => loadWeek());
  useEffect(() => saveWeek(week), [week]);

  function update(fn: (w: WeekState) => WeekState) {
    setWeek((w) => fn(w));
  }

  function handleAnswers(answers: Answers) {
    setRec(recommend(answers));
    setPhase("result");
  }

  function logProtein(label: string, grams: number) {
    const today = isoDate();
    update((w) => ({
      ...w,
      proteinByDay: {
        ...w.proteinByDay,
        [today]: [
          ...(w.proteinByDay[today] ?? []),
          { id: makeId("p"), label, grams, at: Date.now() },
        ],
      },
    }));
  }

  const eatCount = useMemo(() => week.cookUnity.filter((c) => c.eaten).length, [week]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>What Should Andrew Eat?</h1>
        <div className="date">{TODAY_LABEL}</div>
      </header>

      {tab === "eat" && (
        <>
          {phase === "home" && (
            <>
              <button
                className="cta"
                onClick={() => {
                  setRec(null);
                  setPhase("asking");
                }}
              >
                Tell me what to eat
                <span className="sub">4 quick taps · no thinking required</span>
              </button>

              <div className="card center">
                <p className="muted" style={{ margin: 0 }}>
                  {eatCount}/4 CookUnity eaten · {week.takeoutAvoided} takeout
                  avoided this week
                </p>
              </div>
            </>
          )}

          {phase === "asking" && (
            <Questionnaire
              onDone={handleAnswers}
              onCancel={() => setPhase("home")}
            />
          )}

          {phase === "result" && rec && (
            <RecommendationCard
              rec={rec}
              onAccept={() => {
                logProtein(rec.meal.name, rec.meal.proteinEstimate);
                setPhase("home");
                setTab("stats");
              }}
              onAvoidedTakeout={() => {
                update((w) => ({ ...w, takeoutAvoided: w.takeoutAvoided + 1 }));
                setPhase("home");
              }}
              onRestart={() => setPhase("asking")}
            />
          )}
        </>
      )}

      {tab === "week" && <WeekPlanner week={week} update={update} />}

      {tab === "stats" && <Stats week={week} update={update} />}

      <nav className="tabbar">
        <button
          className={`tab${tab === "eat" ? " on" : ""}`}
          onClick={() => {
            setTab("eat");
            setPhase("home");
          }}
        >
          <span className="icon">🍽️</span>
          Eat
        </button>
        <button
          className={`tab${tab === "week" ? " on" : ""}`}
          onClick={() => setTab("week")}
        >
          <span className="icon">📅</span>
          Week
        </button>
        <button
          className={`tab${tab === "stats" ? " on" : ""}`}
          onClick={() => setTab("stats")}
        >
          <span className="icon">📊</span>
          Stats
        </button>
      </nav>
    </div>
  );
}
