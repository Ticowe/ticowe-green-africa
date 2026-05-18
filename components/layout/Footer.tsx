// components/layout/Footer.tsx

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0F4C4C] text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F]" />

      {/* Decorative Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-[#D7992E] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#C65D3A] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              TICOWE
            </h2>

            <p className="mt-1 text-xl font-semibold text-[#D7992E]">
              GREEN AFRICA
            </p>

            <div className="mt-3 h-1 w-20 rounded-full bg-[#D7992E]" />

            <p className="mt-6 text-sm leading-7 text-[#E6EFEA]">
              Tropical Initiative for Communities and Women Empowerment
              (TICOWE Green Africa) is dedicated to empowering communities,
              improving livelihoods, and promoting sustainable development
              through agriculture, education, health, and youth empowerment.
            </p>

            {/* Socials */}
            <div className="mt-8 flex gap-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61589745010789"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-[#D7992E]"
              >
                <FaFacebookF size={17} />
              </Link>

              <Link
                href="https://www.instagram.com/ticowegreenafrica/?hl=en"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-[#C65D3A]"
              >
                <FaInstagram size={17} />
              </Link>

              <Link
                href="https://x.com/ticowe26683"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-[#7DA79A]"
              >
                <FaXTwitter size={17} />
              </Link>

              <Link
                href="https://www.linkedin.com/in/ticowe-africa-2ab94040b/"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-[#556B2F]"
              >
                <FaLinkedinIn size={17} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-[#D7992E]">
              Quick Links
            </h3>

            <div className="mt-2 h-1 w-14 rounded-full bg-[#D7992E]" />

            <div className="mt-6 flex flex-col gap-4 text-sm text-[#E6EFEA]">
              {[
                "Home",
                "About Us",
                "Programs",
                "Projects",
                "Volunteer",
                "Donate",
              ].map((item) => (
                <Link
                  key={item}
                  href="/"
                  className="transition-all duration-300 hover:translate-x-2 hover:text-[#D7992E]"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold text-[#D7992E]">
              Our Programs
            </h3>

            <div className="mt-2 h-1 w-14 rounded-full bg-[#D7992E]" />

            <div className="mt-6 flex flex-col gap-4 text-sm text-[#E6EFEA]">
              <p>Agriculture & Food Security</p>
              <p>Women Empowerment</p>
              <p>Youth Development</p>
              <p>Climate Smart Farming</p>
              <p>Community Health</p>
              <p>Education Support</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-[#D7992E]">
              Contact Us
            </h3>

            <div className="mt-2 h-1 w-14 rounded-full bg-[#D7992E]" />

            <div className="mt-6 space-y-6 text-sm text-[#E6EFEA]">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-[#D7992E]/20 p-3">
                  <MapPin size={18} className="text-[#D7992E]" />
                </div>

                <p className="leading-6">
                  P.O BOX 184 - 40300
                  <br />
                  Ndhiwa, Kenya
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-[#7DA79A]/20 p-3">
                  <Phone size={18} className="text-[#7DA79A]" />
                </div>

                <div className="space-y-1">
                  <p>+254 746 344 222 - Organization Director</p>
                  <p>+254 723 540 899 - Board Chairperson</p>
                  <p>+254 720 997 371 - Office Line</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-[#C65D3A]/20 p-3">
                  <Mail size={18} className="text-[#C65D3A]" />
                </div>

                <p>ticowegreenafrica@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-[#DCE8E2] md:flex-row">
            <p>
              © {new Date().getFullYear()} TICOWE Green Africa. All rights
              reserved.
            </p>

            <p className="italic text-[#D7992E]">
              Empowering Communities, Transforming Lives
            </p>

            <div className="flex gap-6">
              <Link
                href="#"
                className="transition hover:text-[#D7992E]"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="transition hover:text-[#D7992E]"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Color Strip */}
        <div className="mt-8 grid h-2 grid-cols-4 overflow-hidden rounded-full">
          <div className="bg-[#0F4C4C]" />
          <div className="bg-[#C65D3A]" />
          <div className="bg-[#D7992E]" />
          <div className="bg-[#556B2F]" />
        </div>
      </div>
    </footer>
  );
}