"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        setError("Failed to fetch user profile.");
        return;
      }

      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        setError("Access denied. Admin credentials required.");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
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

            {/* email */}
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

            {/* password with show/hide toggle */}
            <div className="mb-8">
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3.5 pr-12 text-sm text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9a9a8a] transition hover:text-[#0F4C4C] focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    /* eye-off icon */
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7a9.77 9.77 0 012.168-3.582M6.343 6.343A9.953 9.953 0 0112 5c5 0 9 4 9 7a9.77 9.77 0 01-1.415 2.587M15 12a3 3 0 01-3 3m0 0a3 3 0 01-3-3m3 3v.01M3 3l18 18" />
                    </svg>
                  ) : (
                    /* eye icon */
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {/* password hint */}
              {form.password.length > 0 && (
                <p className="mt-2 text-right text-xs text-[#9a9a8a]">
                  {showPassword ? "Password visible" : "Password hidden"}
                </p>
              )}
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

        <p className="mt-6 text-center text-xs text-white/30">
          TICOWE Green Africa · Admin Portal · Restricted Access
        </p>
      </div>
    </div>
  );
}
