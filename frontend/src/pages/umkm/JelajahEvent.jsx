import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiMapPin, FiCalendar, FiDollarSign } from "react-icons/fi";
import { LuStore, LuSparkles } from "react-icons/lu";
import UmkmNavbar from "../../components/layout/UmkmNavbar";
import { useEvents } from "../../features/event-discovery/useEvents";
import { getEventImage } from "../../utils/umkmImage";
import { applyToEvent } from "../../features/ai-match/matchApi";

const CATEGORIES = ["", "Makanan", "Minuman", "Kerajinan", "Aksesoris", "Fashion"];
const LOCATIONS = ["", "Jakarta Timur", "Jakarta Selatan", "Jakarta Barat", "Jakarta Pusat", "Jakarta Utara"];

function fmtDate(s) {
  if (!s) return "-";
  try { return new Date(s).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }); } catch { return s; }
}
function fmtRp(n) { return "Rp" + Number(n || 0).toLocaleString("id-ID"); }

export default function JelajahEvent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const apiParams = useMemo(() => {
    const p = { limit: 12 };
    if (search.trim()) p.search = search.trim();
    if (category) p.category = category;
    if (location) p.location = location;
    if (maxPrice) p.max_booth_price = maxPrice;
    return p;
  }, [search, category, location, maxPrice]);

  const { events, isLoading, error, reload } = useEvents(apiParams);

  // daftar modal
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalPrice, setModalPrice] = useState("");
  const [applying, setApplying] = useState(false);
  const [applyMsg, setApplyMsg] = useState(null);

  const openModal = (ev) => {
    setSelectedEvent(ev);
    setModalMessage(`Halo, saya tertarik mendaftar sebagai tenant di ${ev.name}. Mohon informasinya, terima kasih!`);
    setModalPrice("");
    setApplyMsg(null);
    setShowModal(true);
  };

  const handleApply = async () => {
    if (!selectedEvent) return;
    const priceNum = modalPrice.trim() === "" ? null : Number(modalPrice.replace(/\D/g, ""));
    if (modalPrice.trim() !== "" && (Number.isNaN(priceNum) || priceNum < 0)) {
      setApplyMsg({ type: "error", text: "Harga penawaran harus angka positif." });
      return;
    }
    if (modalMessage.length > 2000) {
      setApplyMsg({ type: "error", text: "Pesan maksimal 2000 karakter." });
      return;
    }
    setApplying(true);
    setApplyMsg(null);
    try {
      await applyToEvent(selectedEvent.id, { message: modalMessage.trim() || null, proposed_price: priceNum });
      setShowModal(false);
      setApplyMsg(null);
      // toast simple — reload biar status berubah kalau ada
      reload(apiParams);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.message?.[0] || "Gagal mendaftar. Coba lagi.";
      setApplyMsg({ type: "error", text: msg });
    } finally { setApplying(false); }
  };

  const resetFilter = () => {
    setSearch(""); setCategory(""); setLocation(""); setMaxPrice("");
  };

  const hasActiveFilter = search || category || location || maxPrice;

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans">
      <UmkmNavbar />

      {/* HERO — navy, mirip EventSaya / AiMatchUmkm tapi copy UMKM */}
      <div className="relative overflow-hidden bg-[#0B2340]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.10]" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=60)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="pointer-events-none absolute right-10 top-6 hidden text-white/20 lg:block" aria-hidden>
          <LuSparkles size={28} />
        </div>
        <div className="relative mx-auto max-w-[1220px] px-5 py-8 md:px-8 md:py-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/80">
            <LuStore size={13} /> JELAJAH EVENT
          </div>
          <h1 className="mt-4 text-[26px] font-bold leading-tight tracking-tight text-white md:text-[30px]">
            Temukan event yang <span className="text-[#FF8A00]">pas buat usahamu.</span>
          </h1>
          <p className="mt-2 max-w-[640px] text-[13px] leading-6 text-white/60">
            Semua event aktif dari sekolah. Filter sesuai kategori, lokasi, dan budget booth — kalau mau yang dipersonalisasi, coba{" "}
            <Link to="/umkm/ai-match/hasil" className="font-semibold text-[#FF8A00] underline underline-offset-4 hover:text-white">AI Match →</Link>
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="border-b border-[#E6ECF3] bg-white">
        <div className="mx-auto max-w-[1220px] px-5 py-4 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-[420px]">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                <FiSearch size={16} />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari event atau sekolah..."
                className="h-10 w-full rounded-full border border-[#E2E8F0] bg-white pl-10 pr-4 text-sm text-[#0B294D] placeholder:text-[#94A3B8] outline-none focus:border-[#1677FF]"
              />
            </div>
            <span className="hidden text-xs text-[#94A3B8] md:inline">{!isLoading && `${events.length} event`}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={resetFilter}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${!hasActiveFilter ? "border-[#1677FF] bg-[#EEF6FF] text-[#1677FF]" : "border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1]"}`}
            >
              Semua Event
            </button>

            <select value={category} onChange={(e) => setCategory(e.target.value)} className="appearance-none rounded-full border border-[#E2E8F0] bg-white px-4 py-1.5 pr-7 text-xs font-medium text-[#64748B] outline-none focus:border-[#1677FF]">
              <option value="">Kategori ▾</option>
              {CATEGORIES.filter(Boolean).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <select value={location} onChange={(e) => setLocation(e.target.value)} className="appearance-none rounded-full border border-[#E2E8F0] bg-white px-4 py-1.5 pr-7 text-xs font-medium text-[#64748B] outline-none focus:border-[#1677FF]">
              <option value="">Lokasi ▾</option>
              {LOCATIONS.filter(Boolean).map((l) => <option key={l} value={l}>{l}</option>)}
            </select>

            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="appearance-none rounded-full border border-[#E2E8F0] bg-white px-4 py-1.5 pr-7 text-xs font-medium text-[#64748B] outline-none focus:border-[#1677FF]">
              <option value="">Harga Booth ▾</option>
              <option value="300000">≤ Rp300.000</option>
              <option value="400000">≤ Rp400.000</option>
              <option value="500000">≤ Rp500.000</option>
              <option value="600000">≤ Rp600.000</option>
            </select>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-[1220px] px-5 py-6 md:px-8 md:py-6">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[280px] animate-pulse rounded-2xl bg-white shadow-sm" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-600">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677C8]">
              <FiCalendar size={22} />
            </div>
            <h3 className="mt-4 text-sm font-bold text-[#0B2340]">Belum ada event</h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-[#94A3B8]">Coba ubah filter atau cek lagi nanti. Event yang masih draft tidak ditampilkan di sini.</p>
            {hasActiveFilter && (
              <button type="button" onClick={resetFilter} className="mt-4 rounded-full border border-[#E2E8F0] bg-white px-5 py-2 text-xs font-semibold text-[#0B2340] hover:border-[#1677FF] hover:text-[#1677FF]">
                Reset filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((ev) => {
              const img = getEventImage(ev);
              const cats = ev.categories || (ev.category ? [ev.category] : []);
              return (
                <article
                  key={ev.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#E6ECF3] bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#C9D9EF] hover:shadow-md"
                >
                  <div className="relative h-[148px] overflow-hidden bg-[#EEF2F7]">
                    <img src={img} alt="" className="h-full w-full object-cover transition group-hover:scale-[1.02]" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                      {cats.slice(0, 3).map((c) => (
                        <span key={c} className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#0B2340] backdrop-blur">
                          {c}
                        </span>
                      ))}
                    </div>
                    <span className="absolute right-3 top-3 rounded-full bg-[#0B2340]/80 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
                      {ev.school?.name || ev.school_name || "Sekolah"}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-1 text-[15px] font-bold leading-tight text-[#0B2340] group-hover:text-[#1677C8]">
                      {ev.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#64748B]">
                      {ev.description || "Event kolaborasi sekolah dan UMKM."}
                    </p>

                    <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#EEF2F7] pt-3">
                      <div>
                        <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#94A3B8]">
                          <FiCalendar size={10} /> Tanggal
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#0B2340]">{fmtDate(ev.event_date)}</p>
                      </div>
                      <div>
                        <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#94A3B8]">
                          <FiMapPin size={10} /> Lokasi
                        </p>
                        <p className="mt-1 truncate text-xs font-semibold text-[#0B2340]">{ev.location}</p>
                      </div>
                      <div>
                        <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#94A3B8]">
                          <LuStore size={10} /> Booth
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#0B2340]">{ev.booth_capacity} slot</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Harga Booth</p>
                        <p className="flex items-center gap-1 text-sm font-extrabold text-[#0B2340]">
                          <FiDollarSign size={13} className="text-[#16A34A]" /> {fmtRp(ev.booth_price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openModal(ev)}
                        className="rounded-full bg-[#FF8A00] px-5 py-2 text-xs font-bold text-white shadow hover:bg-[#E67700]"
                      >
                        Daftar
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL DAFTAR — same as AiMatchUmkm */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button type="button" aria-label="Tutup" onClick={() => setShowModal(false)} className="absolute inset-0 bg-[#0B2340]/60 backdrop-blur-[2px]" />
          <div className="relative w-full max-w-[520px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="border-b border-[#EEF2F7] px-6 py-4">
              <h3 className="text-[16px] font-extrabold text-[#0B2340]">Kirim Pendaftaran</h3>
              <p className="mt-1 text-xs leading-5 text-[#64748B]">
                Kamu akan mendaftar di <span className="font-semibold text-[#0B2340]">{selectedEvent.name}</span> · {selectedEvent.school?.name || selectedEvent.school_name || ""} · Booth {fmtRp(selectedEvent.booth_price)}.
              </p>
            </div>
            <div className="space-y-4 px-6 py-5">
              <label className="block">
                <span className="text-xs font-semibold text-[#0B294D]">Pesan untuk Sekolah <span className="font-normal text-[#94A3B8]">(opsional, maks 2000)</span></span>
                <textarea value={modalMessage} onChange={(e) => setModalMessage(e.target.value)} maxLength={2000} rows={4} placeholder="Halo, saya tertarik mendaftar..." className="mt-1 w-full resize-none rounded-xl border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm text-[#0B2340] placeholder:text-[#94A3B8] outline-none focus:border-[#1677FF]" />
                <span className="mt-1 block text-right text-[11px] text-[#94A3B8]">{modalMessage.length}/2000</span>
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-[#0B294D]">Harga Penawaran <span className="font-normal text-[#94A3B8]">(opsional — kosongkan jika ikut harga booth)</span></span>
                <input value={modalPrice} onChange={(e) => setModalPrice(e.target.value.replace(/[^0-9]/g, ""))} inputMode="numeric" placeholder="mis. 350000" className="mt-1 h-10 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 text-sm text-[#0B2340] placeholder:text-[#94A3B8] outline-none focus:border-[#1677FF]" />
                {modalPrice && <span className="mt-1 block text-xs text-[#64748B]">≈ {fmtRp(Number(modalPrice))}</span>}
              </label>
              {applyMsg?.type === "error" && <p className="text-xs text-red-600">{applyMsg.text}</p>}
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-[#EEF2F7] bg-[#F8FAFD] px-6 py-4">
              <button type="button" onClick={() => setShowModal(false)} disabled={applying} className="rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#64748B] hover:bg-[#F1F5F9] disabled:opacity-60">Batal</button>
              <button type="button" onClick={handleApply} disabled={applying} className="rounded-full bg-[#FF8A00] px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-[#E67700] disabled:opacity-60">
                {applying ? "Mengirim..." : "Kirim Pendaftaran"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
