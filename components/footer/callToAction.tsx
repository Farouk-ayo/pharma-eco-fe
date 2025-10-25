"use client";
import React from "react";
import Button from "../buttons";
import Image from "next/image";

const CallToAction = () => {
  return (
    <section className="relative mx-4 lg:mx-28 lg:my-20 top-32 lg:top-32   flex items-center overflow-hidden bg-primaryDark">
      <div className="relative w-full  overflow-hidden">
        {/* Flex container for responsive layout */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left side - Green section with content */}
          <div
            className="relative bg-gradient-to-br from-[#024030] via-[#025a3d] to-[#036b47] w-full lg:w-[50%] py-12 lg:py-20 px-8 lg:px-16 flex flex-col gap-6 mb-6"
            style={{
              clipPath:
                window?.innerWidth >= 1024
                  ? "polygon(0 0, 100% 0, 70% 80%,70% 100%, 0 100%)"
                  : "none",
            }}
          >
            <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white">
              Need Help In Managing Your Pharmaceutical Waste?{" "}
              <span className="text-secondary">Chat With PharmaEcoBot</span>,
              Our Smart AI Assistant
            </h2>

            <p className="text-sm lg:text-base leading-relaxed text-white">
              PharmaEcoBot is accessible via WhatsApp to guide households,
              pharmacies, hospitals, and regulatory bodies to ensure that
              pharmaceutical waste is properly handled and that recyclable
              materials are repurposed to reduce pollution and promote circular
              economy practices.
            </p>

            <div className="mt-4">
              <Button size="lg" href="#">
                Say Hi To PharmaEcoBot Now
              </Button>
            </div>
          </div>

          {/* Right side - White section with robot */}
          <div className="relative w-full lg:w-[50%] flex items-center justify-center mt-6 ">
            <Image src="/pharma-eco-bot.png" alt="drugs" layout="fill" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
