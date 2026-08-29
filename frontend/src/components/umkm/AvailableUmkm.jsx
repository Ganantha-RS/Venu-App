import UmkmCard from "./UmkmCard";

export default function AvailableUmkm({
    umkms = [],
    isLoading = false,
}) {
    return (
        <section className="bg-surface px-4 py-14 md:px-8 md:py-16">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-center text-3xl font-extrabold text-black md:text-4xl">
                    UMKM Tersedia
                </h2>

                {isLoading ? (
                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm"
                            >
                                <div className="h-[150px] animate-pulse bg-navy/5" />

                                <div className="space-y-3 p-4">
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-navy/5" />
                                    <div className="h-3 w-1/2 animate-pulse rounded bg-navy/5" />
                                    <div className="h-3 w-2/3 animate-pulse rounded bg-navy/5" />
                                    <div className="h-3 w-5/6 animate-pulse rounded bg-navy/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : umkms.length === 0 ? (
                    <p className="mt-8 text-center text-sm text-navy/50">
                        Belum ada UMKM yang tersedia saat ini.
                    </p>
                ) : (
                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {umkms.map((umkm) => (
                            <UmkmCard
                                key={umkm.id}
                                umkm={umkm}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}