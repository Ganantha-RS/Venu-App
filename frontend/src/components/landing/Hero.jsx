import { ChevronRight } from "lucide-react";
import Button from "../common/Button";

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-surface-muted">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
        {/* Kolom kiri: copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Hubungkan Usahamu
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-navy md:text-6xl">
            Temukan Ruang
            <br />
            <span className="text-accent">Kembangkan Usaha</span>
          </h1>

          <p className="mt-6 max-w-lg text-navy/60 md:text-lg">
            Platform digital yang mempertemukan sekolah, UMKM, dan
            pengunjung dalam menciptakan peluang usaha serta menghidupkan
            potensi bisnis lokal di lingkungan sekolah.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button as="a" href="/events" variant="primary">
              Temukan Event
              <ChevronRight size={18} />
            </Button>
            <Button as="a" href="/register" variant="outline">
              Daftarkan Usahamu
            </Button>
          </div>
        </div>

        {/* Kolom kanan: komposisi visual bentuk pita/ribbon */}
        <div className="relative hidden md:block" aria-hidden="true">
          <div className="relative mx-auto h-[420px] w-[380px]">
            {/* badan pita navy */}
            <div className="absolute inset-x-6 top-0 h-full rounded-t-2xl bg-navy" />
            {/* ujung pita (potongan V di bawah) */}
            <div
              className="absolute inset-x-6 bottom-0 h-16 bg-navy"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 60%, 0 100%)" }}
            />
            {/* foto/gambar besar */}
            <img
              src="/assets/landing-hero-1.jpg"
              alt="Suasana event UMKM di sekolah"
              className="absolute left-1/2 top-6 h-64 w-[92%] -translate-x-1/2 rounded-2xl object-cover shadow-lg"
            />
            {/* dua foto kecil berdampingan di bawah */}
            <img
              src="/assets/landing-hero-2.jpg"
              alt="Produk UMKM"
              className="absolute bottom-4 left-1/2 h-40 w-[44%] -translate-x-[52%] rounded-2xl object-cover shadow-lg"
            />
            <img
              src="/assets/landing-hero-3.jpg"
              alt="Pengunjung event"
              className="absolute bottom-4 right-1/2 h-40 w-[44%] translate-x-[52%] rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}