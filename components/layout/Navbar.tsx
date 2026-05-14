// components/layout/Navbar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Projects", href: "/projects" },
  { name: "Impact", href: "/impact" },
  { name: "Gallery", href: "/gallery" },
  { name: "Volunteer", href: "/volunteer" },
  {name: "News", href: "/news" },
  {name: "Future Plans", href: "/future-plans" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#0F4C4C]/10 bg-white/90 shadow-sm backdrop-blur-xl">
      {/* Top Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0F4C4C] via-[#D7992E] to-[#556B2F]" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          {/* Logo Image */}
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#D7992E]/40 bg-white shadow-lg">
            <Image
              src="/images/logo.png"
              alt="TICOWE Green Africa"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Text */}
          {/* <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#0F4C4C]">
              TICOWE
            </h1>

            <p className="text-lg font-semibold text-[#556B2F]">
              GREEN AFRICA
            </p>

            <p className="hidden text-xs text-[#7A7A7A] md:block">
              Empowering Communities, Transforming Lives
            </p>
          </div> */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative text-sm font-semibold text-[#163D3D] transition duration-300"
            >
              {link.name}

              {/* Underline Animation */}
              <span className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-[#D7992E] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="/donate"
            className="group flex items-center gap-2 rounded-2xl bg-[#C65D3A] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#D7992E]"
          >
            <HeartHandshake size={18} />

            <span>Donate Now</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-[#0F4C4C]/10 bg-white p-2 text-[#0F4C4C] shadow-sm transition hover:bg-[#F5F1E6] lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="border-t border-[#0F4C4C]/10 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#163D3D] transition-all duration-300 hover:bg-[#F5F1E6] hover:text-[#C65D3A]"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile CTA */}
              <Link
                href="/donate"
                className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#C65D3A] px-5 py-3 text-center text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#D7992E]"
              >
                <HeartHandshake size={18} />

                <span>Donate Now</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}