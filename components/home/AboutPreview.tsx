import Image from "next/image";
import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
          <Image
            src="/about.jpg"
            alt="About TICOWE"
            width={700}
            height={700}
            className="h-[550px] w-full object-cover"
          />
        </div>

        <div>
          <span className="rounded-full bg-[#D7992E]/10 px-5 py-2 text-sm font-semibold text-[#C65D3A]">
            About TICOWE Green Africa
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight text-[#0F4C4C] md:text-5xl">
            Transforming Lives Through Sustainable Development
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            TICOWE Green Africa is a community-based organization dedicated to
            empowering women, youth, children, farmers, and vulnerable groups
            through sustainable initiatives in agriculture, education,
            healthcare, climate-smart farming, and entrepreneurship.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Through innovation, volunteerism, and partnerships, we continue to
            create lasting impact in communities across Kenya.
          </p>

          <Link
            href="/about"
            className="mt-10 inline-flex rounded-2xl bg-[#0F4C4C] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#145B5B]"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}