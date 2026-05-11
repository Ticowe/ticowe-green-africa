// app/donate/page.tsx

"use client";

import { useState } from "react";

export default function DonatePage() {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState("once");
  const [method, setMethod] = useState("");
  const [donated, setDonated] = useState(false);

  const presets = [10, 25, 50, 100, 250, 500];

  const finalAmount = custom ? Number(custom) : amount;

  const impacts = [
    {
      amt: 10,
      impact:
        "Provides school supplies for one child for a month",
    },
    {
      amt: 25,
      impact:
        "Covers agricultural training materials for 5 farmers",
    },
    {
      amt: 50,
      impact:
        "Funds one week of food support for an orphan family",
    },
    {
      amt: 100,
      impact:
        "Sponsors one youth through an AVP peace training workshop",
    },
    {
      amt: 250,
      impact:
        "Plants 50 trees with trained community nursery workers",
    },
    {
      amt: 500,
      impact:
        "Supports a microfinance group for an entire quarter",
    },
  ];

  const paymentMethods = [
    "💳 Card",
    "📱 M-Pesa",
    "🏦 Bank Transfer",
    "🌐 PayPal",
  ];

  return (
    <div className="bg-[#F5F1E6] font-serif">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#C65D3A] via-[#b8451e] to-[#1E4E3F] px-6 py-24 text-center">
        <div className="absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full bg-[#D7992E]/10" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mb-5 inline-flex rounded-full border border-white/30 bg-white/15 px-5 py-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              Make a Difference Today
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
            Donate to TICOWE
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-white/85">
            Your generosity directly funds farming programs,
            education, and community empowerment across
            Kenya&apos;s Nyanza region.
          </p>
        </div>
      </section>

      {donated ? (
        <section className="px-6 py-24">
          <div className="mx-auto max-w-3xl rounded-[36px] bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] px-8 py-16 text-center text-white shadow-[0_20px_60px_rgba(15,76,76,0.25)] md:px-14">
            <div className="mb-5 text-6xl">🙏</div>

            <h2 className="mb-5 text-4xl font-black leading-tight">
              Thank You for Your Generosity!
            </h2>

            <p className="mb-4 text-lg leading-8 text-[#E6EFEA]">
              Your donation of{" "}
              <span className="font-bold text-[#D7992E]">
                ${finalAmount}
              </span>{" "}
              will make a direct impact on communities in
              Ndhiwa, Homa Bay County.
            </p>

            <p className="text-sm leading-7 text-[#E6EFEA]/70">
              A receipt has been sent to your email. TICOWE
              is eternally grateful for your support.
            </p>
          </div>
        </section>
      ) : (
        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.2fr_1fr]">
            {/* Donation Form */}
            <div className="rounded-[32px] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:p-10">
              <h2 className="mb-8 text-3xl font-black text-[#1A2A22]">
                Choose Your Contribution
              </h2>

              {/* Frequency */}
              <div className="mb-8">
                <label className="mb-3 block text-sm font-bold text-[#1A2A22]">
                  Donation Frequency
                </label>

                <div className="flex gap-3">
                  {["once", "monthly", "annually"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFrequency(f)}
                      className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold capitalize transition-all duration-300 ${
                        frequency === f
                          ? "bg-[#0F4C4C] text-white shadow-lg"
                          : "bg-[#F5F1E6] text-[#3a4a3a] hover:bg-[#ece5d6]"
                      }`}
                    >
                      {f === "once"
                        ? "One-time"
                        : f.charAt(0).toUpperCase() +
                          f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Presets */}
              <div className="mb-8">
                <label className="mb-3 block text-sm font-bold text-[#1A2A22]">
                  Select Amount (USD)
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setAmount(preset);
                        setCustom("");
                      }}
                      className={`rounded-2xl px-4 py-4 text-lg font-bold transition-all duration-300 ${
                        amount === preset && !custom
                          ? "bg-[#0F4C4C] text-white shadow-lg"
                          : "bg-[#F5F1E6] text-[#3a4a3a] hover:bg-[#ece5d6]"
                      }`}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="mb-8">
                <label className="mb-3 block text-sm font-bold text-[#1A2A22]">
                  Or Enter Custom Amount
                </label>

                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-[#5a6a5a]">
                    $
                  </span>

                  <input
                    type="number"
                    placeholder="0.00"
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value);
                      setAmount(0);
                    }}
                    className={`w-full rounded-2xl border bg-[#F5F1E6] py-4 pl-9 pr-4 text-base text-[#1A2A22] outline-none transition-all focus:ring-2 focus:ring-[#0F4C4C]/20 ${
                      custom
                        ? "border-[#0F4C4C]"
                        : "border-[#e0d8c8]"
                    }`}
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-10">
                <label className="mb-3 block text-sm font-bold text-[#1A2A22]">
                  Payment Method
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMethod(m)}
                      className={`rounded-2xl border px-4 py-4 text-sm font-semibold transition-all duration-300 ${
                        method === m
                          ? "border-[#0F4C4C] bg-[#F5F1E6] text-[#0F4C4C]"
                          : "border-[#e0d8c8] bg-white text-[#3a4a3a] hover:bg-[#faf7ef]"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Donate Button */}
              <button
                onClick={() => setDonated(true)}
                className="w-full rounded-2xl bg-gradient-to-r from-[#C65D3A] to-[#D7992E] px-6 py-5 text-lg font-extrabold text-white shadow-[0_8px_30px_rgba(198,93,58,0.35)] transition duration-300 hover:scale-[1.01] hover:shadow-2xl"
              >
                Donate ${finalAmount || 0}{" "}
                {frequency !== "once"
                  ? `/ ${frequency}`
                  : ""}
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-[#5a6a5a]">
                Secure payment. All donations support
                TICOWE&apos;s programs in Kenya.
              </p>
            </div>

            {/* Impact */}
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
                Your Impact
              </div>

              <h3 className="mb-8 text-3xl font-black leading-tight text-[#1A2A22]">
                Every Dollar Changes a Life
              </h3>

              <div className="space-y-4">
                {impacts.map((impact) => {
                  const active = finalAmount >= impact.amt;

                  return (
                    <div
                      key={impact.amt}
                      className={`flex items-center gap-5 rounded-2xl border bg-white p-5 transition-all duration-300 ${
                        active
                          ? "border-[#0F4C4C] shadow-md"
                          : "border-[#e8e0d0]"
                      }`}
                    >
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-black transition-all duration-300 ${
                          active
                            ? "bg-[#0F4C4C] text-[#D7992E]"
                            : "bg-[#F5F1E6] text-[#9a9a8a]"
                        }`}
                      >
                        ${impact.amt}
                      </div>

                      <p
                        className={`text-sm leading-7 transition-colors duration-300 ${
                          active
                            ? "text-[#1A2A22]"
                            : "text-[#7a8a7a]"
                        }`}
                      >
                        {impact.impact}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Support Card */}
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] p-8 text-white shadow-xl">
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#D7992E]">
                  Needed Support
                </div>

                <p className="text-sm leading-7 text-[#E6EFEA]">
                  TICOWE seeks financial support for project
                  implementation, linkages with development
                  partners, and connection to international
                  volunteer organizations.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}