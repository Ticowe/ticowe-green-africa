import { supabaseAdmin } from "@/lib/supabase/server";
import Link from "next/link";

/* ───────────────────────────────
   TYPES
─────────────────────────────── */
type DonationRow = {
  id: string;
  donor_name: string | null;
  donor_email: string | null;
  amount: number;
  currency: string;
  frequency: "once" | "monthly" | "annually";
  payment_method: string | null;
  status: "pending" | "completed" | "failed";
  created_at: string;
};

/* ───────────────────────────────
   FETCH DONATIONS
─────────────────────────────── */
async function getDonations(): Promise<DonationRow[]> {
  const { data, error } = await supabaseAdmin
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as DonationRow[];
}

/* ───────────────────────────────
   PAGE
─────────────────────────────── */
export default async function DonationsPage() {
  const donations = await getDonations();

  const total = donations.reduce((sum, d) => sum + Number(d.amount), 0);
  const completed = donations.filter((d) => d.status === "completed").length;
  const pending = donations.filter((d) => d.status === "pending").length;
  const failed = donations.filter((d) => d.status === "failed").length;

  return (
    <div className="p-8">
      
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
          Finance
        </p>
        <h1 className="mt-1 text-3xl font-black text-[#1A2A22]">
          Donations
        </h1>
        <p className="mt-1 text-sm text-[#5a6a5a]">
          Total: ${total.toLocaleString()} · {completed} completed · {pending} pending · {failed} failed
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f0ece0] bg-[#F5F1E6]">
                {[
                  "Donor",
                  "Email",
                  "Amount",
                  "Frequency",
                  "Method",
                  "Status",
                  "Date",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-[#5a6a5a]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f0ece0]">
              {donations.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm text-[#9a9a8a]"
                  >
                    No donations yet.
                  </td>
                </tr>
              )}

              {donations.map((d) => (
                <tr key={d.id} className="hover:bg-[#F5F1E6]/50 transition">
                  {/* Donor */}
                  <td className="px-6 py-4 font-semibold text-[#1A2A22]">
                    {d.donor_name || "Anonymous"}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-[#5a6a5a]">
                    {d.donor_email || "—"}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-bold text-[#0F4C4C]">
                    ${Number(d.amount).toLocaleString()}
                  </td>

                  {/* Frequency */}
                  <td className="px-6 py-4 text-[#5a6a5a] capitalize">
                    {d.frequency}
                  </td>

                  {/* Method */}
                  <td className="px-6 py-4 text-[#5a6a5a]">
                    {d.payment_method || "—"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        d.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : d.status === "pending"
                          ? "bg-[#D7992E]/15 text-[#D7992E]"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-[#5a6a5a]">
                    {new Date(d.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}