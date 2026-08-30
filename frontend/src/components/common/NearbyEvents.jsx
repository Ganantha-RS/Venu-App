import { Building2, CalendarDays, Store } from "lucide-react";
import { Link } from "react-router-dom";

const nearbyEvents = [
    {
        id: 1,
        name: "Festival Budaya",
        school: "SMK Negeri 26 Jakarta",
        date: "21 – 23 November 2026",
        tenant: "24 Tenant",
        image: "/img/budaya.png",
        slug: "festival-budaya",
    },
    {
        id: 2,
        name: "Market Day",
        school: "SMK Negeri 48 Jakarta",
        date: "21 – 23 November 2026",
        tenant: "24 Tenant",
        image: "/img/MarketDay.png",
        slug: "market-day",
    },
    {
        id: 3,
        name: "Expo Karya Siswa",
        school: "SMK Negeri 26 Jakarta",
        date: "21 – 23 November 2026",
        tenant: "24 Tenant",
        image: "/img/expo.png",
        slug: "expo-karya-siswa",
    },
];

export default function NearbyEvents() {
    return (
        <section className="bg-[#f7f9fc] px-4 py-16 md:px-8 md:py-20">
            <div className="mx-auto max-w-[1250px]">

                {/* TITLE */}
                <h2 className="text-center text-4xl font-extrabold tracking-tight text-black md:text-5xl">
                    Event Terdekat
                </h2>

                {/* EVENT CARDS */}
                <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
                    {nearbyEvents.map((event) => (
                        <article
                            key={event.id}
                            className="group overflow-hidden rounded-[20px] bg-white shadow-[0_3px_8px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                        >
                            {/* IMAGE */}
                            <div className="h-[205px] w-full overflow-hidden bg-slate-200">
                                <img
                                    src={event.image}
                                    alt={event.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="px-5 pb-5 pt-6">

                                {/* EVENT NAME */}
                                <h3 className="text-[26px] font-extrabold leading-tight text-black">
                                    {event.name}
                                </h3>

                                {/* SCHOOL */}
                                <div className="mt-7 flex items-center gap-3">
                                    <Building2
                                        size={27}
                                        strokeWidth={2}
                                        className="shrink-0 text-[#ff9d2e]"
                                    />

                                    <span className="text-[17px] font-semibold text-black">
                                        {event.school}
                                    </span>
                                </div>

                                {/* DATE */}
                                <div className="mt-5 flex items-center gap-3">
                                    <CalendarDays
                                        size={27}
                                        strokeWidth={2}
                                        className="shrink-0 text-[#ff9d2e]"
                                    />

                                    <span className="text-[17px] font-semibold text-black">
                                        {event.date}
                                    </span>
                                </div>

                                {/* TENANT */}
                                <div className="mt-5 flex items-center gap-3">
                                    <Store
                                        size={27}
                                        strokeWidth={2}
                                        className="shrink-0 text-[#ff9d2e]"
                                    />

                                    <span className="text-[17px] font-semibold text-black">
                                        {event.tenant}
                                    </span>
                                </div>

                                {/* DETAIL */}
                                <div className="mt-11 flex justify-end">
                                    <Link
                                        to={`/events/${event.slug}`}
                                        className="text-[17px] font-bold text-black transition-colors hover:text-[#ff9d2e]"
                                    >
                                        Lihat Detail &gt;
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}