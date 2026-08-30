import { useMemo } from "react";
import { Link } from "react-router-dom";
import { LuSparkles, LuCalendarDays, LuStore, LuTrendingUp } from "react-icons/lu";
import { FiInbox, FiCheck, FiClock, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import UmkmNavbar from "../../components/layout/UmkmNavbar";
import { useAuth } from "../../context/useAuth";
import { useUmkmApplications } from "../../features/umkm/useUmkmApplications";
import { useUmkmMatches } from "../../features/ai-match/useUmkmMatches";
import { getEventImage } from "../../utils/umkmImage";

function formatDate(s) {
  if (!s) return "-";
  try { return new Date(s).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }); } catch { return s; }
}

export default function UmkmHome() {
  const { user } = useAuth();
  const { applications, isLoading: appsLoading } = useUmkmApplications();
  const { matches, isLoading: matchLoading } = useUmkmMatches();

  const displayName = user?.name || "Mitra UMKM";

  const stats = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter((a) => ["pending", "reviewing", "negotiating"].includes(a.status)).length;
    const approved = applications.filter((a) => a.status === "approved").length;
    const rejected = applications.filter((a) => ["rejected", "cancelled"].includes(a.status)).length;
    return { total, pending, approved, rejected };
  }, [applications]);

  const latestApps = useMemo(() => applications.slice(0, 3), [applications]);
  const topMatches = useMemo(() => matches.slice(0, 3), [matches]);

  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans text-[#111827]">
      <UmkmNavbar />

      <main className="mx-auto max-w-[1220px] px-5 py-8 md:px-8 md:py-10">
        {/* HERO — clean kayak EventSaya */}
        <section className="grid gap-6 md:grid-cols-[1.45fr_1fr] md:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-[11px] font-semibold tracking-wide text-[#475569] shadow-sm">
              <LuSparkles size={13} className="text-[#FF8A00]" />
              VENU · Beranda UMKM
            </div>
            <h1 className="text-[28px] font-bold leading-tight tracking-tight text-[#0B2340] md:text-[40px]">
              Halo, {displayName} —<br />
              <span className="text-[#1677C8]">kelola peluang kolaborasimu.</span>
            </h1>
            <p className="mt-3 max-w-[560px] text-sm leading-6 text-[#64748B]">
              Jelajahi event sekolah, dapatkan rekomendasi AI yang paling cocok, dan pantau status lamaranmu dalam satu tempat.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/umkm/events"
                className="inline-flex items-center gap-2 rounded-full bg-[#1677C8] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(22,119,200,0.25)] transition hover:bg-[#1268B2]"
              >
                Jelajah Event <FiArrowRight size={14} />
              </Link>
              <Link
                to="/umkm/ai-match/hasil"
                className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-3 text-sm font-semibold text-[#0B2340] transition hover:border-[#1677C8] hover:text-[#1677C8]"
              >
                <LuSparkles size={14} /> AI Match
              </Link>
            </div>
          </div>

          {/* ilustrasi kanan — clean, tanpa biru full */}
          <div className="relative hidden md:block">
            <div className="absolute -right-6 -top-4 hidden h-24 w-24 opacity-20 lg:block">
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 36 }).map((_, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#94A3B8]" />
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[28px] border border-[#E6ECF3] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#EEF2F7] pb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">Ringkasan</span>
                <span className="rounded-full bg-[#FFF7ED] px-2.5 py-1 text-[10px] font-bold text-[#FF8A00]">Live</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: "Lamaran", value: appsLoading ? "—" : stats.total },
                  { label: "Menunggu", value: appsLoading ? "—" : stats.pending },
                  { label: "Diterima", value: appsLoading ? "—" : stats.approved },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-[#F8FAFD] px-3 py-3 text-center">
                    <p className="text-lg font-extrabold text-[#0B2340]">{s.value}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFD] px-4 py-4 text-center">
                <p className="text-xs font-semibold text-[#0B2340]">Butuh rekomendasi personal?</p>
                <p className="mt-1 text-[11px] text-[#94A3B8]">AI Match analisis kategori, lokasi & budget.</p>
                <Link to="/umkm/ai-match/hasil" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#1677C8] hover:underline">
                  Buka AI Match <FiArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            { label: "Total Lamaran", value: stats.total, icon: FiInbox, bg: "bg-[#EFF6FF]", color: "text-[#1677C8]" },
            { label: "Menunggu", value: stats.pending, icon: FiClock, bg: "bg-[#FFF7ED]", color: "text-[#F59E0B]" },
            { label: "Diterima", value: stats.approved, icon: FiCheck, bg: "bg-[#ECFDF5]", color: "text-[#16A34A]" },
            { label: "Rekomendasi AI", value: matchLoading ? "—" : matches.length, icon: LuSparkles, bg: "bg-[#F5F3FF]", color: "text-[#7C3AED]" },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="rounded-2xl border border-[#E6ECF3] bg-white p-4 shadow-sm md:p-5">
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.bg} ${c.color}`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]">Live</span>
                </div>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">{c.label}</p>
                <p className="mt-1 text-[26px] font-bold leading-none text-[#0B2340]">{c.value}</p>
              </div>
            );
          })}
        </section>

        {/* SPLIT: lamaran terbaru + rekomendasi */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
          {/* Lamaran terbaru */}
          <div className="rounded-2xl border border-[#E6ECF3] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#EEF2F7] px-5 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1677C8]">Lamaran Saya</p>
                <h2 className="text-[16px] font-bold text-[#0B2340]">Aktivitas terbaru</h2>
              </div>
              <Link to="/umkm/applications" className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0B2340] hover:border-[#1677C8] hover:text-[#1677C8]">
                Lihat semua <FiArrowRight size={12} />
              </Link>
            </div>

            {appsLoading ? (
              <div className="space-y-3 p-5">
                {[1, 2, 3].map((i) => <div key={i} className="h-[86px] animate-pulse rounded-xl bg-[#F8FAFD]" />)}
              </div>
            ) : latestApps.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF6FF] text-[#1677C8]">
                  <FiInbox size={20} />
                </div>
                <p className="mt-3 text-sm font-bold text-[#0B2340]">Belum ada lamaran</p>
                <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-[#94A3B8]">Mulai dari Jelajah Event atau AI Match untuk mendaftar ke event sekolah.</p>
                <div className="mt-4 flex justify-center gap-2">
                  <Link to="/umkm/events" className="rounded-full bg-[#1677C8] px-4 py-2 text-xs font-bold text-white hover:bg-[#1268B2]">Jelajah Event</Link>
                  <Link to="/umkm/ai-match/hasil" className="rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-xs font-bold text-[#0B2340] hover:border-[#1677C8]">AI Match</Link>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-[#EEF2F7]">
                {latestApps.map((app) => {
                  const ev = app.event;
                  const statusCls =
                    app.status === "approved" ? "bg-emerald-50 text-emerald-700" :
                    app.status === "rejected" || app.status === "cancelled" ? "bg-red-50 text-red-700" :
                    app.status === "negotiating" ? "bg-purple-50 text-purple-700" : "bg-amber-50 text-amber-700";
                  return (
                    <div key={app.id} className="flex gap-3 px-5 py-4">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#EEF2F7]">
                        <img src={getEventImage(ev)} alt="" className="h-full w-full object-cover" loading="lazy" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-bold text-[#0B2340]">{ev?.name || `Event #${app.event_id}`}</p>
                          <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${statusCls}`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current" /> {app.status}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-[#94A3B8]">{ev?.location || "-"} · {formatDate(ev?.event_date || app.applied_at)}</p>
                        {app.message && <p className="mt-1 line-clamp-1 text-xs text-[#64748B]">“{app.message}”</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Rekomendasi + quick links */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#E6ECF3] bg-white p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1677C8]">AI Match</p>
              <h3 className="mt-1 text-[16px] font-bold leading-tight text-[#0B2340]">Rekomendasi untukmu</h3>
              <p className="mt-1 text-xs leading-5 text-[#94A3B8]">Event yang paling cocok dengan kategori & lokasimu.</p>

              {matchLoading ? (
                <div className="mt-4 space-y-2">
                  {[1, 2, 3].map((i) => <div key={i} className="h-[64px] animate-pulse rounded-xl bg-[#F8FAFD]" />)}
                </div>
              ) : topMatches.length === 0 ? (
                <p className="mt-4 rounded-xl bg-[#F8FAFD] px-4 py-6 text-center text-xs text-[#94A3B8]">Belum ada rekomendasi. Lengkapi profil usahamu dulu.</p>
              ) : (
                <div className="mt-4 space-y-2.5">
                  {topMatches.map((m) => (
                    <div key={m.event_id} className="flex gap-3 rounded-xl border border-[#EEF2F7] bg-[#F8FAFD] p-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                        <img src={getEventImage(m)} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-[#0B2340]">{m.name}</p>
                        <p className="text-[11px] text-[#94A3B8]">{m.school_name} · {m.location}</p>
                      </div>
                      <span className="h-fit shrink-0 rounded-full bg-[#1677C8] px-2 py-0.5 text-[10px] font-bold text-white">{m.match_score}%</span>
                    </div>
                  ))}
                  <Link to="/umkm/ai-match/hasil" className="mt-1 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#0B2340] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#122F57]">
                    Buka AI Match <FiArrowUpRight size={12} />
                  </Link>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Jelajah", to: "/umkm/events", icon: LuStore },
                { label: "Lamaran", to: "/umkm/applications", icon: FiInbox },
                { label: "Profil", to: "/umkm/profile", icon: LuTrendingUp },
              ].map((q) => {
                const Icon = q.icon;
                return (
                  <Link key={q.label} to={q.to} className="group rounded-2xl border border-[#E6ECF3] bg-white px-3 py-4 text-center shadow-sm hover:border-[#1677C8] hover:shadow-md">
                    <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF6FF] text-[#1677C8] group-hover:bg-[#1677C8] group-hover:text-white">
                      <Icon size={16} />
                    </span>
                    <span className="mt-2 block text-xs font-bold text-[#0B2340]">{q.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="rounded-2xl border border-[#E6ECF3] bg-white px-5 py-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF7ED] text-[#FF8A00]"><LuCalendarDays size={14} /></span>
                <p className="text-xs font-bold text-[#0B2340]">Tips</p>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#64748B]">Lengkapi profil UMKM (kategori, lokasi, budget booth) supaya skor AI Match lebih akurat dan sekolah lebih mudah mengundangmu.</p>
              <Link to="/umkm/profile" className="mt-3 inline-flex text-xs font-bold text-[#1677C8] hover:underline">Lengkapi profil →</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
