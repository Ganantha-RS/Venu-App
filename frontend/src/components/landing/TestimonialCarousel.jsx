import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function TestimonialCarousel({ testimonials = [] }) {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  if (total === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 text-center md:px-8">
      <h2 className="section-title">Apa Kata Mereka?</h2>

      <div className="relative mt-8 rounded-2xl bg-accent p-8 md:p-12">
        <button
          onClick={goPrev}
          aria-label="Testimoni sebelumnya"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-navy p-2 text-white hover:bg-navy-light"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-md">
          <p className="text-navy/80">“{testimonials[index].quote}”</p>
          <p className="mt-4 font-semibold text-navy">{testimonials[index].author}</p>
          <p className="text-sm text-navy/50">{testimonials[index].role}</p>
        </div>

        <button
          onClick={goNext}
          aria-label="Testimoni berikutnya"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-navy p-2 text-white hover:bg-navy-light"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
