import React, { useState } from "react";
import { ArrowRightIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const InnovationSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const innovations = [
    {
      title: "PharmaEcoBot - Smart AI Assistant",
      description:
        "PharmaEcoBot is accessible via WhatsApp to guide households, pharmacies, hospitals, and regulatory bodies to ensure that pharmaceutical waste is properly handled and that recyclable materials are repurposed to reduce pollution and promote circular economy practices.",
      image: "/pharma-eco-bot-m.webp",
      icon: "/pharmaecobot.svg",
      imageLabel: "PharmaEcoBot",
    },
    {
      title:
        "PharmaEcoGuard EMR -  Smart Pharmacy Care, Pharmacovigilance & Eco-Safety Platform",
      description:
        "PharmaEcoGuard EMR is a unified system that help pharmacies to improve patient safety, documents care, and protects the environment. It improves medication safety, streamline pharmacy workflow, track and guide pharmaceutical waste disposal, reduce environmental contamination, and educate patients on medication safety & proper disposal of unused and expired drugs.",
      image: "/pharma-eco-bot-guard.webp",
      icon: "/pharmaecobotguard.svg",
      imageLabel: "PharmaEcoBotGuard",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % innovations.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + innovations.length) % innovations.length
    );
  };

  return (
    <div className="relative">
      <div className="">
        {/* Top Badge */}
        <div className="flex justify-center mb-1">
          <div className="bg-primary text-white px-6 py-3 rounded-t-3xl shadow-lg inline-flex items-center gap-3">
            <div className="w-8 h-8 relative rounded-full flex items-center justify-center flex-shrink-0">
              <Image
                src={innovations[currentSlide].icon}
                alt="PharmaEcoBot Assistant"
                fill
                className="object-contain"
              />{" "}
            </div>
            <span className="font-medium text-xs sm:text-sm md:text-base leading-tight">
              {innovations[currentSlide].title}
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-primary rounded-[2rem] shadow-2xl overflow-hidden p-2 sm:p-4 ">
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-4">
            <div className="lg:w-1/2 bg-white rounded-[1.5rem] p-6 sm:p-8 flex items-center justify-center min-h-[280px] sm:min-h-[320px] lg:min-h-[500px] relative overflow-hidden">
              <Image
                src={innovations[currentSlide].image}
                alt="PharmaEcoBot Assistant"
                fill
                className=" object-fill md:object-cover  w-full h-full overflow-hidden"
              />
            </div>

            <div className="lg:w-1/2 bg-white rounded-[1.5rem] p-6 sm:p-6 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]">
              <div className="flex-1 flex flex-col justify-between ">
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-primaryDark mb-3 sm:mb-4 leading-tight">
                    {innovations[currentSlide].title}
                  </h3>
                  <p className="text-textPrimary text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                    {innovations[currentSlide].description}
                  </p>
                </div>

                <a
                  href="/pharmaeco-guard/auth/signup"
                  className="inline-flex items-center gap-2 text-secondary font-semibold text-sm sm:text-base hover:gap-3 transition-all duration-300"
                >
                  Check It Out
                  <ArrowRightIcon />
                </a>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-6 pt-4 sm:pt-6 border-gray-200">
                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {innovations.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-8 bg-primaryDark"
                          : "w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-primaryDark rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5 text-primaryDark" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-primaryDark text-white rounded-xl flex items-center justify-center hover:bg-primaryDark/90 transition-colors duration-300"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationSection;
