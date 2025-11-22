"use client";
import Header from "@/components/header/header";
import React from "react";

const InnovationPage = () => {
  return (
    <section>
      <Header
        title="Innovations"
        bg="/bg-innovations.webp"
        description={
          <p className="text-lg text-medium text-white">
            We believe technology and science can transform how pharmaceutical
            waste is managed.
          </p>
        }
      />
      <section className="px-4 py-12 lg:px-16 md:py-32 relative z-10">
        =
      </section>
    </section>
  );
};

export default InnovationPage;
