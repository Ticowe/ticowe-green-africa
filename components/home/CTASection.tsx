import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-[#F5F1E6] py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-[#0F4C4C] via-[#145B5B] to-[#1E4E3F] px-8 py-16 text-center text-white shadow-2xl lg:px-20">
          <h2 className="text-4xl font-black leading-tight md:text-5xl">
            Together We Can Build Sustainable Communities
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E6EFEA]">
            Support our mission to empower communities, improve livelihoods,
            and create lasting impact through sustainable development and
            innovation.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link
              href="/donate"
              className="rounded-2xl bg-[#C65D3A] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#D7992E]"
            >
              Donate Today
            </Link>

            <Link
              href="/volunteer"
              className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#0F4C4C]"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}