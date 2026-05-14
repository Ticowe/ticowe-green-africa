"use client";

import Link from "next/link";

export default function About() {
  const stats = [
    { n: "25,000+", label: "Farmers Supported" },
    { n: "120,000+", label: "Farmer Network" },
    { n: "600", label: "Youths Peace-Trained" },
    { n: "55", label: "Microfinance Groups" },
    { n: "16", label: "Orphans in Higher Ed" },
    { n: "160", label: "Children Capacity School" },
  ];

  const values = [
    {
      icon: "👥",
      title: "People-Centered",
      desc: "People are at the very center and heart of development — the forces behind everything we do.",
    },
    {
      icon: "🔍",
      title: "Transparency",
      desc: "Accountability and openness drive every action and decision we take.",
    },
    {
      icon: "🌱",
      title: "Sustainability",
      desc: "Sustainability is built into every intervention — we design for lasting impact.",
    },
    {
      icon: "🌀",
      title: "Holistic Approach",
      desc: "We develop the whole person: healthy body, healthy mind, and healthy spirit.",
    },
  ];

  return (
    <div className="font-serif bg-[#F5F1E6]">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F] py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="inline-block text-[#D7992E] text-xs font-bold uppercase tracking-widest mb-6 border border-[#D7992E]/30 bg-[#D7992E]/10 px-4 py-1 rounded-full">
            Est. 2019 · Ndhiwa, Kenya
          </span>

          <h1 className="text-white text-4xl md:text-6xl font-black leading-tight mb-6">
            Tropical Initiative for{" "}
            <span className="text-[#D7992E]">Communities & Women</span>{" "}
            Empowerment
          </h1>

          <p className="text-[#E6EFEA] max-w-2xl mx-auto text-lg leading-relaxed mb-10">
            A community-based, non-profit organization rooted in the Nyanza region of Kenya — harnessing volunteerism, agriculture, and education to build self-sustaining communities.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/programs"
              className="bg-[#C65D3A] text-white px-6 py-3 rounded-full font-semibold shadow-lg"
            >
              Our Programs
            </Link>

            <Link
              href="/donate"
              className="border border-white/30 text-white px-6 py-3 rounded-full backdrop-blur-sm"
            >
              Support the Mission
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0F4C4C] py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-[#D7992E] text-3xl font-bold">{s.n}</div>
              <div className="text-white/70 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

<section className="bg-white py-24 px-6 overflow-hidden">
  <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
    
    {/* Left Content */}
    <div>
      <span className="inline-block text-[#C65D3A] text-xs font-bold uppercase tracking-widest mb-4 border border-[#C65D3A]/20 bg-[#C65D3A]/5 px-4 py-1 rounded-full">
        Who We Are
      </span>

      <h2 className="text-4xl md:text-5xl font-black leading-tight text-[#0F4C4C] mb-6">
        Empowering Communities Through
        <span className="block text-[#D7992E]">
          Sustainable Development
        </span>
      </h2>

      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        TICOWE Green Africa is a community-based non-profit organization
        committed to improving livelihoods and building resilient communities
        across Kenya through agriculture, education, women empowerment,
        youth development, and climate-smart initiatives.
      </p>

      <p className="text-gray-700 text-lg leading-relaxed mb-8">
        We believe that sustainable transformation begins at the grassroots.
        Through volunteerism, partnerships, training, and innovation, we
        empower vulnerable communities to become self-reliant and economically
        stable.
      </p>

      {/* Features */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-[#0F4C4C]/10 bg-[#F5F1E6] p-5">
          <h3 className="font-bold text-[#0F4C4C] mb-2">
            Community Driven
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed">
            Our initiatives are built around local community needs and
            participation.
          </p>
        </div>

        <div className="rounded-2xl border border-[#0F4C4C]/10 bg-[#F5F1E6] p-5">
          <h3 className="font-bold text-[#0F4C4C] mb-2">
            Sustainable Impact
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed">
            We focus on long-term solutions that create lasting positive
            change.
          </p>
        </div>
      </div>
    </div>

    {/* Right Side Cards */}
    <div className="relative">
      {/* Main Card */}
      <div className="rounded-[2rem] bg-gradient-to-br from-[#0F4C4C] to-[#145B5B] p-10 text-white shadow-2xl">
        <h3 className="text-3xl font-bold mb-6 text-[#D7992E]">
          Our Focus Areas
        </h3>

        <div className="space-y-5">
          {[
            "Women Empowerment",
            "Youth Development",
            "Agriculture & Food Security",
            "Climate Smart Farming",
            "Community Health",
            "Education Support",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-md"
            >
              <div className="h-3 w-3 rounded-full bg-[#D7992E]" />

              <p className="font-medium text-[#E6EFEA]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute -bottom-8 -left-8 hidden md:block">
        <div className="rounded-3xl bg-[#D7992E] px-8 py-6 shadow-2xl">
          <h4 className="text-4xl font-black text-white">
            6+
          </h4>

          <p className="text-sm font-medium text-white/90">
            Counties Reached
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Background */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#C65D3A] uppercase text-xs font-bold tracking-widest mb-3">
              Background
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A2A22]">
              Built on Volunteerism and Community Spirit
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in October 2019 and officially registered on 8th March 2023. TICOWE operates in Homa Bay, Migori, Kisumu, Vihiga, Kakamega, and Busia Counties.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From farming to ICT training and youth empowerment, we build sustainable communities.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] text-white p-10 rounded-3xl">
            <h3 className="text-[#D7992E] uppercase text-xs mb-2">Vision</h3>
            <p className="mb-6 text-[#E6EFEA]">
              A better future and right livelihood for self-sustainable communities.
            </p>

            <h3 className="text-[#D7992E] uppercase text-xs mb-2">Mission</h3>
            <p className="mb-6 text-[#E6EFEA]">
              Improve quality of life through sustainable development initiatives.
            </p>

            <h3 className="text-[#D7992E] uppercase text-xs mb-2">Goal</h3>
            <p className="text-[#E6EFEA]">
              Empower youth, women, and children through capacity building.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">Our Core Values</h2>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="border rounded-xl p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="font-bold mb-2">{v.title}</h3>
              <p className="text-sm text-gray-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#F5F1E6]">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] text-white p-12 rounded-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Together We Build Sustainable Communities
          </h2>
          <p className="text-[#E6EFEA] mb-8">
            Join our mission to create lasting impact through development.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/donate"
              className="bg-[#C65D3A] px-6 py-3 rounded-full font-semibold"
            >
              Donate Today
            </Link>

            <Link
              href="/volunteer"
              className="border border-white/30 px-6 py-3 rounded-full"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}