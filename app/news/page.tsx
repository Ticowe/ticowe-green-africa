"use client";

import { useState } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const categories = ["All", "Agriculture", "Education", "Health", "Peace Building", "Women & Youth", "Environment", "Announcements"];

const articles = [
  {
    id: 1,
    category: "Agriculture",
    tag: "🌾",
    date: "April 28, 2025",
    readTime: "4 min read",
    title: "TICOWE Farmer Network Surpasses 25,000 Beneficiaries Across Homa Bay County",
    excerpt:
      "A major milestone for TICOWE Green Africa as our direct farmer support network crosses the 25,000 mark — more than 60% of whom are women. Climate-smart practices have delivered a 20–30% average increase in farm productivity across participating households.",
    featured: true,
    accent: "#D7992E",
    bg: "from-[#0F4C4C] to-[#145B5B]",
  },
  {
    id: 2,
    category: "Peace Building",
    tag: "🕊️",
    date: "March 15, 2025",
    readTime: "3 min read",
    title: "600th Youth Completes AVP Peace Training — A Community Milestone",
    excerpt:
      "The Alternatives to Violence Program (AVP) in Ndhiwa Sub-County has now trained its 600th community youth. The certificate ceremony at Pala marked a proud moment for TICOWE's long-running conflict resolution and social cohesion initiative.",
    featured: false,
    accent: "#C65D3A",
    bg: "from-[#1E4E3F] to-[#0F4C4C]",
  },
  {
    id: 3,
    category: "Education",
    tag: "📚",
    date: "February 20, 2025",
    readTime: "5 min read",
    title: "Community Library Expansion: New Reading Programs Launched for Vulnerable Children",
    excerpt:
      "The TICOWE Green Africa community library in Ndhiwa Sub-County has launched new structured reading programs targeting orphans and street children. Volunteer teachers and donated books are transforming learning outcomes for over 80 children weekly.",
    featured: false,
    accent: "#D7992E",
    bg: "from-[#145B5B] to-[#1A3A2A]",
  },
  {
    id: 4,
    category: "Women & Youth",
    tag: "👩‍💼",
    date: "February 5, 2025",
    readTime: "4 min read",
    title: "New Microfinance Cohort: 5 New Savings Groups Formed in Ndhiwa Sub-County",
    excerpt:
      "TICOWE's microfinance program welcomed five new savings and loan groups in early 2025, bringing the total to 55 trained groups. Women entrepreneurs in rural Homa Bay are gaining financial literacy, credit access, and enterprise development support.",
    featured: false,
    accent: "#C65D3A",
    bg: "from-[#0F4C4C] to-[#1E4E3F]",
  },
  {
    id: 5,
    category: "Health",
    tag: "🏥",
    date: "January 18, 2025",
    readTime: "3 min read",
    title: "HIV/AIDS Awareness Campaign Reaches 12 New Villages in Homa Bay County",
    excerpt:
      "TICOWE's health outreach team, in partnership with the Constituency AIDS Control Council, extended HIV/AIDS awareness campaigns to 12 previously unreached villages in Homa Bay County — providing testing, counseling, and home-based care referrals.",
    featured: false,
    accent: "#D7992E",
    bg: "from-[#1A3A2A] to-[#145B5B]",
  },
  {
    id: 6,
    category: "Environment",
    tag: "🌳",
    date: "January 8, 2025",
    readTime: "4 min read",
    title: "Tree Nursery Program Plants 10,000 Seedlings — Restoring Nyanza's Green Cover",
    excerpt:
      "TICOWE's community tree nursery initiative has distributed over 10,000 certified indigenous and fruit tree seedlings across Ndhiwa Sub-County. Young farmers trained in regenerative agriculture are now earning supplemental income from the tree-based value chain.",
    featured: false,
    accent: "#C65D3A",
    bg: "from-[#1E4E3F] to-[#145B5B]",
  },
  {
    id: 7,
    category: "Announcements",
    tag: "📢",
    date: "December 20, 2024",
    readTime: "2 min read",
    title: "TICOWE Resource Centre Construction: Land Acquired, Plans Underway",
    excerpt:
      "A significant step forward for TICOWE Green Africa: land has been successfully acquired for the construction of the TICOWE Green Africa Resource Centre in Ndhiwa. The multi-purpose facility will house organizational offices, a volunteer hub, and a career development centre.",
    featured: false,
    accent: "#D7992E",
    bg: "from-[#0F4C4C] to-[#1A3A2A]",
  },
  {
    id: 8,
    category: "Agriculture",
    tag: "🌽",
    date: "December 5, 2024",
    readTime: "5 min read",
    title: "TICOWE Partners With KCEP to Expand Maize & Sorghum Value Chains",
    excerpt:
      "A new partnership with the Kenya Cereal Enhancement Programme (KCEP) will see TICOWE support an additional 3,000 smallholder farmers in maize and sorghum production. The collaboration includes input access, market linkages, and post-harvest management training.",
    featured: false,
    accent: "#C65D3A",
    bg: "from-[#145B5B] to-[#0F4C4C]",
  },
  {
    id: 9,
    category: "Education",
    tag: "🎓",
    date: "November 22, 2024",
    readTime: "3 min read",
    title: "16 Sponsored Orphans Begin Higher Education — A Dream Fulfilled",
    excerpt:
      "TICOWE Green Africa celebrates as 16 orphaned youth it has supported officially enrolled in high schools and polytechnic institutions across Kenya. The sponsorship program covers school fees, uniforms, and learning materials for these deserving students.",
    featured: false,
    accent: "#D7992E",
    bg: "from-[#1E4E3F] to-[#1A3A2A]",
  },
];

