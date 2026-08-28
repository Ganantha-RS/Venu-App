export default function MatchScoreBadge({ score, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent-dark ${className}`}
    >
      {score}% Cocok
    </span>
  );
}