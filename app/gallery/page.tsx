"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Gallery() {
  const items = [
    {
      image: "/gallery/orphan_support.jpeg",
      title: "Orphan Support Gatherings",
      desc: "Supporting orphans and guardians through food donations and care programs.",
      category: "Child Support",
    },
    {
      image: "/gallery/peace_building.jpeg",
      title: "AVP Peace Workshops",
      desc: "Over 600 youth trained through Alternatives to Violence workshops.",
      category: "Peace Building",
    },
    {
      image: "/gallery/house_construction.jpeg",
      title: "House Construction for Widows",
      desc: "Volunteers building homes for vulnerable widows in Ndhiwa.",
      category: "Community Support",
    },
    {
      image: "/gallery/farm_training.jpeg",
      title: "Horticulture Harvesting",
      desc: "Farmers harvesting fresh produce using modern techniques.",
      category: "Agriculture",
    },
    {
      image: "/gallery/farm_training.jpeg",
      title: "Sustainable Agriculture Training",
      desc: "Training farmers in climate-smart and regenerative farming.",
      category: "Agriculture",
    },
    {
      image: "/gallery/farm_training.jpeg",
      title: "Dairy Farming Initiatives",
      desc: "Strengthening dairy farming through training and market access.",
      category: "Agribusiness",
    },
    {
      image: "/gallery/farm_training.jpeg",
      title: "Poultry Farming Programs",
      desc: "Livelihood poultry projects empowering women and youth.",
      category: "Agribusiness",
    },
    {
      image: "/gallery/peace_building.jpeg",
      title: "AVP Certificate Ceremony",
      desc: "Recognizing youth who completed peacebuilding programs.",
      category: "Peace Building",
    },
    {
      image: "/gallery/farm_training.jpeg",
      title: "Food Donation Distributions",
      desc: "Community food support events for vulnerable families.",
      category: "Welfare",
    },
    {
      image: "/gallery/farm_training.jpeg",
      title: "Farmer Field Training",
      desc: "Hands-on agricultural training by field officers.",
      category: "Agriculture",
    },
    {
      image: "/gallery/farm_training.jpeg",
      title: "Community Library Opening",
      desc: "Opening a learning center for vulnerable children.",
      category: "Education",
    },
    {
      image: "/gallery/farm_training.jpeg",
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
      <section className="bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="rounded-full border border-[#D7992E]/30 bg-[#D7992E]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#D7992E]">
            Real Stories
          </span>

          <h1 className="mt-6 text-4xl font-black text-white md:text-6xl">
            Impact Gallery
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-[#E6EFEA]">
            Real people, real work, real transformation across communities.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                active === c
                  ? "bg-[#0F4C4C] text-white shadow-lg"
                  : "border bg-white text-gray-700 hover:bg-[#0F4C4C] hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-[2rem] bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Category Badge */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#0F4C4C] backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-bold text-[#0F4C4C]">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-gray-600">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0F4C4C] px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black text-white md:text-5xl">
            Be Part of the Next Story
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#E6EFEA]">
            Volunteer or donate to help us create more impact across Kenya.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/volunteer"
              className="rounded-full bg-[#C65D3A] px-7 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-[#D7992E]"
            >
              Join as Volunteer
            </Link>

            <Link
              href="/donate"
              className="rounded-full border border-white/20 px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-[#0F4C4C]"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}