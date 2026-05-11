const stats = [
  {
    value: "120K+",
    label: "Farmers Reached",
  },
  {
    value: "25K+",
    label: "Farmers Supported",
  },
  {
    value: "60%",
    label: "Women Beneficiaries",
  },
  {
    value: "600+",
    label: "Youth Trained",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#F5F1E6] py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-[2rem] border border-[#0F4C4C]/10 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <h2 className="text-5xl font-black text-[#0F4C4C]">
              {item.value}
            </h2>

            <p className="mt-4 text-base font-medium text-gray-600">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}