const pressItems = [
  { outlet: "Nation Africa", date: "March 2025", title: "Community CBOs Leading the Charge in Rural Kenya's Agricultural Revolution" },
  { outlet: "Standard Media", date: "January 2025", title: "Women-Led Microfinance Groups Transform Livelihoods in Homa Bay" },
  { outlet: "KBC Radio", date: "November 2024", title: "TICOWE Green Africa: Volunteerism as a Tool for Sustainable Development" },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  return (
    <div className="bg-[#F5F1E6] font-serif">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F] px-6 py-28 text-center">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#D7992E]/10" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#C65D3A]/08" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-[#D7992E]/30 bg-[#D7992E]/15 px-5 py-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7992E]">
              Latest Updates
            </span>
          </div>

          <h1 className="mb-6 font-serif text-5xl font-black leading-tight text-white md:text-7xl">
            News &amp;<br />
            <span className="text-[#D7992E]">Stories</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-[#E6EFEA]">
            Stay informed about TICOWE Green Africa's work across Ndhiwa Sub-County
            and the broader Nyanza region — field updates, milestones, and
            community stories from the ground.
          </p>
        </div>
      </section>

      {/* ── SEARCH + FILTERS ── */}
      <section className="sticky top-[68px] z-40 border-b border-[#e0d8c8] bg-[#F5F1E6]/95 px-6 py-5 backdrop-blur-md">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* search */}
            <div className="relative max-w-sm w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9a8a]">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-[#e0d8c8] bg-white py-3 pl-11 pr-4 text-sm text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
              />
            </div>

            {/* category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#0F4C4C] text-white shadow-md"
                      : "bg-white text-[#3a4a3a] hover:bg-[#0F4C4C]/10 border border-[#e0d8c8]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLE ── */}
      {featured && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
              Featured Story
            </div>

            <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-[0_8px_48px_rgba(15,76,76,0.12)]">
              <div className="grid lg:grid-cols-2">
                {/* visual panel */}
                <div
                  className={`bg-gradient-to-br ${featured.bg} flex min-h-[320px] flex-col justify-between p-12`}
                >
                  <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                      <span className="text-lg">{featured.tag}</span>
                      <span className="text-xs font-bold text-white/90">
                        {featured.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="mb-6 font-serif text-4xl font-black leading-tight text-white md:text-5xl">
                      {featured.title}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <span>📅 {featured.date}</span>
                      <span>⏱ {featured.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* content panel */}
                <div className="flex flex-col justify-between p-12">
                  <div>
                    <div
                      className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                      style={{
                        background: `${featured.accent}20`,
                        color: featured.accent,
                      }}
                    >
                      {featured.category}
                    </div>

                    <p className="text-[16px] leading-9 text-[#3a4a3a]">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <button className="rounded-2xl bg-[#0F4C4C] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#145B5B]">
                      Read Full Story →
                    </button>
                    <div className="flex gap-3">
                      <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0d8c8] text-sm transition hover:border-[#0F4C4C]">
                        🔗
                      </button>
                      <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0d8c8] text-sm transition hover:border-[#0F4C4C]">
                        📤
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── ARTICLE GRID ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          {rest.length > 0 ? (
            <>
              <div className="mb-8 flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
                  {activeCategory === "All" ? "All Stories" : activeCategory} —{" "}
                  {rest.length} article{rest.length !== 1 ? "s" : ""}
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <article
                    key={article.id}
                    className="group flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(15,76,76,0.14)]"
                  >
                    {/* top color bar + icon */}
                    <div
                      className={`bg-gradient-to-r ${article.bg} flex items-end justify-between px-8 py-7`}
                    >
                      <div className="text-4xl">{article.tag}</div>
                      <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white">
                        {article.category}
                      </div>
                    </div>

                    {/* content */}
                    <div className="flex flex-1 flex-col p-8">
                      <div className="mb-3 flex items-center gap-3 text-xs text-[#9a9a8a]">
                        <span>{article.date}</span>
                        <span>·</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="mb-4 font-serif text-[18px] font-black leading-tight text-[#1A2A22] transition-colors group-hover:text-[#0F4C4C]">
                        {article.title}
                      </h3>

                      <p className="flex-1 text-[13px] leading-7 text-[#5a6a5a]">
                        {article.excerpt.slice(0, 140)}…
                      </p>

                      <div className="mt-6 flex items-center justify-between">
                        <button
                          className="text-sm font-bold transition-colors hover:text-[#C65D3A]"
                          style={{ color: article.accent }}
                        >
                          Read More →
                        </button>
                        <div
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: article.accent }}
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="py-24 text-center">
              <div className="mb-4 text-5xl">🔍</div>
              <h3 className="mb-2 font-serif text-2xl font-black text-[#1A2A22]">
                No articles found
              </h3>
              <p className="text-[#5a6a5a]">
                Try a different search term or category filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── IN THE PRESS ── */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-4 lg:grid-cols-2 lg:items-end">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
                Media Coverage
              </div>
              <h2 className="font-serif text-4xl font-black leading-tight text-[#1A2A22] md:text-5xl">
                TICOWE in the Press
              </h2>
            </div>
            <p className="text-[15px] leading-8 text-[#5a6a5a] lg:text-right">
              TICOWE's work has been recognised by national and regional media
              outlets covering Kenya's community development landscape.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pressItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-[#e8e0d0] bg-[#F5F1E6] p-8 transition-all duration-200 hover:border-[#0F4C4C]/30 hover:shadow-md"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-xl bg-[#0F4C4C] px-3 py-1.5 text-xs font-bold text-white">
                    {item.outlet}
                  </span>
                  <span className="text-xs text-[#9a9a8a]">{item.date}</span>
                </div>
                <h4 className="font-serif text-[16px] font-black leading-snug text-[#1A2A22]">
                  {item.title}
                </h4>
                <button className="mt-5 text-xs font-bold text-[#C65D3A] transition hover:text-[#D7992E]">
                  Read Article →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F] shadow-2xl">
            <div className="grid lg:grid-cols-2">
              {/* left */}
              <div className="px-12 py-16">
                <div className="mb-4 inline-flex rounded-full border border-[#D7992E]/30 bg-[#D7992E]/15 px-4 py-1.5">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#D7992E]">
                    Stay Connected
                  </span>
                </div>
                <h2 className="mb-4 font-serif text-3xl font-black leading-tight text-white md:text-4xl">
                  Get TICOWE Updates<br />in Your Inbox
                </h2>
                <p className="text-[15px] leading-7 text-[#E6EFEA]/80">
                  Monthly field reports, community stories, impact data,
                  and volunteer opportunities — delivered directly to you.
                </p>

                <div className="mt-8 flex gap-4 text-sm text-white/60">
                  <span>✓ Monthly newsletter</span>
                  <span>✓ No spam</span>
                  <span>✓ Unsubscribe anytime</span>
                </div>
              </div>

              {/* right */}
              <div className="flex flex-col justify-center px-12 py-16">
                {subscribed ? (
                  <div className="text-center">
                    <div className="mb-4 text-5xl">🎉</div>
                    <h3 className="mb-2 font-serif text-2xl font-black text-white">
                      You're subscribed!
                    </h3>
                    <p className="text-sm text-[#E6EFEA]/70">
                      Welcome to the TICOWE community. Check your inbox for a
                      confirmation email.
                    </p>
                  </div>
                ) : (
                  <>
                    <label className="mb-2 block text-sm font-bold text-white/80">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mb-4 w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm text-white placeholder-white/40 outline-none backdrop-blur-md transition focus:border-[#D7992E] focus:ring-2 focus:ring-[#D7992E]/20"
                    />
                    <button
                      onClick={() => email && setSubscribed(true)}
                      className="w-full rounded-2xl bg-[#C65D3A] px-6 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[#D7992E]"
                    >
                      Subscribe to Updates →
                    </button>
                    <p className="mt-3 text-center text-xs text-white/40">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
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
