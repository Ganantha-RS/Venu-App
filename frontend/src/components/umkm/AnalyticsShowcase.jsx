import {
    Bot,
    ChartNoAxesCombined,
    ChevronRight,
} from "lucide-react";

export default function AnalyticsShowcase({
    onClick,
}) {
    return (
        <section className="bg-surface px-4 py-16 md:px-8 md:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[46%_54%] md:gap-12">

                {/* =========================
            IMAGE KIRI
        ========================= */}
                <div className="flex justify-center md:justify-start">
                    <img
                        src="/analitik-showcase.png"
                        alt="Ilustrasi analitik event VENU"
                        className="w-full max-w-[360px] object-contain md:max-w-[390px]"
                    />
                </div>

                {/* =========================
            CONTENT KANAN
        ========================= */}
                <div className="max-w-xl">
                    {/* Heading */}
                    <h2 className="text-3xl font-extrabold leading-tight text-black md:text-4xl">
                        Analitik
                    </h2>

                    {/* Description */}
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-black md:text-[13px]">
                        Fitur ini merupakan fitur unggulan kami. Anda dapat
                        gunakan untuk mempermudah menganalisis usaha
                        Anda pada saat event.
                    </p>

                    {/* Feature highlights */}
                    <div className="mt-6 grid grid-cols-2 gap-5">

                        {/* AI */}
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                                <Bot size={20} strokeWidth={2} />
                            </div>

                            <div className="pt-0.5">
                                <p className="text-sm font-medium leading-tight text-black">
                                    Penggunaan
                                    <br />
                                    AI
                                </p>
                            </div>
                        </div>

                        {/* Analisis Otomatis */}
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                                <ChartNoAxesCombined
                                    size={20}
                                    strokeWidth={2}
                                />
                            </div>

                            <div className="pt-0.5">
                                <p className="text-sm font-medium leading-tight text-black">
                                    Analisis
                                    <br />
                                    Otomatis
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Benefit list */}
                    <ul className="mt-6 space-y-2.5">
                        <li className="flex items-start gap-3 text-[13px] leading-relaxed text-black">
                            <span className="mt-[5px] h-3 w-3 shrink-0 rounded-full bg-navy" />
                            <span>
                                Mempermudah Anda dalam menganalisis.
                            </span>
                        </li>

                        <li className="flex items-start gap-3 text-[13px] leading-relaxed text-black">
                            <span className="mt-[5px] h-3 w-3 shrink-0 rounded-full bg-navy" />
                            <span>
                                Akurasi analisis sesuai event berlangsung.
                            </span>
                        </li>

                        <li className="flex items-start gap-3 text-[13px] leading-relaxed text-black">
                            <span className="mt-[5px] h-3 w-3 shrink-0 rounded-full bg-navy" />
                            <span>
                                Penggunaan AI yang dapat
                                <br className="hidden md:block" />
                                dipertanggungjawabkan
                            </span>
                        </li>
                    </ul>

                    {/* Button */}
                    <button
                        type="button"
                        onClick={onClick}
                        className="mt-7 inline-flex items-center gap-3 rounded-full bg-navy px-7 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-light hover:shadow-md active:translate-y-0"
                    >
                        Analitik
                        <ChevronRight size={16} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </section>
    );
}