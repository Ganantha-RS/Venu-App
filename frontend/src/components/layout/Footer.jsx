export default function Footer() {
  return (
    <footer className="bg-navy-dark px-4 py-12 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-2xl font-extrabold">
          <span className="text-accent">V</span>ENU
        </p>
        <p className="mt-1 text-accent/90">Mitra Event Terpercaya</p>

        <div className="mt-8 h-px w-40 bg-white/20" />

        <p className="mt-6 text-sm text-white/40">
          © {new Date().getFullYear()} VENU. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
