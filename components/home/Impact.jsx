import Image from "next/image";

export default function Impact() {
  return (
    <section className="bg-[#0F4C4C] py-24 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <span className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-[#D7992E]">
            Our Impact
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight md:text-5xl">
            Empowering Thousands Across Communities
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#E6EFEA]">
            TICOWE Green Africa continues to create measurable impact through
            sustainable agriculture, youth empowerment, education, climate-smart
            farming, and social support initiatives.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-md">
              <h3 className="text-4xl font-black text-[#D7992E]">
                160+
              </h3>
              <p className="mt-2 text-sm text-[#E6EFEA]">
                Children Supported Through Education Programs
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-md">
              <h3 className="text-4xl font-black text-[#D7992E]">
                20-30%
              </h3>
              <p className="mt-2 text-sm text-[#E6EFEA]">
                Increase in Farm Productivity Among Beneficiaries
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
          <Image
            src="/impact.jpg"
            alt="Community Impact"
            width={700}
            height={700}
            className="h-[550px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}