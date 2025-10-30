import Badge from "../badge";
import { CoreValueCard } from "../cards/coreValueCard";
import { HorizontalLine } from "../icons";

export const CoreValuesSection = () => {
  const coreValues = [
    {
      number: 1,
      title: "Innovation",
      description:
        "We leverage AI and creative thinking to design modern solutions for pharmaceutical waste management.",
      backgroundColor: "#1B4D3E",
      position: "bottom" as const,
    },
    {
      number: 2,
      title: "Sustainability",
      description:
        "We are committed to eco-friendly practices that protect our environment for future generations.",
      backgroundColor: "#F97316",
      position: "top" as const,
    },
    {
      number: 3,
      title: "Public Health Advocacy",
      description:
        "We promote community health by preventing the dangers associated with improper pharmaceutical waste disposal.",
      backgroundColor: "#D946EF",
      position: "bottom" as const,
    },
    {
      number: 4,
      title: "Integrity",
      description:
        "We uphold transparency and ethical standards in all our operations and partnerships.",
      backgroundColor: "#22C55E",
      position: "top" as const,
    },
    {
      number: 5,
      title: "Collaboration",
      description:
        "We believe in the power of partnerships by working together with individuals, institutions, and governments to achieve impact.",
      backgroundColor: "#06B6D4",
      position: "bottom" as const,
    },
    {
      number: 6,
      title: "Education & Awareness",
      description:
        "Through our AI chatbot and campaigns, we empower communities through knowledge and inspiring behavioral change.",
      backgroundColor: "#DB2777",
      position: "top" as const,
    },
  ];

  return (
    <section className="px-4 lg:px-28 py-12 lg:py-20 bg-gray-50">
      <div className="md:w-[50%] mb-12">
        <Badge
          text="OUR CORE VALUES"
          bgColor="bg-green-500 text-white"
          className="mb-2"
        />
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-2">
          Why Choose PharmaEco For Your Pharmaceutical Waste Management
        </h1>
      </div>

      {/* Desktop Layout - Horizontal Timeline */}
      <div className="hidden lg:block">
        {/* Grid Container */}
        <div className="grid grid-cols-6 gap-8 relative">
          {/* Top Row - Cards at top positions */}
          <div className="col-span-6 grid grid-cols-6 gap-8 mb-4">
            {coreValues.map((value) => (
              <div key={`top-${value.number}`} className="relative">
                {value.position === "top" && <CoreValueCard {...value} />}
              </div>
            ))}
          </div>

          {/* Middle Row - Horizontal line with numbered circles */}
          <div className="col-span-6 relative">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2">
              <HorizontalLine className="w-full" />
            </div>

            <div className="grid grid-cols-6 gap-8 relative z-10">
              {coreValues.map((value) => (
                <div
                  key={`circle-${value.number}`}
                  className="flex justify-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                    style={{ backgroundColor: value.backgroundColor }}
                  >
                    {value.number}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - Cards at bottom positions */}
          <div className="col-span-6 grid grid-cols-6 gap-8 mt-4">
            {coreValues.map((value) => (
              <div key={`bottom-${value.number}`} className="relative">
                {value.position === "bottom" && <CoreValueCard {...value} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout - Vertical Stack */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-8">
        {coreValues.map((value) => (
          <div
            key={value.number}
            className="relative flex flex-col items-center"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg mb-4"
              style={{ backgroundColor: value.backgroundColor }}
            >
              {value.number}
            </div>
            <div className="bg-white rounded-b-[80px] rounded-t-[24px] border overflow-hidden hover:shadow-lg transition w-full">
              <div
                className="px-6 py-4 text-white font-bold text-lg text-center rounded-t-[24px]"
                style={{ backgroundColor: value.backgroundColor }}
              >
                {value.title}
              </div>
              <div className="p-6 text-center text-gray-700">
                <p className="leading-relaxed text-sm">{value.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
