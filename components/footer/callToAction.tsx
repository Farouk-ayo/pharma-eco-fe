"use client";
import React, { useEffect, useState } from "react";
import Button from "../buttons";
import Image from "next/image";

const CallToAction = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1280 && window.innerWidth <= 1530);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative mx-4 my-8 lg:mx-28 lg:my-20 flex items-center overflow-hidden bg-primaryDark rounded-3xl">
      <div className="relative w-full overflow-hidden">
        <div className="flex flex-col xl:flex-row xl:gap-4">
          {/* Left side */}
          <div className="relative w-full">
            <div
              className="relative bg-primary/10 xl:xl:w-[125%] xl:2xl:w-[120%] py-8 px-6 sm:py-12 sm:px-8 xl:py-20 xl:px-16"
              style={{
                clipPath:
                  typeof window !== "undefined" && window.innerWidth >= 1280
                    ? isLargeScreen
                      ? "polygon(0 0, 100% 0, 80% 80%, 80% 100%, 0 100%)"
                      : "polygon(0 0, 100% 0, 85% 80%, 85% 100%, 0 100%)"
                    : "none",
              }}
            >
              <div className="flex flex-col gap-4 lg:gap-6 lg:w-[80%] relative">
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight text-white">
                  Need Help In Managing Your Pharmaceutical Waste?{" "}
                  <span className="text-secondary">Chat With PharmaEcoBot</span>
                  , Our Smart AI Assistant
                </h2>

                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  PharmaEcoBot is accessible via WhatsApp to guide households,
                  pharmacies, hospitals, and regulatory bodies to ensure that
                  pharmaceutical waste is properly handled and that recyclable
                  materials are repurposed to reduce pollution and promote
                  circular economy practices.
                </p>

                <div className="mt-2 lg:mt-4">
                  <Button size="lg" href="#">
                    Say Hi To PharmaEcoBot Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="relative w-full flex items-center justify-center py-8 lg:py-0 xl:mt-6">
            <div className="relative xl:absolute w-full h-96 sm:h-80  xl:h-[33rem] px-4 lg:px-0">
              <Image
                src="/pharma-eco-bot.png"
                alt="PharmaEcoBot Assistant"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
