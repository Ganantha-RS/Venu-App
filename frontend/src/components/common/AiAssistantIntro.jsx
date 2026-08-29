import Button from "./Button";

export default function AiAssistantIntro({
    description = "Disini aku akan membantu kamu menyinkronkan usaha kamu dengan event yang sedang berlangsung.",
    buttonText = "Ayo sinkronkan",
    onClick,
}) {
    return (
        <section className="relative overflow-hidden py-8 md:py-16 bg-white">
            {/* Dekorasi background kanan */}
            <div
                aria-hidden="true"
                className="absolute -right-20 top-0 h-full w-[42%] bg-blue-200"
                style={{
                    clipPath: "ellipse(65% 75% at 80% 50%)",
                }}
            />

            <div className="relative mx-auto flex min-h-[360px] max-w-6xl items-center px-6 py-14 md:min-h-[390px] md:px-10">
                {/* Content kiri */}
                <div className="relative z-10 w-full md:w-[58%]">
                    <h2 className="text-3xl font-extrabold leading-tight text-navy md:text-4xl">
                        Halo aku VEN
                        <span className="ml-1 inline-block text-accent">⌁</span>
                    </h2>

                    <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-navy/80 md:text-lg">
                        {description}
                    </p>

                    <div className="mt-8">
                        <Button
                            type="button"
                            variant="primary"
                            onClick={onClick}
                            className="rounded-full px-12 py-3 font-bold"
                        >
                            {buttonText}
                        </Button>
                    </div>
                </div>

                {/* Area VEN */}
                <div
                    className="absolute bottom-0 right-0 hidden h-[360px] w-[43%] md:block"
                    aria-label="VEN AI Assistant"
                >
                    {/* Speech Bubble */}
                    <div className="absolute left-0 top-5 z-20 w-[145px] rounded-md bg-white px-3 py-2 text-[10px] font-semibold leading-tight text-navy shadow-[0_2px_6px_rgba(0,0,0,0.18)]">
                        Aku akan membantu
                        <br />
                        kamu mencari event
                        <br />
                        yang cocok

                        {/* Tail / arah bubble ke robot */}
                        <span
                            aria-hidden="true"
                            className="absolute -right-[18px] bottom-[10px] h-0 w-0 border-y-[9px] border-l-[18px] border-y-transparent border-l-white"
                        />

                        {/* Garis kecil tambahan agar tail lebih natural */}
                        <span
                            aria-hidden="true"
                            className="absolute -right-[23px] bottom-[6px] h-[14px] w-[8px] rotate-[-28deg] rounded-full bg-white"
                        />
                    </div>

                    {/* Robot */}
                    <img
                        src="/venBot_image.png"
                        alt="VEN AI Assistant"
                        className="absolute right-6 z-10 h-[420px] w-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
}