export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-navy-dark">
      <img
        src="/assets/cta-banner-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-14 text-center md:px-8">
        <h2 className="text-xl font-bold text-white md:text-2xl">
          Cari lebih banyak event yang sedang berlangsung.
          <br />
          Daftarkan usahamu.
        </h2>
        <a href="/events" className="btn-accent mt-6 inline-flex">
          Cari event
        </a>
      </div>
    </section>
  );
}
