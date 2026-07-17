"use client";

import { useState } from "react";

export default function BecomeMemberPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    receipt: "",
  });

  async function handleSubmit() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setSubmitted(true);

      setForm({
        name: "",
        phone: "",
        email: "",
        receipt: "",
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#F5F1E6] font-serif">

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] py-20 px-6 text-center">

        <div className="max-w-3xl mx-auto">

          <span className="text-[#D7992E] text-xs uppercase tracking-widest font-bold border border-[#D7992E]/30 px-4 py-1 rounded-full bg-[#D7992E]/10">
            Membership
          </span>

          <h1 className="text-white text-4xl md:text-5xl font-bold mt-6">
            Become a TICOWE Member
          </h1>

          <p className="text-[#E6EFEA] mt-5 text-lg leading-relaxed">
            Join our growing community of individuals committed to environmental
            conservation, sustainable development, and empowering local
            communities across Kenya.
          </p>

        </div>

      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-white">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">

            <p className="uppercase tracking-widest text-[#C65D3A] font-bold text-sm">
              Why Join?
            </p>

            <h2 className="text-4xl font-bold mt-3">
              Membership Benefits
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                icon: "🌱",
                title: "Support Conservation",
                desc: "Help protect our environment through sustainable initiatives.",
              },
              {
                icon: "🤝",
                title: "Networking",
                desc: "Connect with professionals, volunteers, and community leaders.",
              },
              {
                icon: "🎓",
                title: "Training",
                desc: "Access workshops, seminars and capacity-building programs.",
              },
              {
                icon: "🏆",
                title: "Recognition",
                desc: "Receive official membership recognition and participation certificates.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#F5F1E6] rounded-2xl p-6 text-center"
              >
                <div className="text-5xl mb-4">
                  {item.icon}
                </div>

                <h3 className="font-bold text-lg mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Membership Instructions */}
      <section className="py-20 px-6">

        <div className="max-w-3xl mx-auto">

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

            <div className="bg-gradient-to-r from-[#0F4C4C] to-[#1E4E3F] text-white p-8">

              <h2 className="text-3xl font-bold">
                Membership Registration
              </h2>

              <p className="mt-3 text-[#E6EFEA]">
                Complete the payment before filling in the registration form.
              </p>

            </div>

            <div className="p-8">

              {/* Payment Card */}

              <div className="bg-[#F5F1E6] rounded-2xl p-6 mb-8">

                <h3 className="text-xl font-bold mb-5 text-[#0F4C4C]">
                  Payment Instructions
                </h3>

                <div className="space-y-4">

                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">
                      Membership Fee
                    </span>

                    <span className="font-bold text-[#C65D3A]">
                      Ksh 500
                    </span>
                  </div>

                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">
                      Paybill Number
                    </span>

                    <span className="font-bold">
                      880100
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">
                      Account Number
                    </span>

                    <span className="font-bold">
                      271045
                    </span>
                  </div>

                </div>

                <div className="mt-6 rounded-xl bg-yellow-100 border border-yellow-300 p-4 text-sm text-yellow-900">
                  <strong>Important:</strong> After completing your payment,
                  enter the M-Pesa transaction receipt number in the form below.
                  Your membership application will be verified before approval.
                </div>

              </div>

              {submitted ? (
                <div className="bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] rounded-3xl text-center text-white p-12">

                  <div className="text-6xl mb-5">
                    🎉
                  </div>

                  <h3 className="text-3xl font-bold mb-4">
                    Application Received!
                  </h3>

                  <p className="text-[#E6EFEA]">
                    Thank you for becoming a member of TICOWE Green Africa.
                    We will verify your payment and contact you shortly.
                  </p>

                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-6 bg-red-100 rounded-xl px-4 py-3 text-red-600">
                      {error}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-5">

                    <div>
                      <label className="font-semibold block mb-2">
                        Full Name
                      </label>

                      <input
                        type="text"
                        className="w-full rounded-xl border px-4 py-3 bg-white focus:ring-2 focus:ring-[#0F4C4C] outline-none"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-2">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        className="w-full rounded-xl border px-4 py-3 bg-white focus:ring-2 focus:ring-[#0F4C4C] outline-none"
                        placeholder="+254 7XX XXX XXX"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-2">
                        Email Address
                      </label>

                      <input
                        type="email"
                        className="w-full rounded-xl border px-4 py-3 bg-white focus:ring-2 focus:ring-[#0F4C4C] outline-none"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-2">
                        M-Pesa Receipt Number
                      </label>

                      <input
                        type="text"
                        className="w-full rounded-xl border px-4 py-3 bg-white focus:ring-2 focus:ring-[#0F4C4C] outline-none uppercase"
                        placeholder="QJD8L2M9P"
                        value={form.receipt}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            receipt: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>

                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full mt-8 py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-[#C65D3A] to-[#D7992E] hover:opacity-90 transition disabled:opacity-60"
                  >
                    {loading
                      ? "Submitting..."
                      : "Become a Member"}
                  </button>
                </>
              )}

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}