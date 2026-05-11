"use client";

import Link from "next/link";

export default function Projects() {
  const active = [
    {
      tag: "Agriculture",
      title: "Smallholder Farmer Support Network",
      desc: "Supporting 120,000+ farmers across Nyanza with inputs, tractor services, extension support, and market linkages.",
      color: "#1E4E3F",
      status: "Active",
    },
    {
      tag: "Environment",
      title: "Community Tree Nursery & Ecosystem Restoration",
      desc: "Tree-based income systems improving livelihoods while restoring ecosystems.",
      color: "#0F4C4C",
      status: "Active",
    },
    {
      tag: "Education",
      title: "TICOWE Community Primary School",
      desc: "A 160-child capacity school serving vulnerable children in Ndhiwa.",
      color: "#145B5B",
      status: "Active",
    },
    {
      tag: "Health",
      title: "HIV/AIDS & Disease Awareness Program",
      desc: "Community sensitization and home-based care programs across Homa Bay.",
      color: "#1A3A2A",
      status: "Active",
    },
    {
      tag: "Youth",
      title: "AVP Peace Training Initiative",
      desc: "Over 600 youth trained in Alternatives to Violence programs.",
      color: "#1E4E3F",
      status: "Ongoing",
    },
    {
      tag: "Microfinance",
      title: "Community Savings & Loan Groups",
      desc: "55+ groups supporting financial independence and entrepreneurship.",
      color: "#0F4C4C",
      status: "Active",
    },
  ];

  const future = [
    {
      title: "TICOWE Green Africa Resource Centre",
      desc: "A hub for training, innovation, and community empowerment.",
    },
    {
      title: "Community Microfinance Bank",
      desc: "Financial inclusion through community-owned banking services.",
    },
    {
      title: "Permaculture Demonstration Plots",
      desc: "Training farmers in sustainable ecological agriculture.",
    },
    {
      title: "Sugarcane & Maize Value Chains",
      desc: "Organizing farmers into profitable agricultural value chains.",
    },
  ];

  return (
    <div className="bg-[#F5F1E6] font-serif">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] text-center py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#D7992E] text-xs uppercase tracking-widest font-bold border border-[#D7992E]/30 px-4 py-1 rounded-full bg-[#D7992E]/10">
            On the Ground
          </span>

          <h1 className="text-white text-4xl md:text-5xl font-bold mt-6">
            Our Projects
          </h1>

          <p className="text-[#E6EFEA] mt-4 text-lg">
            Real work, real impact across Kenya’s communities.
          </p>
        </div>
      </section>

      {/* Active Projects */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm text-[#C65D3A] uppercase font-bold tracking-widest mb-2">
            Currently Running
          </h2>
          <h3 className="text-3xl font-bold mb-10">Active Projects</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {active.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <div
                  className="h-2"
                  style={{
                    background: `linear-gradient(90deg, ${p.color}, #D7992E)`,
                  }}
                />

                <div className="p-6">
                  <div className="flex justify-between mb-3">
                    <span
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{ background: "#F5F1E6", color: p.color }}
                    >
                      {p.tag}
                    </span>

                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                      {p.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-lg mb-2">{p.title}</h4>
                  <p className="text-sm text-gray-600">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Projects */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm text-[#C65D3A] uppercase font-bold tracking-widest mb-2">
            Looking Ahead
          </h2>
          <h3 className="text-3xl font-bold mb-10">Future Plans</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {future.map((f, i) => (
              <div
                key={f.title}
                className="border rounded-2xl p-6 hover:shadow-lg transition"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F4C4C] to-[#D7992E] text-white flex items-center justify-center font-bold mb-4">
                  {i + 1}
                </div>

                <h4 className="font-bold text-lg mb-2">{f.title}</h4>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-[#F5F1E6]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Help Fund Our Next Project
          </h2>

          <p className="text-gray-600 mb-8">
            Your support directly funds education, agriculture, and community development.
          </p>

          <Link
            href="/donate"
            className="bg-gradient-to-r from-[#C65D3A] to-[#D7992E] text-white px-8 py-3 rounded-full font-semibold"
          >
            Contribute Now
          </Link>
        </div>
      </section>
    </div>
  );
}