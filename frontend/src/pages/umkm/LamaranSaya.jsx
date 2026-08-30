import { Link } from "react-router-dom";
import { FiClock, FiCheck, FiX, FiCalendar, FiMapPin, FiDollarSign, FiInbox } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import UmkmNavbar from "../../components/layout/UmkmNavbar";
import { useUmkmApplications } from "../../features/umkm/useUmkmApplications";
import { getEventImage } from "../../utils/umkmImage";

const STATUS = {
  pending: { label: "Menunggu", cls: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500", icon: FiClock },
  reviewing: { label: "Ditinjau", cls: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500", icon: FiClock },
  negotiating: { label: "Negosiasi", cls: "bg-purple-50 text-purple-700 border-purple-200", dot: "bg-purple-500", icon: FiClock },
  approved: { label: "Diterima", cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", icon: FiCheck },
  rejected: { label: "Ditolak", cls: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500", icon: FiX },
  cancelled: { label: "Dibatalkan", cls: "bg-slate-50 text-slate-600 border-slate-200", dot: "bg-slate-400", icon: FiX },
  completed: { label: "Selesai", cls: "bg-slate-50 text-slate-600 border-slate-200", dot: "bg-slate-400", icon: FiCheck },
};

function fmtDate(s) {
  if (!s) return "-";
  try { return new Date(s).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }); } catch { return s; }
}
function fmtRp(n) { return "Rp" + Number(n || 0).toLocaleString("id-ID"); }

export default function LamaranSaya() {
  const { applications, isLoading, error } = useUmkmApplications();

  const counts = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending" || a.status === "reviewing" || a.status === "negotiating").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected" || a.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans">
      <UmkmNavbar />

      {/* HERO */}
      <div className="relative overflow-hidden bg-[#0B2340]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.10]" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=60)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative mx-auto max-w-[1220px] px-5 py-8 md:px-8 md:py-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/80">
            <FiInbox size={13} /> LAMARAN SAYA
          </div>
          <h1 className="mt-4 text-[26px] font-bold leading-tight tracking-tight text-white md:text-[30px]">
            Pantau status <span className="text-[#FF8A00]">lamaranmu.</span>
          </h1>
          <p className="mt-2 max-w-[600px] text-[13px] leading-6 text-white/60">
            Semua pendaftaran yang kamu kirim — baik lewat Jelajah Event maupun AI Match — tercatat di sini.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/umkm/events" className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#0B2340] hover:bg-[#EEF6FF]">
              Jelajah Event →
            </Link>
            <Link to="/umkm/ai-match/hasil" className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur hover:bg-white/20">
              <LuSparkles size={12} /> AI Match
            </Link>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="mx-auto max-w-[1220px] px-5 pt-6 md:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Total Lamaran", value: counts.total },
            { label: "Menunggu", value: counts.pending },
            { label: "Diterima", value: counts.approved },
            { label: "Ditolak", value: counts.rejected },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-[#E6ECF3] bg-white px-4 py-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">{s.label}</p>
              <p className="mt-1 text-2xl font-extrabold text-[#0B2340]">{isLoading ? "—" : s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* LIST */}
      <div className="mx-auto max-w-[1220px] px-5 py-6 md:px-8 md:py-6">
        {isLoading ? (
          <div className="grid gap-3 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[180px] animate-pulse rounded-2xl bg-white shadow-sm" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-600">{error}</div>
        ) : applications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677C8]">
              <FiInbox size={22} />
            </div>
            <h3 className="mt-4 text-sm font-bold text-[#0B2340]">Belum ada lamaran</h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-[#94A3B8]">Kamu belum mendaftar ke event mana pun. Mulai dari Jelajah Event atau AI Match.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link to="/umkm/events" className="rounded-full bg-[#1677C8] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1268B2]">Jelajah Event</Link>
              <Link to="/umkm/ai-match/hasil" className="rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-xs font-bold text-[#0B2340] hover:border-[#1677C8] hover:text-[#1677C8]">AI Match</Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {applications.map((app) => {
              const ev = app.event;
              const s = STATUS[app.status] || STATUS.pending;
              const img = ev ? getEventImage(ev) : getEventImage(null);
              return (
                <article key={app.id} className="overflow-hidden rounded-2xl border border-[#E6ECF3] bg-white shadow-sm">
                  <div className="relative h-[96px] overflow-hidden bg-[#EEF2F7]">
                    <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                      <p className="truncate pr-2 text-sm font-bold text-white drop-shadow">
                        {ev?.name || `Event #${app.event_id}`}
                      </p>
                      <span className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold ${s.cls}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} /> {s.label}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-wrap gap-2 text-[11px] text-[#64748B]">
                      <span className="inline-flex items-center gap-1"><FiCalendar size={11} /> {fmtDate(ev?.event_date || app.applied_at)}</span>
                      <span className="inline-flex items-center gap-1"><FiMapPin size={11} /> {ev?.location || "-"}</span>
                      {ev?.booth_price != null && <span className="inline-flex items-center gap-1"><FiDollarSign size={11} /> {fmtRp(ev.booth_price)}</span>}
                    </div>

                    {(app.message || app.proposed_price != null || app.match_score != null) && (
                      <div className="mt-3 rounded-xl bg-[#F8FAFD] px-3 py-3">
                        {app.message && <p className="text-xs leading-5 text-[#334155]">“{app.message}”</p>}
                        <div className="mt-2 flex flex-wrap gap-2">
                          {app.proposed_price != null && (
                            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0B2340] ring-1 ring-[#E2E8F0]">
                              Tawar: {fmtRp(app.proposed_price)}
                            </span>
                          )}
                          {app.match_score != null && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF6FF] px-2.5 py-1 text-[11px] font-bold text-[#1677C8]">
                              <LuSparkles size={11} /> {app.match_score}% match
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-between border-t border-[#EEF2F7] pt-3 text-[11px] text-[#94A3B8]">
                      <span className="inline-flex items-center gap-1.5">
                        <FiClock size={11} /> {fmtDate(app.applied_at)} · {app.initiated_by === "school" ? "Undangan sekolah" : "Lamaran mandiri"}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
