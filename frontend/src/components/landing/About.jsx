import MarqueeBanner from "./MarqueeBanner";

export default function About() {
    return (
        <section className="relative overflow-hidden bg-surface-muted">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 md:px-8">
                <div className="grid items-center gap-10 md:grid-cols-2">
                    {/* Kolom kiri: logo VEN + deskripsi */}
                    <div>
                        <div className="inline-flex items-center gap-1">
                            <h2 className="text-4xl font-extrabold text-navy">VEN</h2>
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path d="M14 2 L17 10 L25 12 L17 14 L14 22 L11 14 L3 12 L11 10 Z" fill="#FEA232" />
                            </svg>
                        </div>
                        <span className="mt-1 block h-1 w-16 rounded-full bg-accent" />

                        <p className="mt-6 max-w-md text-navy/70">
                            VEN merupakan bot pada website kami yang dirancang untuk
                            membantu Anda menemukan dan menyinkronkan UMKM dengan sekolah
                            yang sedang mengadakan event.
                        </p>
                    </div>

                    {/* Kolom kanan: ilustrasi maskot dalam lengkungan navy */}
                    <div className="relative flex justify-center">
                        <div className="relative h-80 w-64 overflow-hidden rounded-t-full bg-navy shadow-xl md:h-96 md:w-72">
                            <img
                                src="/assets/mascot-ven.png"
                                alt="Maskot AI VEN melambaikan tangan"
                                className="absolute bottom-0 left-1/2 h-[92%] w-auto -translate-x-1/2 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Dekorasi lingkaran biru, pojok kiri atas & bawah */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full border-[10px] border-sky-400/70"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full border-[10px] border-sky-400/70"
            />

            <MarqueeBanner />
        </section>
    );
}