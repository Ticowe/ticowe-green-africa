"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BoardMembers() {
  return (
   // Board Members Section

<section className="py-24 px-6 bg-[#F5F1E6]">
  <div className="max-w-6xl mx-auto">
    {/* Heading */}
    <div className="text-center mb-14">
      <p className="text-[#C65D3A] uppercase tracking-widest text-sm font-bold mb-3">
        Leadership Team
      </p>

      <h2 className="text-3xl md:text-5xl font-black text-[#0F4C4C]">
        Meet Our Board Members
      </h2>

      <p className="max-w-3xl mx-auto mt-5 text-gray-600 text-lg leading-relaxed">
        TICOWE Green Africa is guided by passionate leaders and professionals
        dedicated to empowering communities and driving sustainable impact.
      </p>
    </div>

    {/* Members Grid */}
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          name: "John Doe",
          role: "Executive Director",
          image: "board/director.png",
        },
        {
          name: "Jane Atieno",
          role: "Programs Coordinator",
          image: "board/director.png",
        },
        {
          name: "Peter Ouma",
          role: "Finance & Administration",
          image: "board/director.png",
        },
        {
          name: "Mercy Akinyi",
          role: "Community Outreach Lead",
          image: "board/director.png",
        },
      ].map((member) => (
        <div
          key={member.name}
          className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
        >
          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C4C]/70 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <h3 className="text-2xl font-bold text-[#0F4C4C]">
              {member.name}
            </h3>

            <p className="mt-2 text-sm font-semibold tracking-wide text-[#C65D3A] uppercase">
              {member.role}
            </p>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#D7992E]" />

            <p className="mt-5 text-sm leading-7 text-gray-600">
              Dedicated to community transformation, sustainable development,
              and empowering vulnerable groups across Kenya.
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}
