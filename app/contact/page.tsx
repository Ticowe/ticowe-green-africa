// app/contact/page.tsx

"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const contactInfo = [
    {
      icon: "📍",
      label: "Address",
      value:
        "P.O Box 184 – 40300\nNdhiwa, Homa Bay County\nKenya",
    },
    {
      icon: "📞",
      label: "Phone",
      value:
        "+254 714 076 175\n+254 727 104 592\n+254 796 519 721",
    },
    {
      icon: "✉️",
      label: "Email",
      value: "ticowecbo2019@gmail.com",
    },
    {
      icon: "🕐",
      label: "Hours",
      value: "Monday – Friday\n8:00 AM – 5:00 PM EAT",
    },
  ];

  return (
    <div className="bg-[#F5F1E6] font-serif">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex rounded-full border border-[#D7992E]/30 bg-[#D7992E]/15 px-5 py-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7992E]">
              Reach Out
            </span>
          </div>

          <h1 className="mb-6 font-serif text-4xl font-black leading-tight text-white md:text-6xl">
            Contact Us
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-[#E6EFEA]">
            Whether you're a donor, partner, volunteer, or community
            member — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          {/* Left Side */}
          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
              Find Us
            </div>

            <h2 className="mb-10 text-4xl font-black leading-tight text-[#1A2A22]">
              Get in Touch With Our Team
            </h2>

            <div className="space-y-8">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F4C4C] text-2xl text-white shadow-lg">
                    {item.icon}
                  </div>

                  <div>
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#C65D3A]">
                      {item.label}
                    </div>

                    <p className="whitespace-pre-line text-[15px] leading-7 text-[#3a4a3a]">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Community Card */}
            <div className="mt-10 rounded-3xl bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] p-8 shadow-2xl">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#D7992E]">
                Our Community
              </div>

              <p className="text-sm leading-7 text-[#E6EFEA]">
                Based in Ndhiwa Sub-County, Homa Bay County —
                serving communities across Kenya&apos;s Nyanza and
                Western regions.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-[32px] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:p-10">
            {sent ? (
              <div className="py-12 text-center">
                <div className="mb-5 text-6xl">💌</div>

                <h3 className="mb-4 text-3xl font-black text-[#1A2A22]">
                  Message Sent!
                </h3>

                <p className="mx-auto max-w-md text-[15px] leading-8 text-[#5a6a5a]">
                  We&apos;ve received your message and will respond
                  within 2–3 business days. Thank you for reaching
                  out to TICOWE.
                </p>
              </div>
            ) : (
              <>
                <h3 className="mb-8 text-3xl font-black text-[#1A2A22]">
                  Send Us a Message
                </h3>

                <div className="mb-5 grid gap-5 md:grid-cols-2">
                  {[
                    {
                      key: "name",
                      label: "Full Name",
                      placeholder: "Your name",
                    },
                    {
                      key: "email",
                      label: "Email",
                      placeholder: "your@email.com",
                    },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="mb-2 block text-sm font-bold text-[#1A2A22]">
                        {field.label}
                      </label>

                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={
                          form[field.key as keyof typeof form]
                        }
                        onChange={(e) =>
                          setForm({
                            ...form,
                            [field.key]: e.target.value,
                          })
                        }
                        className="w-full rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/20"
                      />
                    </div>
                  ))}
                </div>

                <div className="mb-5">
                  <label className="mb-2 block text-sm font-bold text-[#1A2A22]">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="What is this about?"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        subject: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/20"
                  />
                </div>

                <div className="mb-8">
                  <label className="mb-2 block text-sm font-bold text-[#1A2A22]">
                    Message
                  </label>

                  <textarea
                    rows={6}
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                    className="w-full resize-none rounded-2xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm leading-7 text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/20"
                  />
                </div>

                <button
                  onClick={() => setSent(true)}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#0F4C4C] to-[#1E4E3F] px-6 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:scale-[1.01] hover:shadow-2xl"
                >
                  Send Message
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}