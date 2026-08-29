import { Award } from "lucide-react";

const MARQUEE_ITEMS = [
    "Mitra terpercaya",
    "Proses mudah",
    "Peluang lebih luas",
    "Dukungan cerdas",
];

/**
 * Banner teks berjalan (marquee) dengan ikon di antara tiap kalimat,
 * dilapis di atas strip navy yang dimiringkan.
 * Dipakai di About.jsx, tapi dibuat terpisah supaya bisa dipakai ulang
 * di section lain kalau perlu.
 */
export default function MarqueeBanner() {
    return (
        <div className="relative mt-16">
            {/* Strip navy full-width, dimiringkan, nongol di atas bar kuning */}
            <div
                aria-hidden="true"
                className="absolute inset-x-[-10%] bottom-0 z-0 h-12 origin-bottom-left -skew-y-2 bg-navy md:h-16"
            />

            {/* Bar marquee kuning, full width, di atas navy */}
            <div className="relative z-10 overflow-hidden bg-accent py-4">
                <div className="flex w-max animate-marquee">
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                        <span
                            key={`${item}-${i}`}
                            className="flex shrink-0 items-center gap-2 whitespace-nowrap px-6 text-lg font-extrabold text-navy"
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-navy text-white">
                                <Award size={16} />
                            </span>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}