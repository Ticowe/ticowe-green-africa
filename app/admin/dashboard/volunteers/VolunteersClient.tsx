"use client";

import { useState, useTransition } from "react";
import { VolunteerRow } from "@/types/database";

type Props = {
  volunteers: VolunteerRow[];
  approveVolunteer: (id: string) => Promise<void>;
  rejectVolunteer: (id: string) => Promise<void>;
  activateVolunteer: (id: string) => Promise<void>;
};

const STATUS_TABS = ["all", "pending", "approved", "active", "rejected"] as const;

const statusStyles: Record<string, string> = {
  pending: "bg-[#D7992E]/15 text-[#D7992E]",
  approved: "bg-green-100 text-green-700",
  active: "bg-[#0F4C4C]/15 text-[#0F4C4C]",
  rejected: "bg-red-100 text-red-600",
};

export default function VolunteersClient({ volunteers, approveVolunteer, rejectVolunteer, activateVolunteer }: Props) {
  const [tab, setTab] = useState<typeof STATUS_TABS[number]>("all");
  const [selected, setSelected] = useState<VolunteerRow | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = tab === "all" ? volunteers : volunteers.filter((v) => v.status === tab);
  const counts = STATUS_TABS.reduce((acc, t) => {
    acc[t] = t === "all" ? volunteers.length : volunteers.filter((v) => v.status === t).length;
    return acc;
  }, {} as Record<string, number>);

  function action(fn: (id: string) => Promise<void>, id: string) {
    startTransition(() => { fn(id); setSelected(null); });
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">Management</p>
        <h1 className="mt-1 text-3xl font-black text-[#1A2A22]">Volunteers</h1>
        <p className="mt-1 text-sm text-[#5a6a5a]">{volunteers.length} total applications</p>
      </div>

      {/* tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {STATUS_TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-xl px-4 py-2 text-sm font-bold capitalize transition-all ${tab === t ? "bg-[#0F4C4C] text-white shadow-md" : "bg-white text-[#3a4a3a] border border-[#e0d8c8] hover:bg-[#F5F1E6]"}`}
          >
            {t}{" "}
            <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${tab === t ? "bg-white/20 text-white" : "bg-[#F5F1E6] text-[#5a6a5a]"}`}>
              {counts[t]}
            </span>
          </button>
        ))}
      </div>

      {/* table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f0ece0] bg-[#F5F1E6]">
                {["Name", "Email", "Country", "Duration", "Status", "Applied", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-[#5a6a5a]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ece0]">
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-sm text-[#9a9a8a]">No volunteers in this category.</td></tr>
              )}
              {filtered.map((v) => (
                <tr key={v.id} className="cursor-pointer transition hover:bg-[#F5F1E6]/60" onClick={() => setSelected(v)}>
                  <td className="px-5 py-4 font-semibold text-[#1A2A22]">{v.full_name}</td>
                  <td className="px-5 py-4 text-[#3a4a3a]">{v.email}</td>
                  <td className="px-5 py-4 text-[#5a6a5a]">{v.country}</td>
                  <td className="px-5 py-4 text-[#5a6a5a]">{v.duration ?? "—"}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[v.status]}`}>{v.status}</span>
                  </td>
                  <td className="px-5 py-4 text-[#5a6a5a]">{new Date(v.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      {v.status === "pending" && (
                        <>
                          <button disabled={isPending} onClick={() => action(approveVolunteer, v.id)} className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-700 disabled:opacity-50">Approve</button>
                          <button disabled={isPending} onClick={() => action(rejectVolunteer, v.id)} className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600 disabled:opacity-50">Reject</button>
                        </>
                      )}
                      {v.status === "approved" && (
                        <button disabled={isPending} onClick={() => action(activateVolunteer, v.id)} className="rounded-lg bg-[#0F4C4C] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#145B5B] disabled:opacity-50">Activate</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] px-8 py-10">
              <div className="mb-2 flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[selected.status]}`}>{selected.status}</span>
                <button onClick={() => setSelected(null)} className="text-white/60 hover:text-white text-xl">✕</button>
              </div>
              <h2 className="text-2xl font-black text-white">{selected.full_name}</h2>
              <p className="text-white/60 text-sm mt-1">{selected.email}</p>
            </div>
            <div className="px-8 py-8 space-y-6">
              {[
                { label: "Phone", value: selected.phone },
                { label: "Country", value: selected.country },
                { label: "Duration", value: selected.duration },
                { label: "Applied", value: new Date(selected.created_at).toLocaleString() },
              ].map((f) => (
                <div key={f.label}>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#C65D3A] mb-1">{f.label}</div>
                  <div className="text-sm text-[#3a4a3a]">{f.value ?? "—"}</div>
                </div>
              ))}
              {selected.skills && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#C65D3A] mb-1">Skills</div>
                  <p className="text-sm leading-7 text-[#3a4a3a]">{selected.skills}</p>
                </div>
              )}
              {selected.motivation && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#C65D3A] mb-1">Motivation</div>
                  <p className="text-sm leading-7 text-[#3a4a3a]">{selected.motivation}</p>
                </div>
              )}
              {selected.status === "pending" && (
                <div className="flex gap-3 pt-4">
                  <button disabled={isPending} onClick={() => action(approveVolunteer, selected.id)} className="flex-1 rounded-xl bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-700 disabled:opacity-50">Approve</button>
                  <button disabled={isPending} onClick={() => action(rejectVolunteer, selected.id)} className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-50">Reject</button>
                </div>
              )}
              {selected.status === "approved" && (
                <button disabled={isPending} onClick={() => action(activateVolunteer, selected.id)} className="w-full rounded-xl bg-[#0F4C4C] py-3 text-sm font-bold text-white hover:bg-[#145B5B] disabled:opacity-50">Mark as Active</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
