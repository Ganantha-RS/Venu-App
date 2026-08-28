export default function MatchListItem({ title, subtitle, score, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl2 border p-4 text-left transition ${
        isActive ? "border-accent bg-accent/5" : "border-navy/10 bg-white hover:border-navy/30"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-navy">{title}</h3>
          <p className="mt-1 text-sm text-navy/50">{subtitle}</p>
        </div>
        <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold text-accent-dark">
          {score}%
        </span>
      </div>
    </button>
  );
}