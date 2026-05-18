import { supabaseAdmin } from "@/lib/supabase/server";
import { UserRow } from "@/types/database";

async function getUsers(): Promise<UserRow[]> {
  const { data, error } = await supabaseAdmin.from("users").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">Management</p>
        <h1 className="mt-1 text-3xl font-black text-[#1A2A22]">Users</h1>
        <p className="mt-1 text-sm text-[#5a6a5a]">{users.length} registered user{users.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f0ece0] bg-[#F5F1E6]">
                {["Name", "Email", "Country", "Role", "Joined", "Last Seen"].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-[#5a6a5a]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ece0]">
              {users.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-sm text-[#9a9a8a]">No users found.</td></tr>
              )}
              {users.map((user) => (
                <tr key={user.id} className="transition hover:bg-[#F5F1E6]/60">
                  <td className="px-6 py-4 font-semibold text-[#1A2A22]">{user.full_name ?? "—"}</td>
                  <td className="px-6 py-4 text-[#3a4a3a]">{user.email}</td>
                  <td className="px-6 py-4 text-[#5a6a5a]">{user.country ?? "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${user.role === "admin" ? "bg-[#0F4C4C]/10 text-[#0F4C4C]" : "bg-[#F5F1E6] text-[#5a6a5a]"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#5a6a5a]">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-[#5a6a5a]">{user.last_seen ? new Date(user.last_seen).toLocaleDateString() : "Never"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
