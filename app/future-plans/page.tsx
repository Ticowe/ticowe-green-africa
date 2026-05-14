"use client";

import { useState } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const phases = [
  {
    phase: "Phase 1",
    timeline: "2025 – 2026",
    status: "In Progress",
    statusColor: "bg-[#D7992E]/15 text-[#D7992E]",
    dotColor: "bg-[#D7992E]",
    lineColor: "bg-[#D7992E]",
    title: "Foundation & Infrastructure",
    description:
      "Securing land, completing legal groundwork, and beginning construction of the TICOWE Green Africa Resource Centre — the cornerstone of all future programs.",
    plans: [
      {
        icon: "🏗️",
        title: "TICOWE Green Africa Resource Centre",
        desc: "Construction of the multi-purpose community hub providing career development, skills training, volunteer hosting, and organizational offices for Ndhiwa Sub-County.",
        tag: "Infrastructure",
      },
      {
        icon: "🏦",
        title: "Community Microfinance Bank",
        desc: "Establishment of a formal community bank facilitating savings and loans for underserved community members — a major step toward grassroots financial inclusion.",
        tag: "Finance",
      },
    ],
  },
  {
    phase: "Phase 2",
    timeline: "2026 – 2027",
    status: "Planned",
    statusColor: "bg-[#C65D3A]/15 text-[#C65D3A]",
    dotColor: "bg-[#C65D3A]",
    lineColor: "bg-[#C65D3A]",
    title: "Agricultural Scale-Up",
    description:
      "Expanding agricultural programs to cover more value chains, mobilising local farmers at scale, and establishing demonstration plots that serve as regional learning hubs.",
    plans: [
      {
        icon: "🌱",
        title: "Permaculture & Ecological Farming Demonstration Plots",
        desc: "Creating hands-on permaculture and ecological farming demonstration sites for exchange learning — showcasing sustainable practices to farmers across the Nyanza region.",
        tag: "Agriculture",
      },
      {
        icon: "🌾",
        title: "Sugarcane & Maize Farmer Mobilization",
        desc: "Large-scale mobilization of local farmers into organized sugarcane and maize value chains, with structured input supply, training, and guaranteed market linkages.",
        tag: "Agriculture",
      },
    ],
  },
  {
    phase: "Phase 3",
    timeline: "2027 – 2028",
    status: "Planned",
    statusColor: "bg-[#0F4C4C]/15 text-[#0F4C4C]",
    dotColor: "bg-[#0F4C4C]",
    lineColor: "bg-[#0F4C4C]",
    title: "Education & Child Welfare Expansion",
    description:
      "Deepening educational impact through formal school infrastructure and a dedicated orphan rehabilitation campus serving the most vulnerable children in Homa Bay County.",
    plans: [
      {
        icon: "🏫",
        title: "Dedicated Community School for Orphans & Street Children",
        desc: "Constructing and opening a purpose-built community school exclusively for orphans, vulnerable youth, and rehabilitated street children — going beyond the current 160-child temporary facility.",
        tag: "Education",
      },
      {
        icon: "🤝",
        title: "Orphan Rehabilitation Campus",
        desc: "A safe residential and educational campus integrating vocational training, psychosocial support, health care, and career development for the most vulnerable youth in our communities.",
        tag: "Child Welfare",
      },
    ],
  },
  {
    phase: "Phase 4",
    timeline: "2028 – 2030",
    status: "Vision",
    statusColor: "bg-white/20 text-white/70",
    dotColor: "bg-white/40",
    lineColor: "bg-white/20",
    title: "Regional Expansion & Sustainability",
    description:
      "Scaling TICOWE's proven model beyond Homa Bay County into neighboring regions, establishing self-sustaining income streams, and building lasting international partnerships.",
    plans: [
      {
        icon: "🌍",
        title: "Regional Expansion to Neighboring Counties",
        desc: "Replicating TICOWE's integrated development model in Kisumu, Migori, and Siaya counties — with locally-led chapters supported by the central Ndhiwa headquarters.",
        tag: "Expansion",
      },
      {
        icon: "🔬",
        title: "Agri-Tech & Digital Farming Solutions",
        desc: "Launching digital advisory platforms, mobile-based crop monitoring tools, and data-driven farming decision systems tailored for smallholder farmers in Kenya's agro-ecological zones.",
        tag: "Technology",
      },
    ],
  },
];

