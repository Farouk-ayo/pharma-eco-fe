import React from "react";
import Badge from "../badge";

const Mvc = () => {
  return (
    <div className="relative pt-40 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <Badge text="Mission & Vision" bgColor="bg-tertiary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-tertiary3 mb-20 text-center">
          See What Is Driving Us - Our Mission & Vision
        </h1>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div className="bg-[#F7F7F7] shadow-lg rounded-lg p-6 md:p-8 border-l-8 border-primary">
          <h3 className="text-2xl font-semibold text-primary">Our Mission</h3>
          <p className="text-gray-700 mt-3 leading-relaxed">
            To establish a sustainable and innovative system for the safe
            disposal of pharmaceutical waste in Nigeria, promoting public health
            and environmental protection while addressing the unique challenges
            faced by communities.
          </p>
        </div>

        <div className="bg-[#F7F7F7] shadow-lg rounded-lg p-6 md:p-8 border-l-8 border-secondary">
          <h3 className="text-2xl font-semibold text-secondary">Our Vision</h3>
          <p className="text-gray-700 mt-3 leading-relaxed">
            To lead a cultural shift towards an eco-friendly and sustainable
            pharmaceutical waste management in Nigeria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mvc;
