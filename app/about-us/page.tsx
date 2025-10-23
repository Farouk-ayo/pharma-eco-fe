import Badge from "@/components/badge";
import DisposalDiagram from "@/components/disposalDiagram/disposalDiagram";
import FaqSection from "@/components/faq";
import Header from "@/components/header/header";
import MVCSection from "@/components/mvc";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <section
      className=""
      style={{
        backgroundImage: "url(./bg-about-us.svg)",
      }}
    >
      <Header
        title="About Us"
        description={
          <p className="text-lg text-medium text-white">
            Welcome to PharmaBin, an initiative dedicated to solving the
            pressing issue of pharmaceutical waste management in Nigeria. By
            integrating technology, community engagement, and environmental
            sustainability, PharmaBin provides a safe, efficient, and
            eco-friendly solution for the disposal of expired, unused, or
            contaminated medications.
          </p>
        }
      />{" "}
      <section className="px-4 lg:px-28  py-12 md:py-20 top-32 md:top-32 relative z-10">
        <div className=" mx-auto space-y-12">
          <div className=" text-center space-y-6">
            <Badge text="About Us" bgColor="bg-tertiary" />
            <h2 className="max-w-4xl text-center mx-auto text-2xl md:text-4xl font-bold text-tertiary3">
              PharmaBin Is The Industry Leader In Pharmaceutical Waste
              Management
            </h2>
          </div>

          <div className="space-y-6 text-textPrimary">
            <p className="text-base md:text-base lg:text-lg text-center">
              PharmaBin is an initiative dedicated to solving the pressing issue
              of pharmaceutical waste management in Nigeria. By integrating
              technology, community engagement, and environmental
              sustainability, PharmaBin provides a safe, efficient, and
              eco-friendly solution for the disposal of expired, unused, or
              contaminated medications.{" "}
            </p>
            <p className="text-base md:text-base lg:text-lg text-center">
              Our platform connects households, community pharmacies, and
              regulatory bodies, ensuring proper collection and disposal of
              pharmaceutical waste while raising awareness about its impact on
              health and the environment. With a vision to lead responsible
              waste management practices in Nigeria, PharmaBin is committed to
              fostering a cleaner, healthier, and more sustainable future.{" "}
            </p>

            <p className="text-base md:text-base lg:text-lg text-center">
              Through technology-driven tracking and reporting, PharmaBin
              ensures that collected waste is properly handled, reducing the
              risks of environmental pollution, water contamination, and
              medication misuse. Beyond collection, PharmaBin serves as an
              educational hub, providing communities with vital information on
              the dangers of improper pharmaceutical waste disposal and
              promoting best practices for medication management.{" "}
            </p>
            <p className="text-base md:text-base lg:text-lg text-center">
              By bridging the gap between individuals, healthcare facilities,
              and regulatory bodies, PharmaBin is pioneering a safe, efficient,
              and eco-friendly approach to pharmaceutical waste disposal.
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/about-us-1.png"
              alt="drugs"
              layout="responsive"
              objectFit="cover"
              className="rounded-lg"
              priority
              width={300}
              height={100}
            />{" "}
          </div>
        </div>
      </section>
      <MVCSection />
      <section
        className="relative "
        style={{
          backgroundImage: "url(./bg-community.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-6 py-14">
          <DisposalDiagram />
          <div className="text-center my-12 w-full md:w-[90%] mx-auto">
            <Badge
              text="Frequently Asked Questions"
              bgColor="bg-tertiary mb-4"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-tertiary3 mb-6">
              See Answers To Some Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-base xl:text-lg text-textPrimary leading-relaxed mb-4">
              PharmaBin is a big pharmaceutical waste disposal in Nigeria.
              Through a unique partnership with NAFDAC, PharmaBin is able to
              increase awareness of your services by including your location on
              their special consumer medication disposal mapping tool.
            </p>
          </div>
          <FaqSection />
        </div>
      </section>
    </section>
  );
};

export default AboutUs;