const needs = [
  {
    icon: "🤝",
    title: "Development Partner Linkages",
    desc: "We seek connections with NGOs, bilateral agencies, and CSOs that share our values of grassroots empowerment and sustainable community development.",
    cta: "Become a Partner",
    accent: "#D7992E",
    bg: "from-[#0F4C4C] to-[#145B5B]",
  },
  {
    icon: "💰",
    title: "Project Funding",
    desc: "Financial support is urgently needed for the Resource Centre construction, community school, and microfinance bank — our three highest-priority Phase 1 projects.",
    cta: "Donate Now",
    accent: "#C65D3A",
    bg: "from-[#1E4E3F] to-[#0F4C4C]",
  },
  {
    icon: "🌐",
    title: "Online Platform Linkages",
    desc: "We need connections to international development platforms and volunteer matching organisations to expand our reach and bring skilled international volunteers.",
    cta: "Connect With Us",
    accent: "#D7992E",
    bg: "from-[#145B5B] to-[#1A3A2A]",
  },
  {
    icon: "🏛️",
    title: "University & Institutional Partners",
    desc: "Partnership with universities and research institutions would enable knowledge transfer, volunteer deployment, and academic support for our agricultural and health programs.",
    cta: "Partner With Us",
    accent: "#C65D3A",
    bg: "from-[#1A3A2A] to-[#1E4E3F]",
  },
  {
    icon: "📋",
    title: "Donor Recommendations",
    desc: "We welcome introductions to multilateral funding institutions, foundations, and grant-making bodies aligned with our SDG-linked work in rural Kenya.",
    cta: "Introduce Us",
    accent: "#D7992E",
    bg: "from-[#0F4C4C] to-[#1A3A2A]",
  },
];

