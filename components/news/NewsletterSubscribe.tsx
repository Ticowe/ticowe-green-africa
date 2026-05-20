"use client";

import { useState } from "react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function subscribe() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setSuccess(true);
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-[#0F4C4C] px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7992E]">
          Stay Updated
        </p>

        <h2 className="mt-3 text-4xl font-black text-white">
          Subscribe to Our Newsletter
        </h2>

        <p className="mt-5 text-lg leading-8 text-[#E6EFEA]">
          Get updates about our community projects,
          volunteer opportunities, and impact stories.
        </p>

        {success ? (
          <div className="mt-8 rounded-2xl bg-white/10 px-6 py-5 text-white">
            Thank you for subscribing!
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 flex-1 rounded-2xl border border-white/20 bg-white/10 px-5 text-white placeholder:text-white/60 outline-none"
            />

            <button
              onClick={subscribe}
              disabled={loading}
              className="h-14 rounded-2xl bg-[#D7992E] px-8 text-sm font-bold text-[#1A2A22] transition hover:scale-[1.02]"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 text-sm text-red-300">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}