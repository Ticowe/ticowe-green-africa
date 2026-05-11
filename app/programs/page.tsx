"use client";

import Link from "next/link";

export default function ProgramsPage() {
  const programs = [
    {
      icon: "🌾",
      color: "#1E4E3F",
      accent: "#D7992E",
      title: "Agricultural Development",
      subtitle: "Feeding Communities, Growing Futures",
      desc: "We provide smallholder farmers with quality seeds, fertilizers, tractor services, market linkages, and expert agronomist advisory.",
      items: [
        "Crop input distribution & farm supplies",
        "Tractor services & equipment support",
        "Climate-smart & regenerative farming",
        "Post-harvest handling & storage training",
        "Market linkages & produce aggregation",
      ],
    },
    {
      icon: "👩‍💼",
      color: "#0F4C4C",
      accent: "#C65D3A",
      title: "Women & Youth Empowerment",
      subtitle: "Building Leaders, Changing Lives",
      desc: "We equip women and youth with tools for economic independence through training and ICT access.",
      items: [
        "Microfinance group training",
        "Community savings & loan programs",
        "Free ICT training for youth",
        "Leadership & financial skills workshops",
        "Entrepreneurship development",
      ],
    },
    {
      icon: "🏥",
      color: "#145B5B",
      accent: "#D7992E",
      title: "Health & Community Wellness",
      subtitle: "Healthier Communities, Brighter Futures",
      desc: "We run awareness campaigns and community health support programs.",
      items: [
        "HIV/AIDS awareness & management",
        "Malaria & TB education campaigns",
        "Home-based care support",
        "Counseling & psychosocial support",
        "Community health outreach",
      ],
    },
    {
      icon: "📚",
      color: "#1A3A2A",
      accent: "#C65D3A",
      title: "Education & Child Support",
      subtitle: "Every Child Deserves a Future",
      desc: "We support education from primary school to higher education for vulnerable children.",
      items: [
        "Community primary school support",
        "Orphan support in higher education",
        "Street children rehabilitation",
        "Reading & language programs",
        "Vocational training",
      ],
    },
    {
      icon: "🕊️",
      color: "#0F4C4C",
      accent: "#D7992E",
      title: "Peace Building & Social Inclusion",
      subtitle: "Harmony for Thriving Communities",
      desc: "We promote peace, unity, and social cohesion through training and engagement.",
      items: [
        "Peace training programs",
        "Cultural exchange programs",
        "Sports activities",
        "Community libraries",
        "Drug abuse awareness",
      ],
    },
    {
      icon: "🌍",
      color: "#1E4E3F",
      accent: "#C65D3A",
      title: "Eco-Tourism & Environment",
      subtitle: "Green Africa, Thriving Ecosystems",
      desc: "We promote environmental conservation and eco-tourism initiatives.",
      items: [
        "Tree nursery programs",
        "Environmental education",
        "Eco-tourism development",
        "Biodiversity conservation",
        "Climate action initiatives",
      ],
    },
  ];

  return (
    <div className="font-serif bg-[#F5F1E6]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#D7992E] text-xs font-bold uppercase tracking-widest border border-[#D7992E]/30 px-4 py-1 rounded-full bg-[#D7992E]/10">
            What We Do
          </span>

          <h1 className="text-white text-4xl md:text-5xl font-bold mt-6">
            Our Programs
          </h1>

          <p className="text-[#E6EFEA] mt-4 text-lg">
            Six pillars of community development — sustainable and impactful.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {programs.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <div
                className="p-6 text-white"
                style={{
                  background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`,
                }}
              >
                <div className="text-3xl mb-2">{p.icon}</div>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-sm" style={{ color: p.accent }}>
                  {p.subtitle}
                </p>
              </div>

              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">{p.desc}</p>

                <ul className="space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="text-sm text-gray-700 flex gap-2">
                      <span style={{ color: p.accent }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Area of operation */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold">Area of Operation</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          We operate in Homa Bay County and surrounding regions in Nyanza, Kenya.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["Ndhiwa", "Homa Bay", "Nyanza", "Western Kenya"].map((loc) => (
            <span
              key={loc}
              className="bg-[#F5F1E6] border px-4 py-2 rounded-full text-sm font-medium text-[#0F4C4C]"
            >
              {loc}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#F5F1E6]">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] text-white text-center p-12 rounded-3xl">
          <h2 className="text-3xl font-bold mb-4">
            Want to Support Our Programs?
          </h2>

          <p className="text-[#E6EFEA] mb-8">
            Join us in transforming communities through sustainable development.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="bg-[#C65D3A] px-6 py-3 rounded-full font-semibold"
            >
              Donate
            </Link>

            <Link
              href="/volunteer"
              className="border border-white/30 px-6 py-3 rounded-full"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}