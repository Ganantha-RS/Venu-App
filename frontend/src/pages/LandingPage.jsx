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
  const { user } = useAuth(); // null kalau belum login

  const scrollToEvents = () => {
    document.getElementById("nearby-events")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar user={user} />
      <Hero user={user} onFindEventClick={scrollToEvents} />
      <About />
      <FeaturesSection />
      <CtaSection />
      <HowItWorks />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
