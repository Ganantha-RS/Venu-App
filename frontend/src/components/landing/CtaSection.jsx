import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CtaSection() {
    return (
        <section className="relative overflow-hidden bg-navy py-20 md:py-28">
            {/* Glow radial di belakang, dari kanan */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-sky-500/20 blur-3xl"
            />

            {/* Starburst dekoratif pojok kanan atas */}
            <svg
                aria-hidden="true"
                className="pointer-events-none absolute right-10 top-6 h-16 w-16 text-sky-400/40 md:right-20 md:h-24 md:w-24"
                viewBox="0 0 100 100"
                fill="currentColor"
            >
                <path d="M50 0 L58 40 L100 50 L58 60 L50 100 L42 60 L0 50 L42 40 Z" />
            </svg>

            <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
                {/* Kolom kiri: headline */}
                <div>
                    <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
                        Temukan Peluang Baru
                        <br />
                        Bersama <span className="text-accent">VENU</span>.
                    </h2>
                    <span className="mt-5 block h-1 w-24 rounded-full bg-white" />
                </div>

                {/* Kolom kanan: card miring + panah dekoratif */}
                <div className="relative flex justify-center py-10 md:justify-end md:py-0">
                    {/* Panah lengkung kiri, menuju card */}
                    <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-4 top-0 hidden h-28 w-28 text-sky-300/60 md:block"
                        viewBox="0 0 120 120"
                        fill="none"
                    >
                        <defs>
                            <marker
                                id="arrowheadLeft"
                                markerWidth="8"
                                markerHeight="8"
                                refX="4"
                                refY="4"
                                orient="auto"
                            >
                                <path d="M0 0 L8 4 L0 8 Z" fill="currentColor" />
                            </marker>
                        </defs>
                        <path
                            d="M10 10 C 10 70, 55 85, 105 88"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="5 5"
                            markerEnd="url(#arrowheadLeft)"
                        />
                    </svg>

                    {/* Panah lengkung kanan bawah, keluar dari card */}
                    <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-6 -right-2 hidden h-24 w-24 text-sky-300/60 md:block"
                        viewBox="0 0 120 120"
                        fill="none"
                    >
                        <defs>
                            <marker
                                id="arrowheadRight"
                                markerWidth="8"
                                markerHeight="8"
                                refX="4"
                                refY="4"
                                orient="auto"
                            >
                                <path d="M0 0 L8 4 L0 8 Z" fill="currentColor" />
                            </marker>
                        </defs>
                        <path
                            d="M10 20 C 40 40, 60 70, 110 100"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="5 5"
                            markerEnd="url(#arrowheadRight)"
                        />
                    </svg>

                    {/* Card miring */}
                    <div className="relative w-72 -rotate-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-300 p-6 shadow-2xl md:w-80">
                        {/* Ornamen lengkung pojok kiri atas */}
                        <svg
                            aria-hidden="true"
                            className="absolute left-4 top-4 h-8 w-8 text-white/70"
                            viewBox="0 0 40 40"
                            fill="none"
                        >
                            <path
                                d="M2 2 Q2 20 20 20 Q38 20 38 38"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                        </svg>

                        <p className="relative mt-10 text-lg font-bold leading-snug text-navy">
                            Saatnya Terhubung dan Berkembang Bersama Kami!
                        </p>

                        <Link
                            to="/login"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-light"
                        >
                            Mulai mencoba
                            <ArrowRight size={16} />
                        </Link>

                        {/* Ornamen kelopak kecil pojok kiri bawah */}
                        <svg
                            aria-hidden="true"
                            className="absolute bottom-3 left-3 h-6 w-6 text-white/50"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2 C14 8 16 10 22 12 C16 14 14 16 12 22 C10 16 8 14 2 12 C8 10 10 8 12 2 Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}