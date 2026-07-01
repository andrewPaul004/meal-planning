import type { Recommendation } from "../types";

interface Props {
  rec: Recommendation;
  onAccept: () => void; // "I'm making this" -> logs protein
  onAvoidedTakeout: () => void;
  onRestart: () => void;
}

export default function RecommendationCard({
  rec,
  onAccept,
  onAvoidedTakeout,
  onRestart,
}: Props) {
  const { meal, why, snackNudge, isCookUnity, cookUnityName } = rec;
  const title = isCookUnity ? cookUnityName ?? meal.name : meal.name;

  return (
    <div className="card">
      <span className={`rec-badge${isCookUnity ? " cu" : ""}`}>
        {isCookUnity ? "Eat this first" : "Your move"}
      </span>
      <div className="rec-name">{title}</div>

      <div className="rec-why">{why}</div>

      {snackNudge && (
        <div className="callout snack">
          <span className="callout-title">🛑 Before you order anything…</span>
          Boredom/stress talking — knock back a{" "}
          <strong>{snackNudge.name}</strong> (~{snackNudge.proteinEstimate}g
          protein, {snackNudge.effortMinutes === 0 ? "no cooking" : `${snackNudge.effortMinutes} min`}).
          Wait 15 minutes; the takeout urge usually passes.
        </div>
      )}

      <div className="meta-row">
        <div className="pill">
          <div className="val">{meal.proteinEstimate}g</div>
          <div className="lbl">Protein</div>
        </div>
        <div className="pill">
          <div className="val">
            {meal.effortMinutes === 0 ? "0" : meal.effortMinutes}
          </div>
          <div className="lbl">Min prep</div>
        </div>
      </div>

      {isCookUnity && (
        <p className="muted" style={{ marginTop: 0 }}>
          Below is a solid backup if the CookUnity meal isn't actually appealing
          when you open the fridge.
        </p>
      )}

      <div className="section-label">Ingredients</div>
      <ul className="list">
        {meal.ingredients.map((ing) => (
          <li key={ing}>{ing}</li>
        ))}
      </ul>

      <div className="section-label">Steps</div>
      <ol className="list">
        {meal.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      {meal.leftovers && (
        <div className="callout leftovers">
          <span className="callout-title">📦 Put leftovers away first</span>
          Box up the extras <em>before</em> you sit down to eat — it's the easiest
          way to avoid grazing and next-day waste.
        </div>
      )}

      <div className="callout takeout">
        <span className="callout-title">If you still want takeout</span>
        {meal.fallbackTakeout.replace(/^If you still want takeout:\s*/i, "")}
      </div>

      <button className="btn primary" onClick={onAccept}>
        I'm making this (+{meal.proteinEstimate}g protein)
      </button>
      <button className="btn" onClick={onAvoidedTakeout}>
        This saved me from takeout 🎉
      </button>
      <button className="btn" onClick={onRestart}>
        Ask me again
      </button>
    </div>
  );
}
