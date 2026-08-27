import { BarChart3, Bot, Check } from "lucide-react";

const POINTS = [
  "Mempermudah Anda dalam menganalisis.",
  "Akurasi sesuai event berlangsung.",
  "Penggunaan AI yang dapat dipertanggungjawabkan.",
];

export default function AnalyticsShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="rounded-xl2 bg-navy/5" style={{ aspectRatio: "4 / 5" }} />

        <div>
          <h2 className="section-title">Analisis</h2>
          <p className="mt-3 text-navy/70">
            Fitur ini merupakan fitur unggulan kami. Anda dapat gunakan
            untuk mempermudah menganalisis usaha Anda pada saat event.
          </p>

          <div className="mt-5 flex gap-6">
            <span className="flex items-center gap-2 text-sm font-medium text-navy">
              <Bot size={18} className="text-accent" /> Penggunaan AI
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-navy">
              <BarChart3 size={18} className="text-accent" /> Analisis Otomatis
            </span>
          </div>

          <ul className="mt-5 space-y-2">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-navy/70">
                <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                {point}
              </li>
            ))}
          </ul>

          <a href="/analytics" className="btn-navy mt-6 inline-flex">
            Analisis
          </a>
        </div>
      </div>
    </section>
  );
}
