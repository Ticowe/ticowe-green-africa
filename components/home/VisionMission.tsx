"use client";

import { useState } from "react";
import Link from "next/link";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const coreValues = [
  {
    number: "01",
    title: "People-Centered",
    desc: "People are at the very center and heart of development — they are the forces behind all we do and every endeavor we undertake.",
    color: "from-[#0F4C4C] to-[#145B5B]",
    accent: "#D7992E",
  },
  {
    number: "02",
    title: "Transparency & Accountability",
    desc: "Transparency and accountability drive every action and decision we take as an organisation.",
    color: "from-[#1E4E3F] to-[#0F4C4C]",
    accent: "#C65D3A",
  },
  {
    number: "03",
    title: "Sustainability",
    desc: "Sustainability is built into every intervention we pursue — we design programs that last long after we leave.",
    color: "from-[#145B5B] to-[#1A3A2A]",
    accent: "#D7992E",
  },
  {
    number: "04",
    title: "Holistic Development",
    desc: "A holistic approach is essential — developing the whole person: healthy body, healthy mind, and healthy spirit.",
    color: "from-[#1A3A2A] to-[#1E4E3F]",
    accent: "#C65D3A",
  },
];

const objectives = [
  "Empower community groups through microfinance — savings and loaning programs",
  "Develop the volunteerism spirit by deploying local and international volunteers",
  "Enhance livelihood and well-being for people living with HIV/AIDS and their families",
  "Build awareness on malaria, TB, and other infectious diseases in our communities",
  "Support orphans, vulnerable children, and street children through rehabilitation",
  "Establish a community resource centre for learning and career development",
  "Mobilize community groups into income-generating activities",
  "Assist communities in initiating enterprises for poverty reduction and wealth creation",
  "Develop eco-tourism and environmental management as a revenue source",
  "Build reading programmes in local schools to improve children's literacy",
  "Increase access to affordable farm inputs: quality seeds, fertilizers, and tools",
  "Strengthen agricultural extension services and climate-resilient farming practices",
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function VisionMissionSection() {
  const [showAllObjectives, setShowAllObjectives] = useState(false);
  const visibleObjectives = showAllObjectives ? objectives : objectives.slice(0, 6);

  return (
    <section className="bg-[#F5F1E6] font-serif">

      {/* ── VISION & MISSION ── */}
      <div className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          {/* section label */}
          <div className="mb-14 text-center">
            <span className="text-[#C65D3A] text-xs uppercase tracking-[0.18em] font-bold">
              What We Stand For
            </span>
            <h2 className="mt-4 font-serif text-4xl font-black leading-tight text-[#1A2A22] md:text-5xl">
              Vision, Mission &amp; Values
            </h2>
          </div>

          {/* vision + mission side by side */}
          <div className="grid gap-6 lg:grid-cols-2 mb-6">

            {/* vision */}
            <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F] p-10 shadow-2xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#D7992E]/20 border border-[#D7992E]/30">
                  <span className="text-[#D7992E] font-black text-sm">V</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7992E]">
                  Our Vision
                </span>
              </div>

              <p className="text-[17px] leading-9 text-white font-semibold mb-5">
                A better future and right livelihood for families and individuals
                in our villages — and self-sustainable communities across Kenya.
              </p>

              <div className="border-t border-white/10 pt-5">
                <p className="text-[14px] leading-7 text-[#E6EFEA]/70">
                  To become the leading agribusiness that actively promotes
                  environmentally friendly agricultural practices — working closely
                  with smallholder farmers to advance social justice and gender equality.
                </p>
              </div>
            </div>

            {/* mission */}
            <div className="overflow-hidden rounded-[2.5rem] bg-white border border-[#e8e0d0] p-10 shadow-md">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C65D3A]/10 border border-[#C65D3A]/20">
                  <span className="text-[#C65D3A] font-black text-sm">M</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
                  Our Mission
                </span>
              </div>

              <p className="text-[17px] leading-9 text-[#1A2A22] font-semibold mb-5">
                To improve the quality of life of local communities through
                sustainable development initiatives in Kenya.
              </p>

              <div className="border-t border-[#e8e0d0] pt-5">
                <p className="text-[14px] leading-7 text-[#5a6a5a]">
                  To be the most vibrant and innovative agribusiness in supporting
                  smallholder farmers and youth-and-women-led producer organisations —
                  advancing cutting-edge technologies for community adaptation.
                </p>
              </div>
            </div>

          </div>

          {/* goal banner */}
          <div className="rounded-[2rem] border border-[#D7992E]/25 bg-[#D7992E]/08 px-10 py-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
                  Our Goal
                </span>
                <h3 className="mt-3 font-serif text-2xl font-black leading-snug text-[#1A2A22]">
                  Empowering People,<br />Transforming Communities
                </h3>
              </div>
              <div>
                <p className="text-[14px] leading-8 text-[#3a4a3a]">
                  To support local children, youth, and women through capacity-building
                  and empowerment — helping them achieve knowledge, skills, networks,
                  and motivation for an improved standard of living and human dignity.
                  To enhance smallholder farmers&apos; output and guarantee market access,
                  ensuring sustainable transformation and increasing yields and profits.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── CORE VALUES ── */}
      <div className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <span className="text-[#C65D3A] text-xs uppercase tracking-[0.18em] font-bold">
                Core Values
              </span>
              <h2 className="mt-4 font-serif text-4xl font-black leading-tight text-[#1A2A22] md:text-5xl">
                The Principles That<br />Guide Everything We Do
              </h2>
            </div>
            <p className="text-[15px] leading-8 text-[#5a6a5a] lg:text-right">
              These four values are not aspirational posters — they are the
              working principles embedded in every program, every hire, and
              every community interaction TICOWE undertakes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((v) => (
              <div
                key={v.number}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-[#e8e0d0] bg-[#F5F1E6] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(15,76,76,0.12)]"
              >
                {/* color bar top */}
                <div className={`bg-gradient-to-r ${v.color} px-7 py-6`}>
                  <span className="font-serif text-4xl font-black text-white/20">
                    {v.number}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-7 py-7">
                  <h3 className="mb-3 font-serif text-lg font-black leading-snug text-[#1A2A22]">
                    {v.title}
                  </h3>
                  <p className="flex-1 text-[13px] leading-7 text-[#5a6a5a]">
                    {v.desc}
                  </p>
                  <div
                    className="mt-6 h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16"
                    style={{ background: v.accent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── OBJECTIVES ── */}
      <div className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <span className="text-[#C65D3A] text-xs uppercase tracking-[0.18em] font-bold">
                What We Set Out to Do
              </span>
              <h2 className="mt-4 font-serif text-4xl font-black leading-tight text-[#1A2A22] md:text-5xl">
                Our Objectives
              </h2>
            </div>
            <p className="text-[15px] leading-8 text-[#5a6a5a] lg:text-right">
              Fourteen clear objectives anchor every program TICOWE runs —
              from microfinance and health outreach to eco-tourism and
              climate-resilient agriculture.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleObjectives.map((obj, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-[#e8e0d0] bg-white px-6 py-5 transition-all duration-200 hover:border-[#0F4C4C]/25 hover:shadow-md"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#0F4C4C] text-xs font-black text-white">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-[14px] leading-7 text-[#3a4a3a]">{obj}</p>
              </div>
            ))}
          </div>

          {/* show more / less toggle */}
          {objectives.length > 6 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAllObjectives((v) => !v)}
                className="rounded-2xl border border-[#e0d8c8] bg-white px-8 py-3 text-sm font-bold text-[#0F4C4C] transition-all hover:border-[#0F4C4C] hover:bg-[#0F4C4C] hover:text-white"
              >
                {showAllObjectives
                  ? "Show Less"
                  : `Show All ${objectives.length} Objectives`}
              </button>
            </div>
          )}

        </div>
      </div>

      {/* ── AREAS OF FOCUS ── */}
      <div className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-14 text-center">
            <span className="text-[#C65D3A] text-xs uppercase tracking-[0.18em] font-bold">
              Where We Focus
            </span>
            <h2 className="mt-4 font-serif text-4xl font-black leading-tight text-[#1A2A22] md:text-5xl">
              Areas of Focus
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { tag: "Microfinance", title: "Community Savings & Loans", desc: "Mobilizing community groups in a service network of savings and loans for community-based microfinance and enterprise development.", color: "from-[#0F4C4C] to-[#145B5B]" },
              { tag: "Health", title: "HIV/AIDS, Malaria & TB Awareness", desc: "Counseling, awareness campaigns, home-based care (HBC), and innovative support programs for orphans and vulnerable children.", color: "from-[#1E4E3F] to-[#0F4C4C]" },
              { tag: "Education", title: "Free Computer & ICT Training", desc: "Providing free computer training to orphans, vulnerable youth, and women — building digital skills for economic participation.", color: "from-[#145B5B] to-[#1A3A2A]" },
              { tag: "Child Welfare", title: "Community School & Orphan Support", desc: "A community primary school serving orphans and vulnerable children, plus a rehabilitation program for street children.", color: "from-[#1A3A2A] to-[#1E4E3F]" },
              { tag: "Peace", title: "Alternatives to Violence (AVP)", desc: "Peace training workshops for community members — 600+ youth trained in conflict resolution and peaceful coexistence.", color: "from-[#0F4C4C] to-[#1A3A2A]" },
              { tag: "Agriculture", title: "Food Security & Farm Productivity", desc: "Quality seeds, fertilizers, climate-smart practices, and farmer capacity-building across Kenya's key agro-ecological zones.", color: "from-[#1E4E3F] to-[#145B5B]" },
              { tag: "Environment", title: "Eco-Tourism & Environmental Management", desc: "Developing eco-tourism as a community revenue source while promoting environmental conservation and biodiversity.", color: "from-[#145B5B] to-[#0F4C4C]" },
              { tag: "Volunteering", title: "Local & International Volunteer Program", desc: "Deploying volunteers into community tasks matched to their skills — enabling intercultural exchange and direct impact.", color: "from-[#1A3A2A] to-[#0F4C4C]" },
              { tag: "Value Chains", title: "Agricultural Value Chain Development", desc: "Supporting maize, sorghum, beans, ALVs, soybeans, poultry, dairy, aquaculture, and horticulture through KCEP partnerships.", color: "from-[#0F4C4C] to-[#1E4E3F]" },
            ].map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-[2rem] border border-[#e8e0d0] bg-[#F5F1E6] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,76,76,0.1)]"
              >
                <div className={`bg-gradient-to-r ${item.color} flex items-center justify-between px-7 py-5`}>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white">
                    {item.tag}
                  </span>
                </div>
                <div className="px-7 py-6">
                  <h3 className="mb-3 font-serif text-[17px] font-black leading-snug text-[#1A2A22]">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-7 text-[#5a6a5a]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-[#F5F1E6] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2.5rem] bg-gradient-to-r from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F] px-8 py-16 text-center text-white shadow-2xl lg:px-20">
            <h2 className="font-serif text-4xl font-black leading-tight md:text-5xl">
              Together We Can Build<br />Sustainable Communities
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E6EFEA]">
              Support our mission to empower communities, improve livelihoods,
              and create lasting impact through sustainable development and
              innovation across Kenya.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <Link
                href="/donate"
                className="rounded-2xl bg-[#C65D3A] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#D7992E]"
              >
                Donate Today
              </Link>

              <Link
                href="/volunteer"
                className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#0F4C4C]"
              >
                Become a Volunteer
              </Link>

              <Link
                href="/programs"
                className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#0F4C4C]"
              >
                Explore Our Programs
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
