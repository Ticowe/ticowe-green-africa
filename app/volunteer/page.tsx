"use client";

import { useState } from "react";

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    skills: "",
    motivation: "",
    duration: "",
  });

  const roles = [
    {
      icon: "🌾",
      title: "Agricultural Field Officer",
      desc: "Support farmer training, extension services, and climate-smart agriculture.",
    },
    {
      icon: "👩‍💻",
      title: "ICT Trainer",
      desc: "Teach digital literacy and computer skills to youth and women.",
    },
    {
      icon: "📚",
      title: "Education Volunteer",
      desc: "Support literacy programs and vulnerable children in schools.",
    },
    {
      icon: "🏥",
      title: "Health Outreach Worker",
      desc: "Assist with HIV/AIDS, Malaria, and TB awareness campaigns.",
    },
    {
      icon: "🕊️",
      title: "Peace Building Facilitator",
      desc: "Facilitate peace workshops and conflict resolution programs.",
    },
    {
      icon: "📊",
      title: "Communications & Fundraising",
      desc: "Support grant writing, donor relations, and social media outreach.",
    },
  ];

  return (
    <div className="bg-[#F5F1E6] font-serif">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#D7992E] text-xs uppercase tracking-widest font-bold border border-[#D7992E]/30 px-4 py-1 rounded-full bg-[#D7992E]/10">
            Join the Team
          </span>

          <h1 className="text-white text-4xl md:text-5xl font-bold mt-6">
            Volunteer With TICOWE
          </h1>

          <p className="text-[#E6EFEA] text-lg mt-4 leading-relaxed">
            Local and international volunteers are the backbone of our mission.
            Bring your passion and skills to create lasting impact.
          </p>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#C65D3A] uppercase tracking-widest text-sm font-bold mb-3">
              Why Volunteer
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#1A2A22] mb-6">
              Make a Meaningful Difference
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Volunteers from Kenya and around the world contribute their time,
              knowledge, and energy to support sustainable community programs.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Whether you volunteer for a few weeks or several months, your
              contribution creates long-term impact.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: "🌍",
                title: "Global Volunteers",
                desc: "Participants from across the world",
              },
              {
                icon: "🤝",
                title: "Community Integration",
                desc: "Work directly with local families",
              },
              {
                icon: "🏆",
                title: "Certification",
                desc: "Official volunteer recognition",
              },
              {
                icon: "📍",
                title: "Structured Placements",
                desc: "Roles matched to your skills",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#F5F1E6] rounded-2xl p-5 text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>

                <h3 className="font-bold text-sm mb-2">{item.title}</h3>

                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C65D3A] uppercase tracking-widest text-sm font-bold mb-3">
              Open Roles
            </p>

            <h2 className="text-3xl md:text-4xl font-bold">
              Volunteer Opportunities
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="bg-white rounded-2xl p-6 border hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{role.icon}</div>

                <h3 className="text-xl font-bold mb-3">{role.title}</h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {role.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C65D3A] uppercase tracking-widest text-sm font-bold mb-3">
              Get Involved
            </p>

            <h2 className="text-3xl md:text-4xl font-bold">
              Apply to Volunteer
            </h2>
          </div>

          {submitted ? (
            <div className="bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] rounded-3xl p-12 text-center text-white">
              <div className="text-6xl mb-6">✅</div>

              <h3 className="text-3xl font-bold mb-4">
                Application Submitted!
              </h3>

              <p className="text-[#E6EFEA] leading-relaxed">
                Thank you for applying to volunteer with TICOWE. Our team will
                review your application and contact you soon.
              </p>
            </div>
          ) : (
            <div className="bg-[#F5F1E6] rounded-3xl p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  {
                    key: "name",
                    label: "Full Name",
                    type: "text",
                    placeholder: "Your full name",
                  },
                  {
                    key: "email",
                    label: "Email Address",
                    type: "email",
                    placeholder: "your@email.com",
                  },
                  {
                    key: "phone",
                    label: "Phone Number",
                    type: "tel",
                    placeholder: "+254 7XX XXX XXX",
                  },
                  {
                    key: "country",
                    label: "Country",
                    type: "text",
                    placeholder: "Kenya",
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold mb-2">
                      {field.label}
                    </label>

                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          [field.key]: e.target.value,
                        })
                      }
                      className="w-full border rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#0F4C4C]"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold mb-2">
                  Preferred Duration
                </label>

                <select
                  value={form.duration}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duration: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#0F4C4C]"
                >
                  <option value="">Select duration</option>
                  <option>2 weeks</option>
                  <option>1 month</option>
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>1 year</option>
                </select>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold mb-2">
                  Skills & Experience
                </label>

                <textarea
                  rows={4}
                  placeholder="Describe your skills and experience..."
                  value={form.skills}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      skills: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#0F4C4C]"
                />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold mb-2">
                  Motivation
                </label>

                <textarea
                  rows={5}
                  placeholder="Why do you want to volunteer with TICOWE?"
                  value={form.motivation}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      motivation: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#0F4C4C]"
                />
              </div>

              <button
                onClick={() => setSubmitted(true)}
                className="w-full mt-8 bg-gradient-to-r from-[#C65D3A] to-[#D7992E] text-white py-4 rounded-2xl font-bold hover:opacity-90 transition"
              >
                Submit Application
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}