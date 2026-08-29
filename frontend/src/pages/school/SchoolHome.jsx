import SchoolNavbar from "../../components/layout/SchoolNavbar";
import StatsBar from "../../components/common/StatsBar";
import AiAssistantIntro from "../../components/common/AiAssistantIntro";
import NearbyEvents from "../../components/common/NearbyEvents";
import { useNearbyEvents } from "../../features/event-discovery/useNearbyEvents";

export default function SchoolHome() {
  const { events, isLoading } = useNearbyEvents(3);

  return (
    <div className="min-h-screen bg-surface">
      <SchoolNavbar />

      <main>
        {/* Hero nanti */}
        <StatsBar />

        <AiAssistantIntro
          description="Disini aku akan membantu kamu menyinkronkan event kamu dengan UMKM yang bersedia untuk bekerjasama."
          buttonText="Ayo sinkronkan"
        />

        <NearbyEvents
          events={events}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}