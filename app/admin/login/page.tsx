"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    if (!data.user) {
      setError("Login failed. No user returned.");
      return;
    }

      const { data: profile, error: profileError } = await supabase
  .from("users")
  .select("role")
  .eq("id", data.user.id)
  .single<{ role: string }>();

    if (profileError) {
      setError("Failed to fetch user profile");
      return;
    }

    if (profile?.role !== "admin") {
      await supabase.auth.signOut();
      setError("Access denied. Admin only.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();

  } catch (err: any) {
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
}

  


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F] px-6">
      {/* decorative circles */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#D7992E]/10" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#C65D3A]/08" />

      <div className="relative w-full max-w-md">
        {/* logo */}
        <div className="mb-8 text-center">

          <h1 className="text-2xl font-black text-white">TICOWE Admin</h1>
          <p className="mt-1 text-sm text-white/50">Sign in to manage the website</p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

          <form onSubmit={handleLogin} className="px-10 py-10">
            <h2 className="mb-8 text-2xl font-black text-[#1A2A22]">Sign In</h2>

            {error && (
              <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </div>
            )}

            <div className="mb-5">
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">
                Email Address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="admin@ticowe.org"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3.5 text-sm text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
              />
            </div>

            <div className="mb-8">
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3.5 text-sm text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-[#0F4C4C] to-[#1E4E3F] py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:scale-[1.01] hover:shadow-xl disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign In to Admin Panel"}
            </button>
          </form>
        </div>

        
      </div>
    </div>
  );
}
