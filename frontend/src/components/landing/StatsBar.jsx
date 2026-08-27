const DEFAULT_STATS = [
  { label: "Sekolah bergabung", value: "50+" },
  { label: "UMKM bergabung", value: "100+" },
  { label: "Kepuasan pengguna", value: "90%" },
  { label: "Event Terlaksana", value: "100%" },
];

export default function StatsBar({ stats = DEFAULT_STATS }) {
  return (
    <div className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 md:px-8">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-navy/10 shadow-lg md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white px-4 py-6 text-center">
            <p className="text-2xl font-extrabold text-navy md:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs text-navy/60 md:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
