import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useState } from "react";

// Data testimoni — bisa lebih dari 6, carousel-nya otomatis looping
const TESTIMONIALS = [
    {
        name: "GananRev",
        role: "Pemilik Usaha Minuman",
        rating: 5,
        quote: "Apa ini? keren sekali sangat membantu kami para UMKM.",
        avatarUrl: null,
    },
    {
        name: "James",
        role: "Pemilik Usaha Makanan",
        rating: 5,
        quote: "Bagus sekali mudah bagi kami mendapat informasi, mantap.",
        avatarUrl: "/assets/testimonial-james.jpg",
    },
    {
        name: "Rayaa's",
        role: "Pemilik Usaha Aksesoris",
        rating: 5,
        quote: "Fitur pencarian event dan pendaftaran tenant benar-benar praktis sekali.",
        avatarUrl: null,
    },
    {
        name: "Studio Kreatif",
        role: "Pemilik Usaha Craft",
        rating: 4,
        quote: "Proses daftar tenant jadi jauh lebih cepat dibanding cara manual.",
        avatarUrl: null,
    },
    {
        name: "Kreasi Lokal",
        role: "Pemilik Usaha Fashion",
        rating: 5,
        quote: "AI Match-nya beneran ngasih rekomendasi event yang relevan.",
        avatarUrl: null,
    },
];

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = TESTIMONIALS.length;

    const goPrev = () => setActiveIndex((i) => (i - 1 + total) % total);
    const goNext = () => setActiveIndex((i) => (i + 1) % total);

    const prevIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;

    return (
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
            <h2 className="text-center text-3xl font-extrabold text-navy md:text-4xl">
                Apa Kata Mereka?
            </h2>

            <div className="relative mt-10">
                {/* Panah kiri */}
                <button
                    onClick={goPrev}
                    aria-label="Testimoni sebelumnya"
                    className="absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy p-3 text-white shadow-lg transition hover:bg-navy-light"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Panah kanan */}
                <button
                    onClick={goNext}
                    aria-label="Testimoni berikutnya"
                    className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 rounded-full bg-navy p-3 text-white shadow-lg transition hover:bg-navy-light"
                >
                    <ChevronRight size={20} />
                </button>

                {/* Wadah oranye + 3 kartu */}
                <div className="rounded-[2.5rem] bg-accent px-6 py-10 md:px-14 md:py-14">
                    <div className="flex items-center justify-center gap-3 md:gap-6">
                        <TestimonialCard
                            key={`prev-${prevIndex}`}
                            testimonial={TESTIMONIALS[prevIndex]}
                            variant="side"
                            className="hidden sm:block"
                        />
                        <TestimonialCard
                            key={`active-${activeIndex}`}
                            testimonial={TESTIMONIALS[activeIndex]}
                            variant="active"
                        />
                        <TestimonialCard
                            key={`next-${nextIndex}`}
                            testimonial={TESTIMONIALS[nextIndex]}
                            variant="side"
                            className="hidden sm:block"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ testimonial, variant, className = "" }) {
    const isActive = variant === "active";

    return (
        <article
            className={`shrink-0 rounded-2xl bg-white shadow-md transition-all duration-300 ${isActive
                    ? "z-10 w-full max-w-xs scale-100 p-6 md:max-w-sm md:p-7"
                    : "w-40 scale-90 p-4 opacity-90 md:w-56 md:p-5"
                } ${className}`}
        >
            <div className="flex items-center gap-3">
                {testimonial.avatarUrl ? (
                    <img
                        src={testimonial.avatarUrl}
                        alt={testimonial.name}
                        className={`rounded-full object-cover ${isActive ? "h-12 w-12" : "h-9 w-9"}`}
                    />
                ) : (
                    <span className={`rounded-full bg-navy/10 ${isActive ? "h-12 w-12" : "h-9 w-9"}`} />
                )}

                <div>
                    <p className={`font-bold text-navy ${isActive ? "text-base" : "text-sm"}`}>
                        {testimonial.name}
                    </p>
                    <div className="mt-0.5 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={isActive ? 14 : 11}
                                className={i < testimonial.rating ? "fill-accent text-accent" : "text-navy/15"}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <p className={`mt-2 text-navy/50 ${isActive ? "text-sm" : "text-xs"}`}>
                {testimonial.role}
            </p>

            <Quote
                size={isActive ? 22 : 16}
                className="mt-3 rotate-180 text-navy/20"
                fill="currentColor"
            />

            <p className={`mt-2 font-medium text-navy/80 ${isActive ? "text-base" : "text-xs"}`}>
                {testimonial.quote}
            </p>
        </article>
    );
}