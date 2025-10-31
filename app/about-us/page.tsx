import Badge from "@/components/badge";
import FaqSection from "@/components/faq";
import Header from "@/components/header/header";
import { MVCSection } from "@/components/mvc";
import { CoreValuesSection } from "@/components/mvc/coreValues";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <section>
      <Header
        title="About Us"
        bg="/bg-about-us.png"
        description={
          <p className="text-lg text-medium text-white">
            At PharmaEco, our vision is to lead Nigeria and Africa toward a
            future where pharmaceutical waste and packaging are managed
            responsibly and sustainably while fostering a cleaner, healthier,
            and circular economy.
          </p>
        }
      />
      <section className="px-4 lg:px-28 py-12 lg:py-20 relative z-10 flex flex-col-reverse lg:flex-row gap-10">
        <div className="relative hidden lg:inline-block  lg:w-[50%]  lg:h-[45rem]">
          <Image
            src="/drugs.png"
            alt="drugs"
            layout="fill"
            objectFit="cover"
            className="rounded-b-[120px] rounded-t-[24px]"
          />
        </div>
        <div className="lg:w-[50%]">
          <Badge text="Our Story" className="mb-2" />

          <h1 className="text-2xl md:text-4xl font-semibold text-tertiary3 mb-6 ">
            How We Are Pioneering The Future Of Pharmaceutical Waste Management{" "}
          </h1>
          <div className="relative  lg:hidden w-full h-[30rem]  mb-8">
            <Image
              src="/drugs.png"
              alt="drugs"
              layout="fill"
              objectFit="cover"
              className="rounded-b-[120px] rounded-t-[24px]"
            />
          </div>
          <div className="w-full gap-5 text-base sm:text-base xl:text-lg h-full flex flex-col ">
            <p className="text-textPrimary leading-relaxed mb-4">
              PharmaEco is a pioneering initiative tackling the growing problem
              of pharmaceutical waste and packaging disposal in Nigeria. We
              leverage AI technology, education, and partnerships to create an
              efficient, safe, and eco-friendly system for the collection,
              recycling, and disposal of unused, expired, or contaminated
              medicines and packaging materials including blister packs,
              cartons, leaflets, plastics, tubes and others.
              <br />
              <br />
              Our platform connects households, pharmacies, hospitals, and
              regulatory bodies to ensure that pharmaceutical waste is properly
              handled and that recyclable materials are repurposed to reduce
              pollution and promote circular economy practices. Through
              PharmaEcoBot, our AI-powered assistant on WhatsApp, users can
              instantly: Locate nearby collection points, learn how to dispose
              of waste safely, get instant recycling updates and health
              education tips and report improper disposal or environmental
              hazards
              <br />
              <br />
              Our vision is to lead Nigeria and Africa toward a future where
              pharmaceutical waste and packaging are managed responsibly and
              sustainably fostering a cleaner, healthier, and circular economy.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(./bg-mvc.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <MVCSection />
        <CoreValuesSection />
      </section>

      <FaqSection />
    </section>
  );
};

export default AboutUs;
