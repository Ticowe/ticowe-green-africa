"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const nav = [
  { href: "/admin/dashboard/", label: "Dashboard", icon: "⊞" },
  { href: "/admin/dashboard/users", label: "Users", icon: "👤" },
  { href: "/admin/dashboard/volunteers", label: "Volunteers", icon: "🤝" },
  { href: "/admin/dashboard/messages", label: "Messages", icon: "✉️" },
  { href: "/admin/dashboard/news", label: "News", icon: "📰" },
  { href: "/admin/dashboard/donations", label: "Donations", icon: "💰" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#0a2e2e] text-white shadow-2xl">
      {/* logo */}
      <div className="flex items-center gap-3 border-b border-white/08 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#D7992E] to-[#C65D3A] text-sm font-black shadow-lg">
          T
        </div>
        <div>
          <div className="text-sm font-black text-white tracking-wide">TICOWE</div>
          <div className="text-[10px] text-white/40 uppercase tracking-widest">Admin Panel</div>
        </div>
      </div>

      {/* nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                active
                  ? "bg-[#0F4C4C] text-white shadow-md border border-[#1E7070]/40"
                  : "text-white/55 hover:bg-white/06 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#D7992E]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* sign out */}
      <div className="border-t border-white/08 px-3 py-4">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/40 transition hover:bg-white/06 hover:text-white"
        >
          <span>⎋</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
