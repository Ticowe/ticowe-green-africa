"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0F4C4C]">
      {/* Background texture / gradient layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#1a6b5a_0%,_#0F4C4C_50%,_#0a2e2e_100%)] opacity-80" />
      {/* Subtle noise / grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Decorative circle blobs */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#D7992E]/10 blur-3xl" />
      <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[#C65D3A]/10 blur-3xl" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-16 px-6 py-24 lg:flex-row lg:gap-12 lg:px-16">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          {/* Eyebrow tag */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D7992E]/30 bg-[#D7992E]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#D7992E]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#D7992E]" />
            Green Africa Initiative
          </motion.span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl xl:text-6xl">
            Building Sustainable
            <span className="block text-[#D7992E]">
              Communities &amp; Futures
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#E6EFEA]/80 lg:mx-0 mx-auto">
            TICOWE Green Africa empowers women, youth, farmers, and vulnerable
            communities through sustainable agriculture, education, climate-smart
            innovation, and community development.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5 lg:justify-start">
            <Link
              href="/donate"
              className="rounded-2xl bg-[#C65D3A] px-8 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#D7992E]"
            >
              Donate Now
            </Link>
            <Link
              href="/programs"
              className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#0F4C4C]"
            >
              Explore Programs
            </Link>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-6 lg:justify-start"
          >
            {[
              { value: "120K+", label: "Lives Impacted" },
              { value: "15+", label: "Counties" },
              { value: "10 Yrs", label: "Of Service" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-[#D7992E]">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex-1"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
            <Image
              src="/hero.jpg"
              alt="TICOWE Community"
              width={700}
              height={700}
              className="h-[500px] w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>

          {/* Floating Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute -bottom-10 left-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
          >
            <h3 className="text-3xl font-bold text-[#D7992E]">120K+</h3>
            <p className="mt-1 text-sm text-white">
              Farmers &amp; Community Members Reached
            </p>
          </motion.div>

          {/* Secondary floating badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -right-4 top-8 rounded-2xl border border-white/10 bg-[#D7992E]/90 px-4 py-3 backdrop-blur-md shadow-lg"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              🌱 Climate Smart
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
