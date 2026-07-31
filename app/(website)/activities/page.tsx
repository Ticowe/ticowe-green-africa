"use client";

import { useState } from "react";

import ActivitiesSection from "@/components/activities/ActivitiesSection";

const CATEGORIES = [
  "All",
  "Agriculture",
  "Education",
  "Health",
  "Peace Building",
  "Women & Youth",
  "Environment",
  "Community Outreach",
  "Training",
  "Other",
];

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("All");

  return (
    <main>
      <section className="bg-[#0F4C4C] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7992E]">
            Our Work
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            Activities and Impact
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
            Explore the activities, outreach programs, training
            sessions, and community projects we have completed.
          </p>

          <div className="mx-auto mt-8 max-w-2xl">
            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search activities..."
              className="w-full rounded-2xl border border-white/20 bg-white px-5 py-4 text-sm text-[#1A2A22] outline-none placeholder:text-[#879087] focus:ring-4 focus:ring-white/15"
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  activeCategory === category
                    ? "bg-[#D7992E] text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <ActivitiesSection
        searchQuery={searchQuery}
        activeCategory={activeCategory}
      />
    </main>
  );
}