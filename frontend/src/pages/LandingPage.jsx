import AiAssistantIntro from "../components/landing/AiAssistantIntro";
import AnalyticsShowcase from "../components/landing/AnalyticsShowcase";
import CtaBanner from "../components/landing/CtaBanner";
import Hero from "../components/landing/Hero";
import NearbyEvents from "../components/landing/NearbyEvents";
import StatsBar from "../components/landing/StatsBar";
import TestimonialCarousel from "../components/landing/TestimonialCarousel";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { useNearbyEvents } from "../features/event-discovery/useNearbyEvents";
import { useAuth } from "../context/useAuth";

// Testimoni sementara pakai data statis dulu, gampang diganti ke API kalau sudah ada endpoint-nya
const TESTIMONIALS = [
  {
    quote: "Lihat performa event kamu tanpa ribet dan susah? Ayo analisis.",
    author: "Kreasi Lokal",
    role: "Mitra UMKM",
  },
];

export default function Beranda() {
  const { user } = useAuth(); // null kalau belum login
  const { events, isLoading } = useNearbyEvents(3);

  const scrollToEvents = () => {
    document.getElementById("nearby-events")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar user={user} />
      <Hero user={user} onFindEventClick={scrollToEvents} />
      <StatsBar />
      <AiAssistantIntro onSyncClick={() => { }} />

      <div id="nearby-events">
        <NearbyEvents events={events} isLoading={isLoading} />
      </div>

      <CtaBanner />
      <AnalyticsShowcase />
      <TestimonialCarousel testimonials={TESTIMONIALS} />
      <Footer />
    </div>
  );
}
