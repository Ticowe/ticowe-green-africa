"use client";

import { useState } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const stats = [
  { value: "25,000+", label: "Farmers Directly Supported", icon: "🌾" },
  { value: "120,000+", label: "Farmer Network Size", icon: "🤝" },
  { value: "60%", label: "Women Participants", icon: "👩‍🌾" },
  { value: "30%", label: "Youth Participants", icon: "🧑‍🌱" },
  { value: "55", label: "Microfinance Groups Trained", icon: "💰" },
  { value: "600+", label: "Youth Peace-Trained (AVP)", icon: "🕊️" },
  { value: "16", label: "Orphans in Higher Education", icon: "🎓" },
  { value: "160", label: "Children in Community School", icon: "📚" },
];

const pillars = [
  {
    tag: "Agriculture",
    color: "from-[#0F4C4C] to-[#145B5B]",
    accent: "#D7992E",
    tagBg: "bg-[#D7992E]/15 text-[#D7992E]",
    icon: "🌾",
    title: "Agricultural Transformation",
    metric: "20–30%",
    metricLabel: "average increase in farm productivity",
    description:
      "Through climate-smart farming practices, TICOWE has helped over 25,000 farmers boost their yields and reduce post-harvest losses. Participating households earn KES 40,000–60,000 (USD 300–450) in additional annual income from tree nurseries, seedling sales, and diversified crop yields.",
    highlights: [
      "Quality seeds, fertilizers & farm input access",
      "Tractor services & equipment support",
      "Market linkages & produce aggregation",
      "Pre- and post-harvest handling training",
      "Climate-smart & regenerative farming practices",
    ],
  },
  {
    tag: "Women & Youth",
    color: "from-[#1E4E3F] to-[#0F4C4C]",
    accent: "#C65D3A",
    tagBg: "bg-[#C65D3A]/15 text-[#C65D3A]",
    icon: "👩‍💼",
    title: "Women & Youth Empowerment",
    metric: "55",
    metricLabel: "microfinance groups trained (30 members each)",
    description:
      "TICOWE has trained 55 savings and loan groups, empowering street children in Ndhiwa and Homa Bay Sub-Counties to establish personal enterprises. Free ICT training, leadership workshops, and entrepreneurship development programs have opened economic doors for thousands.",
    highlights: [
      "55 microfinance groups trained",
      "Street children enterprise empowerment",
      "Free computer training for vulnerable youth",
      "Leadership & financial skills workshops",
      "Entrepreneurship & small business development",
    ],
  },
  {
    tag: "Education",
    color: "from-[#145B5B] to-[#1A3A2A]",
    accent: "#D7992E",
    tagBg: "bg-[#D7992E]/15 text-[#D7992E]",
    icon: "📚",
    title: "Education & Child Support",
    metric: "160",
    metricLabel: "children capacity at the TICOWE community school",
    description:
      "Our community primary school serves 160 children — orphans and vulnerable youth — with free quality education. 16 orphans are currently supported through high school and polytechnic education. Reading programs and a community library serve the wider Ndhiwa Sub-County.",
    highlights: [
      "Community primary school (160-child capacity)",
      "16 orphans sponsored in higher education",
      "Community library established in Ndhiwa",
      "Reading & English improvement programs",
      "Street children rehabilitation programs",
    ],
  },
  {
    tag: "Peace Building",
    color: "from-[#0F4C4C] to-[#1E4E3F]",
    accent: "#C65D3A",
    tagBg: "bg-[#C65D3A]/15 text-[#C65D3A]",
    icon: "🕊️",
    title: "Peace Building & Social Cohesion",
    metric: "600+",
    metricLabel: "community youth trained through AVP workshops",
    description:
      "Over 600 community youth across Ndhiwa Sub-County have been trained in Alternatives to Violence (AVP) — earning recognition certificates and building conflict-resolution skills. Cultural exchange programs and community events continue to strengthen the social fabric.",
    highlights: [
      "600+ youth trained in AVP peace workshops",
      "Certificate recognition for participants",
      "Cultural exchange programs",
      "Sports & physical activity initiatives",
      "Drug awareness & prevention programs",
    ],
  },
  {
    tag: "Health",
    color: "from-[#1A3A2A] to-[#145B5B]",
    accent: "#D7992E",
    tagBg: "bg-[#D7992E]/15 text-[#D7992E]",
    icon: "🏥",
    title: "Health & Community Wellness",
    metric: "3",
    metricLabel: "major disease awareness campaigns running",
    description:
      "TICOWE runs active HIV/AIDS, Malaria, and TB awareness campaigns with counseling and home-based care for affected families. Rural grassroots community group participation in health programs has significantly increased across the Homa Bay County region.",
    highlights: [
      "HIV/AIDS awareness & management programs",
      "Malaria & TB community campaigns",
      "Home-based care for HIV-affected families",
      "Psychosocial counseling support",
      "Increased rural grassroots health participation",
    ],
  },
  {
    tag: "Environment",
    color: "from-[#1E4E3F] to-[#145B5B]",
    accent: "#C65D3A",
    tagBg: "bg-[#C65D3A]/15 text-[#C65D3A]",
    icon: "🌍",
    title: "Ecosystem Restoration",
    metric: "KES 60K",
    metricLabel: "max additional income from tree-based value chains",
    description:
      "Community tree nurseries providing certified indigenous and fruit tree seedlings have restored biodiversity while creating employment. Young farmers trained in nursery management and regenerative agriculture ensure the environmental agenda translates into sustainable livelihoods.",
    highlights: [
      "Community-based tree nursery establishment",
      "Indigenous & fruit tree seedling programs",
      "Regenerative agriculture training",
      "Biodiversity conservation initiatives",
      "Eco-tourism development in Nyanza region",
    ],
  },
];

