"use client";

import { useState } from "react";
import Link from "next/link";

export default function Gallery() {
  const items = [
    {
      emoji: "👨‍👩‍👧‍👦",
      title: "Orphan Support Gatherings",
      desc: "Supporting orphans and guardians through food donations and care programs.",
      category: "Child Support",
    },
    {
      emoji: "🕊️",
      title: "AVP Peace Workshops",
      desc: "Over 600 youth trained through Alternatives to Violence workshops.",
      category: "Peace Building",
    },
    {
      emoji: "🏠",
      title: "House Construction for Widows",
      desc: "Volunteers building homes for vulnerable widows in Ndhiwa.",
      category: "Community Support",
    },
    {
      emoji: "🌽",
      title: "Horticulture Harvesting",
      desc: "Farmers harvesting fresh produce using modern techniques.",
      category: "Agriculture",
    },
    {
      emoji: "🌱",
      title: "Sustainable Agriculture Training",
      desc: "Training farmers in climate-smart and regenerative farming.",
      category: "Agriculture",
    },
    {
      emoji: "🐄",
      title: "Dairy Farming Initiatives",
      desc: "Strengthening dairy farming through training and market access.",
      category: "Agribusiness",
    },
    {
      emoji: "🐓",
      title: "Poultry Farming Programs",
      desc: "Livelihood poultry projects empowering women and youth.",
      category: "Agribusiness",
    },
    {
      emoji: "🎓",
      title: "AVP Certificate Ceremony",
      desc: "Recognizing youth who completed peacebuilding programs.",
      category: "Peace Building",
    },
    {
      emoji: "🍎",
      title: "Food Donation Distributions",
      desc: "Community food support events for vulnerable families.",
      category: "Welfare",
    },
    {
      emoji: "💧",
      title: "Farmer Field Training",
      desc: "Hands-on agricultural training by field officers.",
      category: "Agriculture",
    },
    {
      emoji: "📖",
      title: "Community Library Opening",
      desc: "Opening a learning center for vulnerable children.",
      category: "Education",
    },
    {
      emoji: "🌳",
      title: "Tree Nursery Establishment",
      desc: "Community nurseries restoring biodiversity and livelihoods.",
      category: "Environment",
    },
  ];

  const categories = ["All", ...new Set(items.map((i) => i.category))];

  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? items
      : items.filter((i) => i.category === active);

  return (
    <div className="bg-[#F5F1E6] font-serif">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#D7992E] text-xs uppercase tracking-widest font-bold border border-[#D7992E]/30 px-4 py-1 rounded-full bg-[#D7992E]/10">
            Real Stories
          </span>

          <h1 className="text-white text-4xl md:text-5xl font-bold mt-6">
            Impact Gallery
          </h1>

          <p className="text-[#E6EFEA] text-lg mt-4">
            Real people, real work, real transformation across communities.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                active === c
                  ? "bg-[#0F4C4C] text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="h-52 bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] flex items-center justify-center">
                <span className="text-7xl">{item.emoji}</span>
              </div>

              <div className="p-6">
                <span className="inline-block bg-[#F5F1E6] text-[#0F4C4C] text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {item.category}
                </span>

                <h3 className="text-xl font-bold mb-3">{item.title}</h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0F4C4C] py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Be Part of the Next Story
          </h2>

          <p className="text-[#E6EFEA] mb-8 text-lg">
            Volunteer or donate to help us create more impact across Kenya.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/volunteer"
              className="bg-[#C65D3A] text-white px-6 py-3 rounded-full font-semibold"
            >
              Join as Volunteer
            </Link>

            <Link
              href="/donate"
              className="border border-white/20 text-white px-6 py-3 rounded-full"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}