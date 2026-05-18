import { supabaseAdmin } from "@/lib/supabase/server";
import Link from "next/link";

type Message = {
  id: string;
  full_name: string;
  subject: string;
  status: string;
  created_at: string;
};

type Volunteer = {
  id: string;
  full_name: string;
  country: string;
  status: string;
  created_at: string;
};

type News = {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
};

type Donation = {
  amount: number;
};

async function getStats() {
  const [users, volunteers, messages, news, donations] = await Promise.all([
    supabaseAdmin.from("users").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("volunteers").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("messages").select("*", { count: "exact", head: true }).eq("status", "unread"),
    supabaseAdmin.from("news").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabaseAdmin.from("donations").select("amount").eq("status", "completed"),
  ]);
  const donationRows = (donations.data ?? []) as Donation[];

  const totalDonations =
  donationRows.reduce((sum, d) => sum + Number(d.amount), 0);
  return {
    users: users.count ?? 0,
    volunteers: volunteers.count ?? 0,
    unreadMessages: messages.count ?? 0,
    publishedNews: news.count ?? 0,
    totalDonations,
  };
}

async function getRecentItems() {
  const [messages, volunteers, news] = await Promise.all([
    supabaseAdmin
      .from("messages")
      .select("id, full_name, subject, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),

    supabaseAdmin
      .from("volunteers")
      .select("id, full_name, country, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),

    supabaseAdmin
      .from("news")
      .select("id, title, category, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return {
    messages: (messages.data ?? []) as Message[],
    volunteers: (volunteers.data ?? []) as Volunteer[],
    news: (news.data ?? []) as News[],
  };
}

export default async function AdminDashboard() {
  const [stats, recent] = await Promise.all([getStats(), getRecentItems()]);

  const statCards = [
    { label: "Total Users", value: stats.users, href: "/admin/dashboard/users", color: "from-[#0F4C4C] to-[#145B5B]", accent: "#D7992E", icon: "👤" },
    { label: "Volunteers", value: stats.volunteers, href: "/admin/dashboard/volunteers", color: "from-[#1E4E3F] to-[#0F4C4C]", accent: "#C65D3A", icon: "🤝" },
    { label: "Unread Messages", value: stats.unreadMessages, href: "/admin/dashboard/messages", color: "from-[#145B5B] to-[#1A3A2A]", accent: "#D7992E", icon: "✉️" },
    { label: "Published Articles", value: stats.publishedNews, href: "/admin/dashboard/news", color: "from-[#1A3A2A] to-[#1E4E3F]", accent: "#C65D3A", icon: "📰" },
    { label: "Total Donations (USD)", value: `$${stats.totalDonations.toLocaleString()}`, href: "/admin/dashboard/donations", color: "from-[#0F4C4C] to-[#1A3A2A]", accent: "#D7992E", icon: "💰" },
  ];

  return (
    <div className="p-8">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">Overview</p>
        <h1 className="mt-1 text-3xl font-black text-[#1A2A22]">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-[#5a6a5a]">
          {new Date().toLocaleDateString("en-KE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* stat cards */}
      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}
            className={`group overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-6 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="mb-3 text-2xl">{card.icon}</div>
            <div className="text-3xl font-black">{card.value}</div>
            <div className="mt-1 text-xs font-semibold text-white/60">{card.label}</div>
            <div className="mt-4 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-14" style={{ background: card.accent }} />
          </Link>
        ))}
      </div>

      {/* recent activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* messages */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-black text-[#1A2A22]">Recent Messages</h2>
            <Link href="/admin/messages" className="text-xs font-bold text-[#C65D3A] hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {recent.messages.length === 0 && <p className="text-sm text-[#9a9a8a]">No messages yet.</p>}
            {recent.messages.map((m) => (
              <div key={m.id} className="flex items-start gap-3 rounded-xl border border-[#f0ece0] p-3">
                <div className={`mt-0.5 h-2 w-2 flex-shrink-0 rounded-full ${m.status === "unread" ? "bg-[#C65D3A]" : "bg-[#c0c0b0]"}`} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#1A2A22]">{m.full_name}</p>
                  <p className="truncate text-xs text-[#5a6a5a]">{m.subject}</p>
                  <p className="mt-0.5 text-[10px] text-[#9a9a8a]">{new Date(m.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* volunteers */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-black text-[#1A2A22]">New Volunteers</h2>
            <Link href="/admin/volunteers" className="text-xs font-bold text-[#C65D3A] hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {recent.volunteers.length === 0 && <p className="text-sm text-[#9a9a8a]">No applications yet.</p>}
            {recent.volunteers.map((v) => (
              <div key={v.id} className="flex items-center justify-between rounded-xl border border-[#f0ece0] p-3">
                <div>
                  <p className="text-sm font-bold text-[#1A2A22]">{v.full_name}</p>
                  <p className="text-xs text-[#5a6a5a]">{v.country}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                  v.status === "pending" ? "bg-[#D7992E]/15 text-[#D7992E]"
                  : v.status === "approved" || v.status === "active" ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
                }`}>{v.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* news */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-black text-[#1A2A22]">Latest News</h2>
            <Link href="/admin/news" className="text-xs font-bold text-[#C65D3A] hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {recent.news.length === 0 && <p className="text-sm text-[#9a9a8a]">No articles yet.</p>}
            {recent.news.map((n) => (
              <div key={n.id} className="rounded-xl border border-[#f0ece0] p-3">
                <p className="text-sm font-bold text-[#1A2A22] leading-snug">{n.title}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="rounded-full bg-[#F5F1E6] px-2 py-0.5 text-[10px] font-bold text-[#0F4C4C]">{n.category}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${n.status === "published" ? "bg-green-100 text-green-700" : "bg-[#D7992E]/15 text-[#D7992E]"}`}>{n.status}</span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/admin/news/new" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C4C] py-3 text-sm font-bold text-white transition hover:bg-[#145B5B]">
            + New Article
          </Link>
        </div>
      </div>
    </div>
  );
}