const stories = [
  {
    name: "Farmers in Ndhiwa",
    category: "Agriculture",
    quote:
      "Through the farm input support and training from TICOWE, our yields improved significantly. We now sell surplus produce and our children can stay in school.",
    avatar: "🌾",
    bg: "bg-[#0F4C4C]",
  },
  {
    name: "Youth Peace Workshop Graduate",
    category: "Peace Building",
    quote:
      "The AVP workshop changed how I see conflict. I now help mediate disputes in my village. This training gave me confidence and a certificate I'm proud of.",
    avatar: "🕊️",
    bg: "bg-[#1E4E3F]",
  },
  {
    name: "Microfinance Group Member",
    category: "Women Empowerment",
    quote:
      "Before TICOWE, I had no savings plan. Now my group saves together every week and we've started a small poultry enterprise. My family's income has tripled.",
    avatar: "👩‍💼",
    bg: "bg-[#145B5B]",
  },
];

const sdgs = [
  { num: "1", label: "No Poverty", color: "bg-[#E5243B]" },
  { num: "2", label: "Zero Hunger", color: "bg-[#DDA63A]" },
  { num: "3", label: "Good Health", color: "bg-[#4C9F38]" },
  { num: "4", label: "Quality Education", color: "bg-[#C5192D]" },
  { num: "8", label: "Decent Work & Growth", color: "bg-[#A21942]" },
  { num: "10", label: "Reduced Inequalities", color: "bg-[#DD1367]" },
  { num: "13", label: "Climate Action", color: "bg-[#3F7E44]" },
  { num: "15", label: "Life on Land", color: "bg-[#56C02B]" },
  { num: "16", label: "Peace & Justice", color: "bg-[#00689D]" },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

export default function ImpactPage() {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <div className="bg-[#F5F1E6] font-serif">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F] px-6 py-28 text-center">
        {/* decorative circles */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#D7992E]/10" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#C65D3A]/08" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-[#D7992E]/30 bg-[#D7992E]/15 px-5 py-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7992E]">
              Our Impact
            </span>
          </div>

          <h1 className="mb-6 font-serif text-5xl font-black leading-tight text-white md:text-7xl">
            Real Change,<br />
            <span className="text-[#D7992E]">Real Communities</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-[#E6EFEA]">
            Since 2019, TICOWE Green Africa has been transforming lives across Ndhiwa
            Sub-County and the broader Nyanza region — through agriculture, education,
            health, and community empowerment.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#0F4C4C] px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="mb-1 text-2xl">{s.icon}</div>
                <div className="font-serif text-2xl font-black text-[#D7992E] md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs leading-4 text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILLARS OF IMPACT ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          {/* header */}
          <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
                Where We Work
              </div>
              <h2 className="font-serif text-4xl font-black leading-tight text-[#1A2A22] md:text-5xl">
                Six Pillars of<br />Community Impact
              </h2>
            </div>
            <p className="text-[15px] leading-8 text-[#5a6a5a] lg:text-right">
              Each pillar represents a core area where TICOWE delivers
              measurable, sustainable change — integrated to create
              holistic community development across Kenya's Nyanza region.
            </p>
          </div>

          {/* tab navigation */}
          <div className="mb-10 flex flex-wrap gap-3">
            {pillars.map((p, i) => (
              <button
                key={p.tag}
                onClick={() => setActivePillar(i)}
                className={`rounded-2xl px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                  activePillar === i
                    ? "bg-[#0F4C4C] text-white shadow-lg"
                    : "bg-white text-[#3a4a3a] hover:bg-[#0F4C4C]/10"
                }`}
              >
                {p.icon} {p.tag}
              </button>
            ))}
          </div>

          {/* active pillar card */}
          {pillars.map((p, i) =>
            activePillar !== i ? null : (
              <div
                key={p.tag}
                className="overflow-hidden rounded-[2.5rem] bg-white shadow-[0_8px_48px_rgba(15,76,76,0.12)]"
              >
                <div className={`bg-gradient-to-r ${p.color} px-10 py-12 md:px-16`}>
                  <div
                    className={`mb-4 inline-flex rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${p.tagBg}`}
                  >
                    {p.tag}
                  </div>
                  <h3 className="mb-2 font-serif text-3xl font-black text-white md:text-4xl">
                    {p.title}
                  </h3>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-5xl font-black text-[#D7992E]">
                      {p.metric}
                    </span>
                    <span className="max-w-xs text-sm leading-6 text-white/70">
                      {p.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="grid gap-0 lg:grid-cols-2">
                  <div className="border-b border-[#e8e0d0] px-10 py-10 lg:border-b-0 lg:border-r md:px-16">
                    <div className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#C65D3A]">
                      The Story
                    </div>
                    <p className="text-[15px] leading-8 text-[#3a4a3a]">
                      {p.description}
                    </p>
                  </div>
                  <div className="px-10 py-10 md:px-16">
                    <div className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[#C65D3A]">
                      Key Achievements
                    </div>
                    <ul className="space-y-3">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
                            style={{ background: p.accent }}
                          >
                            ✓
                          </span>
                          <span className="text-[14px] leading-6 text-[#3a4a3a]">
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* ── COMMUNITY VOICES ── */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
              Voices from the Ground
            </div>
            <h2 className="font-serif text-4xl font-black leading-tight text-[#1A2A22] md:text-5xl">
              Community Stories
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {stories.map((s) => (
              <div
                key={s.name}
                className="flex flex-col overflow-hidden rounded-[2rem] border border-[#e8e0d0] bg-[#F5F1E6]"
              >
                {/* header */}
                <div className={`${s.bg} flex items-center gap-4 px-8 py-6`}>
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-3xl">
                    {s.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{s.name}</div>
                    <div className="text-xs text-white/60">{s.category}</div>
                  </div>
                </div>

                {/* quote */}
                <div className="flex flex-1 flex-col justify-between px-8 py-8">
                  <p className="text-[15px] italic leading-8 text-[#3a4a3a]">
                    "{s.quote}"
                  </p>
                  <div className="mt-6 h-0.5 w-12 rounded-full bg-[#D7992E]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FARMER PRODUCTIVITY CALLOUT ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F] shadow-2xl">
            <div className="grid lg:grid-cols-2">
              {/* left: numbers */}
              <div className="border-b border-white/10 px-12 py-16 lg:border-b-0 lg:border-r">
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#D7992E]">
                  Proven Results
                </div>
                <h2 className="mb-10 font-serif text-4xl font-black leading-tight text-white md:text-5xl">
                  Farm Productivity<br />by the Numbers
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { n: "20–30%", label: "Avg. productivity increase" },
                    { n: "KES 60K", label: "Max additional annual income" },
                    { n: "25,000+", label: "Farmers directly reached" },
                    { n: "60%", label: "Women in farmer network" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl bg-white/08 p-5"
                    >
                      <div className="mb-1 font-serif text-3xl font-black text-[#D7992E]">
                        {item.n}
                      </div>
                      <div className="text-xs leading-5 text-white/60">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* right: value chains */}
              <div className="px-12 py-16">
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#D7992E]">
                  Supported Value Chains
                </div>
                <h3 className="mb-8 font-serif text-2xl font-black text-white">
                  Partnering with KCEP &amp; National Initiatives
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "🌽 Maize",
                    "🌾 Sorghum",
                    "🫘 Beans",
                    "🥬 African Leafy Veg",
                    "🫛 Soybeans",
                    "🐓 Poultry",
                    "🐄 Dairy",
                    "🐟 Aquaculture",
                    "🥦 Horticulture",
                    "🌱 Tree Nurseries",
                  ].map((v) => (
                    <div
                      key={v}
                      className="flex items-center gap-2 rounded-xl bg-white/08 px-4 py-3 text-sm text-white/80"
                    >
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SDG ALIGNMENT ── */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
                Global Commitment
              </div>
              <h2 className="font-serif text-4xl font-black leading-tight text-[#1A2A22] md:text-5xl">
                Aligned With the UN<br />Sustainable Development Goals
              </h2>
            </div>
            <p className="text-[15px] leading-8 text-[#5a6a5a] lg:text-right">
              TICOWE's programs directly contribute to 9 of the 17 UN SDGs —
              grounding grassroots Kenyan community work within the global
              development framework.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {sdgs.map((sdg) => (
              <div
                key={sdg.num}
                className={`${sdg.color} flex items-center gap-3 rounded-2xl px-5 py-3 shadow-sm`}
              >
                <span className="font-serif text-2xl font-black text-white">
                  {sdg.num}
                </span>
                <span className="text-sm font-bold text-white/90">
                  {sdg.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#F5F1E6] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2.5rem] bg-gradient-to-r from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F] px-8 py-16 text-center text-white shadow-2xl lg:px-20">
            <h2 className="font-serif text-4xl font-black leading-tight md:text-5xl">
              Be Part of This Story
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#E6EFEA]">
              Every farmer trained, every child educated, every peace workshop held —
              it's only possible with community support. Join TICOWE in building
              sustainable futures across Kenya.
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

              <a
                href="/contact"
                className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#0F4C4C]"
              >
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