const visionStats = [
  { value: "100,000", label: "Farmers to be reached by 2030", icon: "🌾" },
  { value: "4", label: "Counties covered by 2030", icon: "📍" },
  { value: "500+", label: "Children in community schools", icon: "📚" },
  { value: "1", label: "Fully operational Community Bank", icon: "🏦" },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

export default function FuturePlansPage() {
  const [activePhase, setActivePhase] = useState(0);
  const [contactForm, setContactForm] = useState({ name: "", org: "", email: "", interest: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="bg-[#F5F1E6] font-serif">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F] px-6 py-28 text-center">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#D7992E]/10" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#C65D3A]/08" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/05" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-[#D7992E]/30 bg-[#D7992E]/15 px-5 py-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7992E]">
              The Road Ahead
            </span>
          </div>

          <h1 className="mb-6 font-serif text-5xl font-black leading-tight text-white md:text-7xl">
            Our Vision<br />
            <span className="text-[#D7992E]">for Tomorrow</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-[#E6EFEA]">
            TICOWE Green Africa has a bold, phased roadmap to 2030 —
            scaling infrastructure, agriculture, education, and regional
            reach to transform even more lives across Kenya's Nyanza region.
          </p>

          {/* vision mini-stats */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-5 md:grid-cols-4">
            {visionStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/08 px-4 py-5 backdrop-blur-sm"
              >
                <div className="mb-1 text-2xl">{s.icon}</div>
                <div className="font-serif text-2xl font-black text-[#D7992E]">
                  {s.value}
                </div>
                <div className="mt-1 text-xs leading-4 text-white/55">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHASED ROADMAP ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
                Strategic Roadmap
              </div>
              <h2 className="font-serif text-4xl font-black leading-tight text-[#1A2A22] md:text-5xl">
                Four Phases to<br />a Transformed Community
              </h2>
            </div>
            <p className="text-[15px] leading-8 text-[#5a6a5a] lg:text-right">
              Each phase builds on the last — from foundational infrastructure to
              regional scale. Our roadmap is ambitious but grounded in TICOWE's
              decade of grassroots experience.
            </p>
          </div>

          {/* phase tab switcher */}
          <div className="mb-10 flex flex-wrap gap-3">
            {phases.map((p, i) => (
              <button
                key={p.phase}
                onClick={() => setActivePhase(i)}
                className={`rounded-2xl px-6 py-3 text-sm font-bold transition-all duration-200 ${
                  activePhase === i
                    ? "bg-[#0F4C4C] text-white shadow-lg scale-105"
                    : "bg-white text-[#3a4a3a] border border-[#e0d8c8] hover:bg-[#0F4C4C]/10"
                }`}
              >
                <span className="mr-2 opacity-60">{p.timeline}</span>
                {p.phase}
              </button>
            ))}
          </div>

          {/* active phase detail */}
          {phases.map((phase, i) =>
            activePhase !== i ? null : (
              <div key={phase.phase} className="overflow-hidden rounded-[2.5rem] bg-white shadow-[0_8px_48px_rgba(15,76,76,0.12)]">
                {/* header */}
                <div className="bg-gradient-to-r from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F] px-12 py-12 md:px-16">
                  <div className="flex flex-wrap items-start justify-between gap-6">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="font-serif text-lg font-black text-[#D7992E]">
                          {phase.phase}
                        </span>
                        <span className="rounded-full bg-white/15 px-4 py-1 text-xs font-bold text-white">
                          {phase.timeline}
                        </span>
                        <span className={`rounded-full px-4 py-1 text-xs font-bold ${phase.statusColor}`}>
                          {phase.status}
                        </span>
                      </div>
                      <h3 className="font-serif text-3xl font-black text-white md:text-4xl">
                        {phase.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#E6EFEA]/80">
                    {phase.description}
                  </p>
                </div>

                {/* plans grid */}
                <div className="grid gap-0 lg:grid-cols-2">
                  {phase.plans.map((plan, pi) => (
                    <div
                      key={plan.title}
                      className={`px-12 py-10 md:px-16 ${
                        pi === 0 && phase.plans.length > 1
                          ? "border-b border-[#e8e0d0] lg:border-b-0 lg:border-r"
                          : ""
                      }`}
                    >
                      <div className="mb-5 flex items-center gap-4">
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F5F1E6] text-3xl">
                          {plan.icon}
                        </div>
                        <span className="rounded-full bg-[#0F4C4C]/10 px-3 py-1 text-xs font-bold text-[#0F4C4C]">
                          {plan.tag}
                        </span>
                      </div>
                      <h4 className="mb-3 font-serif text-xl font-black leading-snug text-[#1A2A22]">
                        {plan.title}
                      </h4>
                      <p className="text-[14px] leading-7 text-[#5a6a5a]">
                        {plan.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {/* timeline overview strip */}
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-[#e0d8c8] bg-white p-8 md:p-10">
            <div className="mb-6 text-xs font-bold uppercase tracking-[0.15em] text-[#C65D3A]">
              Full Timeline at a Glance
            </div>
            <div className="relative">
              {/* connecting line */}
              <div className="absolute left-[11px] top-3 h-[calc(100%-24px)] w-0.5 bg-[#e0d8c8]" />

              <div className="space-y-6">
                {phases.map((p, i) => (
                  <button
                    key={p.phase}
                    onClick={() => setActivePhase(i)}
                    className="relative flex w-full items-start gap-5 text-left transition-opacity hover:opacity-80"
                  >
                    <div
                      className={`relative z-10 mt-1 h-6 w-6 flex-shrink-0 rounded-full border-2 border-white shadow-md ${p.dotColor}`}
                    />
                    <div className="flex-1 pb-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-serif text-base font-black text-[#1A2A22]">
                          {p.phase}: {p.title}
                        </span>
                        <span
                          className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                            activePhase === i
                              ? "bg-[#0F4C4C] text-white"
                              : "bg-[#F5F1E6] text-[#5a6a5a]"
                          }`}
                        >
                          {p.timeline}
                        </span>
                        <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${p.statusColor}`}>
                          {p.status}
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] leading-6 text-[#5a6a5a]">
                        {p.description.slice(0, 100)}…
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEEDED SUPPORT ── */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
                How You Can Help
              </div>
              <h2 className="font-serif text-4xl font-black leading-tight text-[#1A2A22] md:text-5xl">
                Support We Need<br />to Make It Happen
              </h2>
            </div>
            <p className="text-[15px] leading-8 text-[#5a6a5a] lg:text-right">
              None of these plans can be realised alone. TICOWE actively
              seeks partners, funders, institutions, and individuals who
              share our commitment to grassroots community transformation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {needs.map((need) => (
              <div
                key={need.title}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-[#e8e0d0] bg-[#F5F1E6] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(15,76,76,0.12)]"
              >
                <div
                  className={`bg-gradient-to-br ${need.bg} flex items-center gap-4 px-8 py-7`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                    {need.icon}
                  </div>
                  <h3 className="font-serif text-lg font-black leading-snug text-white">
                    {need.title}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col justify-between px-8 py-7">
                  <p className="text-[14px] leading-7 text-[#3a4a3a]">
                    {need.desc}
                  </p>
                  <button
                    className="mt-6 self-start text-sm font-bold transition-colors hover:opacity-70"
                    style={{ color: need.accent }}
                  >
                    {need.cta} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP ENQUIRY FORM ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-[0_8px_48px_rgba(15,76,76,0.1)]">
            <div className="grid lg:grid-cols-2">
              {/* left info panel */}
              <div className="bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] px-12 py-16 md:px-16">
                <div className="mb-4 inline-flex rounded-full border border-[#D7992E]/30 bg-[#D7992E]/15 px-4 py-1.5">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#D7992E]">
                    Get Involved
                  </span>
                </div>

                <h2 className="mb-5 font-serif text-3xl font-black leading-tight text-white md:text-4xl">
                  Partner With Us<br />on Our Future Plans
                </h2>

                <p className="mb-10 text-[15px] leading-7 text-[#E6EFEA]/80">
                  Whether you're a donor, development organisation, university,
                  or individual champion — we want to hear from you. Fill in the
                  form and our team will follow up within 5 business days.
                </p>

                <div className="space-y-5">
                  {[
                    { icon: "💡", title: "Funding Partners", desc: "Support specific projects or provide general programme funding." },
                    { icon: "🌐", title: "Technical Partners", desc: "Share expertise in agri-tech, health, education, or microfinance." },
                    { icon: "🏛️", title: "Institutional Partners", desc: "Universities, NGOs, and government agencies welcome." },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{item.title}</div>
                        <div className="text-xs leading-5 text-white/55">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* right form */}
              <div className="px-12 py-16 md:px-16">
                {formSent ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-5 text-6xl">🌱</div>
                    <h3 className="mb-3 font-serif text-3xl font-black text-[#1A2A22]">
                      Enquiry Received!
                    </h3>
                    <p className="mx-auto max-w-sm text-[15px] leading-7 text-[#5a6a5a]">
                      Thank you for your interest in partnering with TICOWE. Our
                      team will review your enquiry and be in touch within 5
                      business days.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="mb-8 font-serif text-3xl font-black text-[#1A2A22]">
                      Partnership Enquiry
                    </h3>

                    <div className="mb-5 grid gap-5 md:grid-cols-2">
                      {[
                        { key: "name", label: "Full Name", placeholder: "Your name" },
                        { key: "org", label: "Organisation", placeholder: "Organisation name" },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="mb-2 block text-sm font-bold text-[#1A2A22]">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            value={contactForm[field.key as keyof typeof contactForm]}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, [field.key]: e.target.value })
                            }
                            className="w-full rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mb-5">
                      <label className="mb-2 block text-sm font-bold text-[#1A2A22]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
                      />
                    </div>

                    <div className="mb-5">
                      <label className="mb-2 block text-sm font-bold text-[#1A2A22]">
                        Area of Interest
                      </label>
                      <select
                        value={contactForm.interest}
                        onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                        className="w-full rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
                      >
                        <option value="">Select an area…</option>
                        <option>Resource Centre Construction</option>
                        <option>Community Microfinance Bank</option>
                        <option>Agricultural Scale-Up</option>
                        <option>Community School</option>
                        <option>Orphan Rehabilitation Campus</option>
                        <option>Regional Expansion</option>
                        <option>Agri-Tech Solutions</option>
                        <option>General Partnership</option>
                      </select>
                    </div>

                    <div className="mb-8">
                      <label className="mb-2 block text-sm font-bold text-[#1A2A22]">
                        How Can You Help?
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your organisation, what support you can offer, and how you'd like to collaborate…"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full resize-none rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm leading-7 text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
                      />
                    </div>

                    <button
                      onClick={() => setFormSent(true)}
                      className="w-full rounded-2xl bg-gradient-to-r from-[#0F4C4C] to-[#1E4E3F] px-6 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:scale-[1.01] hover:shadow-2xl"
                    >
                      Submit Partnership Enquiry →
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#F5F1E6] px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2.5rem] bg-gradient-to-r from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F] px-8 py-16 text-center text-white shadow-2xl lg:px-20">
            <h2 className="font-serif text-4xl font-black leading-tight md:text-5xl">
              Together We Can Build<br />Sustainable Communities
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E6EFEA]">
              Support our mission to empower communities, improve livelihoods,
              and create lasting impact through sustainable development and
              innovation.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <a
                href="/donate"
                className="rounded-2xl bg-[#C65D3A] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#D7992E]"
              >
                Donate Today
              </a>
              <a
                href="/volunteer"
                className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#0F4C4C]"
              >
                Become a Volunteer
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
