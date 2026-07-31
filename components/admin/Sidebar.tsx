"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

const nav = [
  { href: "/admin/dashboard/", label: "Dashboard", icon: "⊞" },
  { href: "/admin/dashboard/users", label: "Users", icon: "👤" },
  { href: "/admin/dashboard/volunteers", label: "Volunteers", icon: "🤝" },
  { href: "/admin/dashboard/messages", label: "Messages", icon: "✉️" },
  // { href: "/admin/dashboard/news", label: "News", icon: "📰" },
  { href: "/admin/dashboard/activities", label: "Activities", icon: "📰"},
  { href: "/admin/dashboard/donations", label: "Donations", icon: "💰" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  // Close sidebar automatically on desktop resize
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#0a2e2e] px-4 text-white shadow-lg lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#D7992E] to-[#C65D3A] text-sm font-black shadow-lg">
            T
          </div>

          <div>
            <div className="text-sm font-black tracking-wide">
              TICOWE
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              Admin Panel
            </div>
          </div>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl"
        >
          ☰
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-[#0a2e2e] text-white shadow-2xl transition-transform duration-300
          
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#D7992E] to-[#C65D3A] text-sm font-black shadow-lg">
              T
            </div>

            <div>
              <div className="text-sm font-black tracking-wide">
                TICOWE
              </div>

              <div className="text-[10px] uppercase tracking-widest text-white/40">
                Admin Panel
              </div>
            </div>
          </div>

          {/* Close button mobile */}
          <button
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-lg lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          {nav.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "border border-[#1E7070]/40 bg-[#0F4C4C] text-white shadow-md"
                    : "text-white/55 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-base">
                  {item.icon}
                </span>

                {item.label}

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#D7992E]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 px-3 py-4">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <span>⎋</span>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}