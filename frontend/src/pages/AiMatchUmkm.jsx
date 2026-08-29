import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUmkmMatches } from "../features/ai-match/useUmkmMatches";
import { applyToEvent } from "../features/ai-match/matchApi";
import MatchListItem from "../components/ai-match/MatchListItem";
import MatchReasonList from "../components/ai-match/MatchReasonList";
import MatchScoreBadge from "../components/ai-match/MatchScoreBadge";
import Button from "../components/common/Button";
import { CalendarDays, MapPin, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function AiMatchUmkm() {
  const { matches, isLoading, error, reload } = useUmkmMatches();
  const [selectedId, setSelectedId] = useState(null);
  const [applying, setApplying] = useState(false);
  const navigate = useNavigate();

  const selected = matches.find((m) => m.event_id === selectedId) ?? matches[0] ?? null;

  const formattedDate = selected
    ? new Date(selected.event_date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const handleApply = async () => {
    if (!selected) return;
    setApplying(true);
    try {
      await applyToEvent(selected.event_id);
      reload();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mendaftar. Coba lagi.");
    } finally {
      setApplying(false);
    }
  };

  if (isLoading) return <p className="p-8 text-navy/50">Memuat rekomendasi...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <Link to="/umkm/ai-match" className="text-sm text-navy/50 hover:text-navy">
        ← Kembali
      </Link>
      <h1 className="text-3xl font-extrabold text-navy">
        Rekomendasi Event untuk <span className="text-accent">Usaha Kamu</span>
      </h1>
      <p className="mt-2 max-w-xl text-navy/60">
        AI kami mencocokkan profil usahamu dengan event sekolah yang paling relevan.
      </p>

      {matches.length === 0 ? (
        <p className="mt-8 text-navy/50">
          Belum ada event published yang bisa dicocokkan. Coba lagi nanti.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div className="space-y-3">
            {matches.map((m) => (
              <MatchListItem
                key={m.event_id}
                title={m.name}
                subtitle={m.school_name}
                score={m.match_score}
                isActive={selected?.event_id === m.event_id}
                onClick={() => setSelectedId(m.event_id)}
              />
            ))}
          </div>

          {selected && (
            <div className="h-fit rounded-xl2 border border-navy/10 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-extrabold text-navy">{selected.name}</h2>
                <MatchScoreBadge score={selected.match_score} />
              </div>

              <ul className="mt-4 space-y-2 text-sm text-navy/70">
                <li className="flex items-center gap-2">
                  <Building2 size={16} className="text-accent" /> {selected.school_name}
                </li>
                <li className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-accent" /> {formattedDate}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-accent" /> {selected.location}
                </li>
              </ul>

              <p className="mt-4 text-sm text-navy/60">
                Booth: Rp{selected.booth_price.toLocaleString("id-ID")} · Kapasitas{" "}
                {selected.booth_capacity} tenant
              </p>

              <div className="mt-5">
                <h3 className="text-sm font-bold text-navy">Kenapa cocok?</h3>
                <div className="mt-2">
                  <MatchReasonList reasons={selected.match_reason} />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => navigate(`/events/${selected.slug}`)}>
                  Lihat Detail
                </Button>

                {selected.application_status ? (
                  <span className="inline-flex items-center rounded-full bg-navy/5 px-5 py-3 text-sm font-semibold text-navy/60">
                    Status: {selected.application_status}
                  </span>
                ) : (
                  <Button variant="accent" onClick={handleApply} disabled={applying}>
                    {applying ? "Mendaftar..." : "Daftar sebagai Tenant"}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}