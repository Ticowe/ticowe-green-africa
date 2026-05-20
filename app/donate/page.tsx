"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const PaystackButton = dynamic(
  () =>
    import("react-paystack").then(
      (mod) => mod.PaystackButton
    ),
  {
    ssr: false,
  }
);

export default function DonatePage() {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState("once");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [donated, setDonated] = useState(false);
  const [loading, setLoading] = useState(false);

  const presets = [10, 25, 50, 100, 250, 500];

  const finalAmount = custom ? Number(custom) : amount;

  const publicKey =
    process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  const componentProps = {
    email: form.email,
    amount: finalAmount * 100,
    publicKey,
    currency: "KES",
    text: loading
      ? "Processing..."
      : `Donate Ksh ${finalAmount}`,

    onSuccess: async (reference: any) => {
      try {
        setLoading(true);

        const res = await fetch(
          "/api/paystack/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reference: reference.reference,
              donor_name: form.name,
              donor_email: form.email,
              phone: form.phone,
              amount: finalAmount,
              currency: "KES",
              frequency,
              payment_method: "Paystack",
            }),
          }
        );

        const data = await res.json();

        if (data.success) {
          setDonated(true);
        } else {
          alert("Payment verification failed");
        }
      } catch (err) {
        console.log(err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    },

    onClose: () => {
      console.log("Payment closed");
    },
  };

  return (
    <div className="bg-[#F5F1E6] font-serif min-h-screen">
      {donated ? (
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="rounded-[36px] bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] px-8 py-16 text-center text-white shadow-xl">
            <div className="mb-5 text-6xl">🙏</div>

            <h2 className="mb-5 text-4xl font-black">
              Thank You!
            </h2>

            <p className="text-lg leading-8 text-[#E6EFEA]">
              Your donation of
              <span className="font-bold text-[#D7992E]">
                {" "}
                Ksh {finalAmount}
              </span>{" "}
              has been received successfully.
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="rounded-[32px] bg-white p-8 shadow-xl md:p-10">
            <h2 className="mb-8 text-3xl font-black text-[#1A2A22]">
              Donate to TICOWE
            </h2>

            {/* User Info */}
            <div className="mb-8 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-[#1A2A22]">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#1A2A22]">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="john@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="mb-2 block text-sm font-bold text-[#1A2A22]">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="+254700000000"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3"
              />
            </div>

            {/* Frequency */}
            <div className="mb-8">
              <label className="mb-3 block text-sm font-bold text-[#1A2A22]">
                Donation Frequency
              </label>

              <div className="flex gap-3">
                {["once", "monthly", "annually"].map(
                  (f) => (
                    <button
                      type="button"
                      key={f}
                      onClick={() => setFrequency(f)}
                      className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold capitalize ${
                        frequency === f
                          ? "bg-[#0F4C4C] text-white"
                          : "bg-[#F5F1E6]"
                      }`}
                    >
                      {f}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Presets */}
            <div className="mb-8">
              <label className="mb-3 block text-sm font-bold text-[#1A2A22]">
                Select Amount
              </label>

              <div className="grid grid-cols-3 gap-3">
                {presets.map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => {
                      setAmount(preset);
                      setCustom("");
                    }}
                    className={`rounded-2xl px-4 py-4 text-lg font-bold ${
                      amount === preset && !custom
                        ? "bg-[#0F4C4C] text-white"
                        : "bg-[#F5F1E6]"
                    }`}
                  >
                    Ksh {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="mb-10">
              <label className="mb-3 block text-sm font-bold text-[#1A2A22]">
                Custom Amount
              </label>

              <input
                type="number"
                placeholder="Enter amount"
                value={custom}
                onChange={(e) => {
                  setCustom(e.target.value);
                  setAmount(0);
                }}
                className="w-full rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-4"
              />
            </div>

            <PaystackButton
              {...componentProps}
              className="w-full rounded-2xl bg-gradient-to-r from-[#C65D3A] to-[#D7992E] px-6 py-5 text-lg font-extrabold text-white shadow-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}