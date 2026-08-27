import EventCard from "./EventCard";

export default function NearbyEvents({ events = [], isLoading }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <h2 className="section-title text-center">Event Terdekat</h2>

      {isLoading ? (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl2 bg-navy/5" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="mt-8 text-center text-navy/50">
          Belum ada event terdekat saat ini.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
