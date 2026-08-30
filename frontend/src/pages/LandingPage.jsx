import Hero from "../components/landing/Hero";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../context/useAuth";

import About from "../components/landing/About";
import FeaturesSection from "../components/landing/FeaturesSection";
import CtaSection from "../components/landing/CtaSection";
import HowItWorks from "../components/landing/HowItWorks";
import TestimonialsSection from "../components/landing/TestimonialsSection";

export default function Beranda() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-surface">
      <Navbar user={user} />

      <main>
        <section id="beranda" className="scroll-mt-20">
          <Hero user={user} />
        </section>

        <section id="tentang" className="scroll-mt-20">
          <About />
        </section>

        <section id="fitur" className="scroll-mt-20">
          <FeaturesSection />
        </section>

        <CtaSection />

        <section id="cara-kerja" className="scroll-mt-20">
          <HowItWorks />
        </section>

        <section id="testimoni" className="scroll-mt-20">
          <TestimonialsSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}