import { useState } from "react";
import { useSchoolMatches } from "../features/ai-match/useSchoolMatches";
import MatchListItem from "../components/ai-match/MatchListItem";
import MatchReasonList from "../components/ai-match/MatchReasonList";
import MatchScoreBadge from "../components/ai-match/MatchScoreBadge";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AiMatchSchool() {
  const {
    events,
    selectedEventId,
    setSelectedEventId,
    matches,
    isLoadingEvents,
    isLoadingMatches,
    error,
  } = useSchoolMatches();
  const [selectedUmkmId, setSelectedUmkmId] = useState(null);
  const navigate = useNavigate();

  const selected = matches.find((m) => m.umkm_id === selectedUmkmId) ?? matches[0] ?? null;

  if (isLoadingEvents) return <p className="p-8 text-navy/50">Memuat event...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;

  if (events.length === 0) {
    return (
      <p className="p-8 text-navy/50">
        Kamu belum punya event. Buat event dulu untuk melihat rekomendasi UMKM.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <Link to="/school/ai-match" className="text-sm text-navy/50 hover:text-navy">
        ← Kembali
      </Link> 
      <h1 className="text-3xl font-extrabold text-navy">
        Temukan <span className="text-accent">UMKM yang Tepat</span> untuk Event Kamu
      </h1>

      <div className="mt-6 max-w-sm">
        <label className="block text-sm font-semibold text-navy">Pilih Event</label>
        <select
          value={selectedEventId ?? ""}
          onChange={(e) => {
            setSelectedEventId(Number(e.target.value));
            setSelectedUmkmId(null);
          }}
          className="mt-2 w-full rounded-full border border-navy/20 px-5 py-3 text-sm focus:border-navy focus:outline-none"
        >
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.name} ({ev.status})
            </option>
          ))}
        </select>
      </div>

      {isLoadingMatches ? (
        <p className="mt-8 text-navy/50">Menghitung rekomendasi...</p>
      ) : matches.length === 0 ? (
        <p className="mt-8 text-navy/50">Belum ada UMKM terdaftar di sistem.</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div className="space-y-3">
            {matches.map((m) => (
              <MatchListItem
                key={m.umkm_id}
                title={m.business_name}
                subtitle={`${m.category} · ${m.location}`}
                score={m.match_score}
                isActive={selected?.umkm_id === m.umkm_id}
                onClick={() => setSelectedUmkmId(m.umkm_id)}
              />
            ))}
          </div>

          {selected && (
            <div className="h-fit rounded-xl2 border border-navy/10 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-extrabold text-navy">{selected.business_name}</h2>
                <MatchScoreBadge score={selected.match_score} />
              </div>

              <p className="mt-3 text-sm text-navy/60">{selected.description}</p>

              <ul className="mt-4 space-y-1.5 text-sm text-navy/70">
                <li>Kategori: {selected.category}</li>
                <li>Lokasi: {selected.location}</li>
                <li>Target audiens: {selected.target_audience || "-"}</li>
                <li>
                  Kisaran harga: Rp{Number(selected.price_min ?? 0).toLocaleString("id-ID")} – Rp
                  {Number(selected.price_max ?? 0).toLocaleString("id-ID")}
                </li>
              </ul>

              <div className="mt-5">
                <h3 className="text-sm font-bold text-navy">Kenapa cocok?</h3>
                <div className="mt-2">
                  <MatchReasonList reasons={selected.match_reason} />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {selected.application_status ? (
                  <span className="inline-flex items-center rounded-full bg-navy/5 px-5 py-3 text-sm font-semibold text-navy/60">
                    Status: {selected.application_status}
                  </span>
                ) : (
                  <span className="text-sm text-navy/40 self-center">
                    UMKM ini belum mendaftar ke event kamu.
                  </span>
                )}
                <Button
                  variant="outline"
                  onClick={() => navigate(`/school/events/${selectedEventId}/applications`)}
                >
                  Lihat Semua Pendaftar
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}