import Header from "@/components/header/header";
import MapComponent from "@/components/map";
import React from "react";
import PharmacyDirectory from "./pharmaDir";
import ScrollingStats from "@/components/carousel/scrollingStat";

const CollectionPoints = () => {
  return (
    <section className="">
      <Header
        title="Collection Point Near You"
        description={
          <p className="text-lg text-medium text-white">
            PharmaBin is a big pharmaceutical waste disposal in Nigeria. Through
            a unique partnership with NAFDAC, PharmaBin is able to increase
            awareness of your services by including your location on their
            special consumer medication disposal mapping tool.
          </p>
        }
      />{" "}
      <section className="px-4 lg:px-28 md:py-20 mt-40 relative z-10 text-textPrimary">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold  mb-4">
            Do You Want To Dispose Your Pharmaceutical Waste? Find A Collection
            Point Near You
          </h1>
          <p className="text-gray-700 mb-4">
            PharmaBin services a wide range of cities across the country
            Nigeria, providing comprehensive and compliant medical waste
            disposal solutions.
          </p>
          <p className="text-gray-600 text-sm">
            In Nigeria, pharmaceutical waste disposal regulations and EPA
            requirements for the management of pharmaceutical waste vary in each
            state. As a healthcare provider, it is important to understand the
            regulations that govern your state to ensure that your waste
            handling and treatment processes are compliant. To assist with
            navigating the medical waste and sharp disposal requirements that
            exist for your state, we&apos;ve built an extensive library of blogs
            that review guidelines in your area and what regulatory bodies to
            research.
          </p>
        </div>
        <MapComponent />
      </section>{" "}
      <section className="my-10 md:my-0 mb-0 md:mb-6">
        <ScrollingStats />
      </section>
      <PharmacyDirectory />
    </section>
  );
};

export default CollectionPoints;
