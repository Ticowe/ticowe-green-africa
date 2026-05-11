"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Leaf,
  HeartHandshake,
  GraduationCap,
  Users,
  Sprout,
  HeartPulse,
  ArrowRight,
} from "lucide-react";

const programs = [
  {
    title: "Agriculture & Food Security",
    icon: Leaf,
    color: "#556B2F",
    bg: "#556B2F15",
    description:
      "Equipping smallholder farmers with tools, training, and resources to boost yields and ensure year-round food security.",
    href: "/programs/agriculture",
  },
  {
    title: "Women Empowerment",
    icon: HeartHandshake,
    color: "#C65D3A",
    bg: "#C65D3A15",
    description:
      "Building economic independence and leadership capacity for women through skills training, microfinance, and mentorship.",
    href: "/programs/women",
  },
  {
    title: "Youth Development",
    icon: Users,
    color: "#0F4C4C",
    bg: "#0F4C4C15",
    description:
      "Unlocking the potential of young people through entrepreneurship, vocational training, and civic engagement programs.",
    href: "/programs/youth",
  },
  {
    title: "Education Support",
    icon: GraduationCap,
    color: "#D7992E",
    bg: "#D7992E15",
    description:
      "Providing scholarships, school infrastructure, and learning materials to keep children in school and thriving.",
    href: "/programs/education",
  },
  {
    title: "Climate Smart Farming",
    icon: Sprout,
    color: "#7DA79A",
    bg: "#7DA79A15",
    description:
      "Introducing drought-resistant crops, water harvesting, and eco-friendly practices to build resilience against climate change.",
    href: "/programs/climate",
  },
  {
    title: "Community Health",
    icon: HeartPulse,
    color: "#C65D3A",
    bg: "#C65D3A15",
    description:
      "Improving access to primary healthcare, nutrition, and hygiene education for families in underserved communities.",
    href: "/programs/health",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Programs() {
  return (
    <section className="bg-[#F9FAFB] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-[#D7992E]/10 px-5 py-2 text-sm font-semibold text-[#C65D3A]">
            Our Programs
          </span>
          <h2 className="mt-6 text-4xl font-black text-[#0F4C4C] md:text-5xl">
            Creating Sustainable Impact Across Communities
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We deliver transformative programs that improve livelihoods,
            strengthen communities, and create opportunities for sustainable
            growth.
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                variants={cardVariants}
                className="group relative flex flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Icon */}
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: program.bg }}
                >
                  <Icon
                    size={26}
                    strokeWidth={1.8}
                    style={{ color: program.color }}
                  />
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-[#0F4C4C]">
                  {program.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-gray-500">
                  {program.description}
                </p>

                {/* Learn more link */}
                <Link
                  href={program.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                  style={{ color: program.color }}
                >
                  Learn more
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-[3px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ backgroundColor: program.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#0F4C4C] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#D7992E]"
          >
            View All Programs
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
