import { Building2, CalendarDays, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * @param {object} event - bentuk field mengikuti EventResource dari backend:
 *   { slug, name, event_date, location, booth_capacity, school: { name }, image_url }
 */
export default function EventCard({ event }) {
  const formattedDate = new Date(event.event_date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="overflow-hidden rounded-xl2 bg-white shadow-sm ring-1 ring-navy/5 transition hover:shadow-md">
      <img
        src={event.image_url || "/assets/event-placeholder.jpg"}
        alt={event.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-navy">{event.name}</h3>

        <ul className="mt-3 space-y-1.5 text-sm text-navy/60">
          <li className="flex items-center gap-2">
            <Building2 size={16} className="text-accent" />
            {event.school?.name}
          </li>
          <li className="flex items-center gap-2">
            <CalendarDays size={16} className="text-accent" />
            {formattedDate}
          </li>
          <li className="flex items-center gap-2">
            <LayoutGrid size={16} className="text-accent" />
            {event.booth_capacity} Tenant
          </li>
        </ul>

        <Link
          to={`/events/${event.slug}`}
          className="mt-4 inline-block text-sm font-semibold text-navy hover:text-accent"
        >
          Lihat Detail &gt;
        </Link>
      </div>
    </article>
  );
}
