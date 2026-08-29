import { School } from "lucide-react";
import React from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiShield,
  FiTarget,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";

import {
  LuStore,
  LuHouse,
  LuSparkles,
} from "react-icons/lu";
import SchoolNavbar from "../../components/layout/SchoolNavbar";

const AiMatchIntro = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-white font-sans text-[#0B294D]">
      <SchoolNavbar />
      <main className="relative">
        
        {/* BACKGROUND DECORATION */}
        <div className="pointer-events-none absolute left-[-120px] top-[85px] h-[300px] w-[300px] rounded-full bg-[#DCEBFF]" />

        <div className="pointer-events-none absolute right-[-80px] top-[150px] h-[250px] w-[250px] rounded-full bg-[#EFF7FF]" />

        {/* DOT PATTERN */}
        <div className="pointer-events-none absolute right-[-10px] top-[100px] hidden h-[100px] w-[230px] opacity-70 lg:block">
          <div className="absolute right-0 top-0 h-full w-full bg-[radial-gradient(#C9DDF5_1.5px,transparent_1.5px)] [background-size:8px_8px]" />
        </div>

        {/* ORANGE DECORATIVE LINE */}
        <svg
          className="pointer-events-none absolute right-[-20px] top-[170px] hidden h-[180px] w-[350px] lg:block"
          viewBox="0 0 350 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 150C100 40 170 40 235 75C280 100 310 100 350 70"
            stroke="#F59E0B"
            strokeWidth="1.5"
          />
        </svg>

        <div className="relative mx-auto max-w-[1080px] px-6 pb-12 pt-14">
          
          {/* =================================================
              HERO
          ================================================= */}
          <section className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              
              <LuSparkles
                size={25}
                strokeWidth={1.8}
                className="text-[#1677FF]"
              />

              <h1 className="text-[44px] font-extrabold tracking-[-2px] sm:text-[52px]">
                <span className="text-[#F59E0B]">
                  AI
                </span>{" "}
                <span className="text-[#0B294D]">
                  Match
                </span>
              </h1>

              <LuSparkles
                size={25}
                strokeWidth={1.8}
                className="text-[#1677FF]"
              />
            </div>

            <p className="mx-auto max-w-[600px] text-[16px] leading-7 text-[#244568]">
              Temukan event yang paling cocok untuk UMKM-mu
              <br className="hidden sm:block" />
              atau UMKM yang sesuai dengan kebutuhan sekolah.
            </p>
          </section>

          {/* =================================================
              MATCH OPTIONS
          ================================================= */}
          <section className="grid gap-7 md:grid-cols-2">
            
            {/* =============================================
                UMKM → EVENT
            ============================================== */}
            <div className="group rounded-[18px] border border-slate-200 bg-white p-2 shadow-[0_8px_30px_rgba(11,41,77,0.05)]">
              <div className="relative min-h-[350px] overflow-hidden rounded-[14px] border border-[#FFB8B8] bg-[#FFF0F0] px-8 py-7">
                
                {/* DECORATION */}
                <div className="absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-white/40" />

                <div className="relative z-10 grid h-full grid-cols-[155px_1fr] items-center gap-5">
                  
                  {/* ILLUSTRATION */}
                  <div className="flex flex-col items-center justify-center">
                    
                    <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#EF2029] text-white shadow-lg">
                      <LuStore
                        size={30}
                        strokeWidth={1.8}
                      />
                    </div>

                    {/* BOOK / BOOTH ILLUSTRATION */}
                    <div className="relative">
                      <div className="relative h-[135px] w-[105px] -rotate-[5deg] rounded-md bg-[#D71920] shadow-lg">
                        
                        <div className="absolute left-4 top-4 h-[110px] w-[75px] rounded bg-[#FFF5F5]" />

                        {/* BOOTH */}
                        <div className="absolute -bottom-1 left-[22px] h-[65px] w-[67px] rounded-t-[8px] border-[3px] border-[#B91C1C] bg-[#FFF8F2]">
                          
                          {/* ROOF */}
                          <div className="absolute -top-[13px] left-[-4px] h-[15px] w-[70px] bg-[#D71920]" />

                          {/* CENTER LINE */}
                          <div className="absolute left-[28px] top-[20px] h-[40px] w-[3px] bg-[#B91C1C]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h2 className="mb-2 text-[24px] font-extrabold tracking-[-0.8px]">
                      <span className="text-[#B91C1C]">
                        UMKM
                      </span>{" "}

                      <span className="font-medium text-[#EF2029]">
                        →
                      </span>{" "}

                      <span className="text-[#0B294D]">
                        Event
                      </span>
                    </h2>

                    <p className="mb-5 max-w-[280px] text-[12px] leading-5 text-[#244568]">
                      Dapatkan rekomendasi event yang paling cocok
                      untuk bisnismu.
                    </p>

                    <div className="space-y-2.5">
                      {[
                        "Cocok berdasarkan produk & kategori",
                        "Target pengunjung yang sesuai",
                        "Lokasi strategis",
                        "Budget yang pas",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-[11px] text-[#244568]"
                        >
                          <FiCheckCircle
                            size={14}
                            className="shrink-0 text-[#EF2029]"
                          />

                          <span>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="mt-6 inline-flex items-center gap-5 rounded-lg bg-[#C9141A] px-4 py-2.5 text-[11px] font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#A90F14]"
                    >
                      Temukan Event untuk Usahamu

                      <FiArrowRight
                        size={17}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* =============================================
                SEKOLAH → UMKM
            ============================================== */}
            <div className="group rounded-[18px] border border-slate-200 bg-white p-2 shadow-[0_8px_30px_rgba(11,41,77,0.05)]">
              <div className="relative min-h-[350px] overflow-hidden rounded-[14px] border border-[#8BC4FF] bg-[#EEF8FF] px-8 py-7">
                
                {/* DECORATION */}
                <div className="absolute -bottom-24 -right-20 h-52 w-52 rounded-full bg-white/50" />

                <div className="relative z-10 grid h-full grid-cols-[155px_1fr] items-center gap-5">
                  
                  {/* ILLUSTRATION */}
                  <div className="flex flex-col items-center justify-center">
                    
                    <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#2784D8] text-white shadow-lg">
                      <LuHouse
                        size={29}
                        strokeWidth={1.8}
                      />
                    </div>

                    {/* SCHOOL ILLUSTRATION */}
                    <div className="relative h-[140px] w-[145px]">
                      
                      {/* BUILDING */}
                      <div className="absolute bottom-0 left-[15px] h-[95px] w-[115px] rounded-t-xl border-2 border-[#2C83D4] bg-white shadow-md">
                        
                        {/* ROOF */}
                        <div className="absolute -top-[34px] left-[10px] h-0 w-0 border-b-[36px] border-l-[48px] border-r-[48px] border-b-[#559FE2] border-l-transparent border-r-transparent" />

                        {/* CENTER TOWER */}
                        <div className="absolute -top-[48px] left-[46px] h-[48px] w-[28px] border-2 border-[#2C83D4] bg-white" />

                        {/* CLOCK */}
                        <div className="absolute -top-[39px] left-[51px] flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#2C83D4] bg-white text-[7px]">
                          12
                        </div>

                        {/* WINDOWS */}
                        <div className="absolute left-[14px] top-[20px] h-[25px] w-[18px] rounded border border-[#2C83D4] bg-[#DCEEFF]" />

                        <div className="absolute right-[14px] top-[20px] h-[25px] w-[18px] rounded border border-[#2C83D4] bg-[#DCEEFF]" />

                        {/* DOOR */}
                        <div className="absolute bottom-0 left-[45px] h-[48px] w-[27px] rounded-t-xl border border-[#2C83D4] bg-[#DCEEFF]" />
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h2 className="mb-2 text-[24px] font-extrabold tracking-[-0.8px]">
                      <span className="text-[#2478D4]">
                        Sekolah
                      </span>{" "}

                      <span className="font-medium text-[#2478D4]">
                        →
                      </span>{" "}

                      <span className="text-[#0B294D]">
                        UMKM
                      </span>
                    </h2>

                    <p className="mb-5 max-w-[280px] text-[12px] leading-5 text-[#244568]">
                      Temukan UMKM yang sesuai dengan kebutuhan
                      event sekolahmu.
                    </p>

                    <div className="space-y-2.5">
                      {[
                        "Rekomendasi UMKM terbaik",
                        "Sesuai kategori kebutuhan",
                        "Lihat profil & portofolio",
                        "Mudah ajukan kerja sama",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-[11px] text-[#244568]"
                        >
                          <FiCheckCircle
                            size={14}
                            className="shrink-0 text-[#1677FF]"
                          />

                          <span>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="mt-6 inline-flex items-center gap-5 rounded-lg bg-[#2478D4] px-4 py-2.5 text-[11px] font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#1765BB]"
                    >
                      Temukan UMKM untuk Eventmu

                      <FiArrowRight
                        size={17}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              WHY AI MATCH
          ================================================= */}
          <section className="mt-8 rounded-[18px] border border-[#D6E8F9] bg-[#EFF8FF] px-7 py-6 sm:px-9">
            
            <h2 className="mb-6 text-[21px] font-extrabold tracking-[-0.5px]">
              Mengapa AI Match{" "}
              <span className="text-[#F59E0B]">
                VENU
              </span>
              ?
            </h2>

            <div className="grid gap-7 md:grid-cols-3">
              
              {/* ACCURATE */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D7EBFF] text-[#1677FF]">
                  <FiTarget
                    size={25}
                  />
                </div>

                <div>
                  <h3 className="mb-1 text-[15px] font-bold text-[#1677FF]">
                    Akurat & Relevan
                  </h3>

                  <p className="text-[10px] leading-4 text-[#244568]">
                    AI kami menganalisis data untuk memberikan
                    rekomendasi paling cocok untukmu.
                  </p>
                </div>
              </div>

              {/* TIME */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D7EBFF] text-[#1677FF]">
                  <FiClock
                    size={25}
                  />
                </div>

                <div>
                  <h3 className="mb-1 text-[15px] font-bold text-[#1677FF]">
                    Hemat Waktu
                  </h3>

                  <p className="text-[10px] leading-4 text-[#244568]">
                    Temukan peluang terbaik atau partner tepat
                    tanpa perlu mencari satu per satu.
                  </p>
                </div>
              </div>

              {/* SECURITY */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D7EBFF] text-[#1677FF]">
                  <FiShield
                    size={25}
                  />
                </div>

                <div>
                  <h3 className="mb-1 text-[15px] font-bold text-[#1677FF]">
                    Aman & Terpercaya
                  </h3>

                  <p className="text-[10px] leading-4 text-[#244568]">
                    Semua data dan proses dijaga dengan sistem
                    keamanan berstandar tinggi.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              BOTTOM BADGE
          ================================================= */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-[#DDECF9] bg-[#F3F9FF] px-4 py-2 text-[10px] text-[#244568] shadow-sm">
              
              <FiShield
                size={13}
                className="text-[#1677FF]"
              />

              <span>
                Didukung AI pintar untuk hasil yang lebih relevan
                dan akurat.
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AiMatchIntro;