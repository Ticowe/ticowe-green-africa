"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { MessageRow } from "@/types/database";

const statusStyles: Record<string, string> = {
  unread: "bg-[#C65D3A]/15 text-[#C65D3A]",
  read: "bg-[#F5F1E6] text-[#5a6a5a]",
  replied: "bg-green-100 text-green-700",
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [selected, setSelected] = useState<MessageRow | null>(null);
  const [tab, setTab] = useState<"all" | "unread" | "read" | "replied">("all");
  const [loading, setLoading] = useState(true);

  async function loadMessages() {
    setLoading(true);
    // Cast to any to bypass the schema type checks
    const { data } = await (supabase as any).from("messages").select("*").order("created_at", { ascending: false });
    setMessages((data as MessageRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { loadMessages(); }, []);

  // Real-time subscription
  useEffect(() => {
    const channel = (supabase as any)
      .channel("messages_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, () => loadMessages())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function markAs(id: string, status: "read" | "replied") {
    // Cast to any here stops the payload from hitting the 'never' parameter trap
    await (supabase as any).from("messages").update({ status }).eq("id", id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : null);
  }

  async function openMessage(msg: MessageRow) {
    setSelected(msg);
    if (msg.status === "unread") await markAs(msg.id, "read");
  }

  const filtered = tab === "all" ? messages : messages.filter((m) => m.status === tab);
  const counts = { all: messages.length, unread: messages.filter((m) => m.status === "unread").length, read: messages.filter((m) => m.status === "read").length, replied: messages.filter((m) => m.status === "replied").length };

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">Inbox</p>
        <h1 className="mt-1 text-3xl font-black text-[#1A2A22]">Messages</h1>
        <p className="mt-1 text-sm text-[#5a6a5a]">{counts.unread} unread · {messages.length} total</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(["all", "unread", "read", "replied"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-xl px-4 py-2 text-sm font-bold capitalize transition-all ${tab === t ? "bg-[#0F4C4C] text-white shadow-md" : "bg-white text-[#3a4a3a] border border-[#e0d8c8] hover:bg-[#F5F1E6]"}`}
          >
            {t}{" "}
            <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${tab === t ? "bg-white/20 text-white" : "bg-[#F5F1E6] text-[#5a6a5a]"}`}>{counts[t]}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-6" style={{ height: "calc(100vh - 260px)" }}>
        {/* list */}
        <div className="w-96 flex-shrink-0 overflow-y-auto rounded-2xl bg-white shadow-sm">
          {loading && <div className="px-6 py-12 text-center text-sm text-[#9a9a8a]">Loading…</div>}
          {!loading && filtered.length === 0 && <div className="px-6 py-12 text-center text-sm text-[#9a9a8a]">No messages here.</div>}
          {filtered.map((msg) => (
            <button key={msg.id} onClick={() => openMessage(msg)}
              className={`w-full border-b border-[#f0ece0] px-5 py-4 text-left transition hover:bg-[#F5F1E6] ${selected?.id === msg.id ? "bg-[#F5F1E6]" : ""}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-bold text-sm ${msg.status === "unread" ? "text-[#1A2A22]" : "text-[#3a4a3a]"}`}>{msg.full_name}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusStyles[msg.status]}`}>{msg.status}</span>
              </div>
              <p className="text-xs font-semibold text-[#3a4a3a] truncate">{msg.subject}</p>
              <p className="mt-1 text-xs text-[#3a4a3a] truncate">{msg.message.slice(0, 60)}…</p>
              <p className="mt-1.5 text-[10px] text-[#c0c0b0]">{new Date(msg.created_at).toLocaleString()}</p>
            </button>
          ))}
        </div>

        {/* detail */}
        <div className="flex-1 overflow-y-auto rounded-2xl bg-white shadow-sm">
          {!selected ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-5xl mb-4">✉️</div>
              <h3 className="font-black text-[#1A2A22] text-xl">Select a message</h3>
              <p className="text-sm text-[#9a9a8a] mt-2">Click any message on the left to read it</p>
            </div>
          ) : (
            <div className="p-8">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#1A2A22]">{selected.subject}</h2>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#5a6a5a]">
                    <span className="font-semibold text-[#3a4a3a]">{selected.full_name}</span>
                    <span>·</span>
                    <a href={`mailto:${selected.email}`} className="text-[#0F4C4C] hover:underline">{selected.email}</a>
                    <span>·</span>
                    <span>{new Date(selected.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[selected.status]}`}>{selected.status}</span>
              </div>
              <div className="rounded-2xl bg-[#F5F1E6] px-8 py-7">
                <p className="text-[15px] leading-8 text-[#3a4a3a] whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  onClick={() => markAs(selected.id, "replied")}
                  className="rounded-xl bg-[#0F4C4C] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#145B5B]"
                >
                  Reply via Email
                </a>
                {selected.status !== "replied" && (
                  <button onClick={() => markAs(selected.id, "replied")}
                    className="rounded-xl border border-[#e0d8c8] px-6 py-3 text-sm font-bold text-[#3a4a3a] transition hover:bg-[#F5F1E6]"
                  >
                    Mark as Replied
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}