import { Check } from "lucide-react";

export default function MatchReasonList({ reasons = [] }) {
  if (reasons.length === 0) {
    return <p className="text-sm text-navy/50">Belum ada kecocokan spesifik yang terdeteksi.</p>;
  }

  return (
    <ul className="space-y-1.5">
      {reasons.map((reason) => (
        <li key={reason} className="flex items-center gap-2 text-sm text-navy/70">
          <Check size={16} className="text-accent-dark" />
          {reason}
        </li>
      ))}
    </ul>
  );
}