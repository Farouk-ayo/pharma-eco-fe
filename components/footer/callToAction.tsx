"use client";
import React, { useEffect, useState } from "react";
import Button from "../buttons";
import Image from "next/image";

const CallToAction = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // This runs only on the client
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024 && window.innerWidth <= 1530);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative mx-4 lg:mx-28 lg:my-20 top-32 flex items-center overflow-hidden bg-primaryDark">
      <div className="relative w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:gap-4">
          {/* Left side */}
          <div className="relative w-full  ">
            <div
              className="relative bg-primary/10 xl:w-[125%] 2xl:w-[120%] py-12 lg:py-20 px-8 lg:px-16 "
              style={{
                clipPath: isLargeScreen
                  ? "polygon(0 0, 100% 0, 80% 80%,80% 100%, 0 100%)"
                  : "polygon(0 0, 100% 0, 85% 80%,85% 100%, 0 100%)",
              }}
            >
              <div className="flex flex-col gap-6 mb-6 w-[80%] relative">
                <h2 className="text-2xl lg:text-4xl  font-semibold leading-tight text-white">
                  Need Help In Managing Your Pharmaceutical Waste?{" "}
                  <span className="text-secondary">Chat With PharmaEcoBot</span>
                  , Our Smart AI Assistant
                </h2>

                <p className="text-sm lg:text-base leading-relaxed text-white">
                  PharmaEcoBot is accessible via WhatsApp to guide households,
                  pharmacies, hospitals, and regulatory bodies to ensure that
                  pharmaceutical waste is properly handled and that recyclable
                  materials are repurposed to reduce pollution and promote
                  circular economy practices.
                </p>

                <div className="mt-4">
                  <Button size="lg" href="#">
                    Say Hi To PharmaEcoBot Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="relative w-full 2xl:w-[70%] xl:w-[80%]  flex items-center justify-center lg:mt-6">
            <div className="relative lg:absolute w-full h-[33rem] ">
              <Image
                src="/pharma-eco-bot.png"
                alt="drugs"
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
