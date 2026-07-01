import { useState } from "react";
import type { Answers, Craving, Effort, Reason } from "../types";

interface Props {
  onDone: (answers: Answers) => void;
  onCancel: () => void;
}

interface Opt<T> {
  value: T;
  label: string;
  emoji: string;
  full?: boolean;
}

const CRAVINGS: Opt<Craving>[] = [
  { value: "pizza", label: "Pizza", emoji: "🍕" },
  { value: "pasta", label: "Pasta", emoji: "🍝" },
  { value: "burger", label: "Burger / McDonald's", emoji: "🍔" },
  { value: "mexican", label: "Taco Bell / Mexican", emoji: "🌮" },
  { value: "asian", label: "Asian / Shrimp", emoji: "🍤" },
  { value: "dontcare", label: "I don't care", emoji: "🤷", full: true },
];

const EFFORTS: Opt<Effort>[] = [
  { value: 0, label: "No cooking", emoji: "🥶" },
  { value: 10, label: "10 minutes", emoji: "⚡" },
  { value: 20, label: "20 minutes", emoji: "🍳" },
  { value: 30, label: "30 minutes", emoji: "👨‍🍳" },
];

const COOKUNITY: Opt<boolean>[] = [
  { value: true, label: "Yes", emoji: "✅" },
  { value: false, label: "No", emoji: "❌" },
];

const REASONS: Opt<Reason>[] = [
  { value: "hunger", label: "Hunger", emoji: "😋" },
  { value: "boredom", label: "Boredom", emoji: "🥱" },
  { value: "stress", label: "Stress", emoji: "😰" },
  { value: "fatigue", label: "Decision fatigue", emoji: "🫠" },
];

const STEPS = [
  "WHAT ARE YOU CRAVING?",
  "HOW MUCH EFFORT?",
  "COOKUNITY MEAL AVAILABLE?",
  "HUNGER, BOREDOM, STRESS, OR FATIGUE?",
];

export default function Questionnaire({ onDone, onCancel }: Props) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Partial<Answers>>({});

  function choose<K extends keyof Answers>(key: K, value: Answers[K]) {
    const next = { ...draft, [key]: value };
    setDraft(next);
    if (step < 3) {
      setStep(step + 1);
    } else {
      onDone(next as Answers);
    }
  }

  function back() {
    if (step === 0) onCancel();
    else setStep(step - 1);
  }

  return (
    <div className="card">
      <div className="q-step">
        Step {step + 1} of 4 · {STEPS[step]}
      </div>

      {step === 0 && (
        <>
          <div className="q-title">What are you craving?</div>
          <div className="options">
            {CRAVINGS.map((o) => (
              <button
                key={String(o.value)}
                className={`option${o.full ? " full" : ""}`}
                onClick={() => choose("craving", o.value)}
              >
                <span className="emoji">{o.emoji}</span>
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <div className="q-title">How much effort?</div>
          <div className="options">
            {EFFORTS.map((o) => (
              <button
                key={o.value}
                className="option"
                onClick={() => choose("effort", o.value)}
              >
                <span className="emoji">{o.emoji}</span>
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="q-title">
            Do you have a CookUnity meal scheduled or available?
          </div>
          <div className="options">
            {COOKUNITY.map((o) => (
              <button
                key={String(o.value)}
                className="option full"
                onClick={() => choose("hasCookUnity", o.value)}
              >
                <span className="emoji">{o.emoji}</span>
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="q-title">Is this hunger, boredom, stress, or decision fatigue?</div>
          <div className="options">
            {REASONS.map((o) => (
              <button
                key={o.value}
                className="option"
                onClick={() => choose("reason", o.value)}
              >
                <span className="emoji">{o.emoji}</span>
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="flow-nav">
        <button className="link-btn" onClick={back}>
          {step === 0 ? "Cancel" : "← Back"}
        </button>
        <div className="progress-dots">
          {STEPS.map((_, i) => (
            <span key={i} className={`dot${i <= step ? " on" : ""}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
