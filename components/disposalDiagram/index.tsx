"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface DisposalPoint {
  number: number;
  title: string;
  description: string;
  baseRotation: number;
}

const DisposalDiagram: React.FC = () => {
  const [currentRotation, setCurrentRotation] = useState(0);
  const [activePoint, setActivePoint] = useState(1);

  const disposalPoints: DisposalPoint[] = [
    {
      number: 1,
      title: "⁠⁠Safe & Eco-Friendly Disposal",
      description:
        "Prevents environmental pollution and protects public health.",
      baseRotation: 210,
    },
    {
      number: 2,
      title: "Community-Based Collection",
      description:
        "Convenient collection points in community pharmacies and hospitals.",
      baseRotation: 270,
    },
    {
      number: 3,
      title: "⁠Supports Public Health",
      description: "Reduces antibiotic resistance and drug-related hazards.",
      baseRotation: 330,
    },
    {
      number: 4,
      title: "Regulatory Compliance",
      description: "Aligns with NAFDAC and global waste management standards.",
      baseRotation: 30,
    },
    {
      number: 5,
      title: "User-Friendly Digital Platform",
      description:
        "Easily locate nearby disposal sites via the PharmaBin app/website.",
      baseRotation: 90,
    },
    {
      number: 6,
      title: "⁠Incentive-Based Participation",
      description:
        "Pharmacies and hospitals receive benefits for proper waste collection.",
      baseRotation: 150,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRotation((prev) => (prev + 60) % 360);
      setActivePoint((prev) => (prev === disposalPoints.length ? 1 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [disposalPoints.length]);

  const getNumberPosition = (baseRotation: number) => {
    const adjustedRotation = (baseRotation - currentRotation + 360) % 360;
    const isPrimaryPosition = Math.abs(adjustedRotation - 210) < 30;
    const translateDistance =
      typeof window !== "undefined" && window.innerWidth < 768 ? 120 : 200;

    return {
      transform: `rotate(${adjustedRotation}deg) translate(${translateDistance}px) rotate(-${adjustedRotation}deg)`,
      scale: isPrimaryPosition ? 1.4 : 1,
      zIndex: isPrimaryPosition ? 30 : 50,
    };
  };

  const activePointData = disposalPoints.find(
    (point) => point.number === activePoint
  );

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-8 max-w-6xl md:mx-auto">
      {/* Left side text content */}
      <div className="flex-1 space-y-6">
        {activePointData && (
          <>
            <div className="flex md:items-center md:justify-center gap-2">
              <h2 className="text-xl font-medium text-primary">
                {activePoint}. {activePointData.title}
              </h2>
            </div>
            <div className="flex items-center ">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="h-[1px] w-full border border-primary border-dashed"></div>
            </div>
            <p className="text-gray-600 leading-relaxed md:ml-4 text-lg">
              {activePointData.description}
            </p>
          </>
        )}
      </div>

      {/* Right side circular diagram */}
      <div className="relative md:w-[35rem] md:h-[35rem] h-80 w-80">
        {/* Outer Background Circle */}
        <div className="absolute z-10 w-full h-full rounded-full">
          <Image priority src={"/ellipse-3.svg"} alt="ellipse" layout="fill" />
        </div>

        {/* Middle Circle with Border */}
        <div className="absolute z-20 flex items-center justify-center w-full h-full">
          <div className="w-[80%] h-[80%] md:w-[26rem] md:h-[26rem]  rounded-full border-white bg-transparent border"></div>
        </div>

        {/* Foreground Circle */}
        <div className="absolute z-30 flex items-center justify-center w-full h-full">
          <Image
            priority
            src={"/ellipse-1.svg"}
            alt="ellipse"
            className=" scale-125 md:-translate-x-6 -translate-x-2  w-60 h-60 md:w-[30rem] md:h-[30rem]"
            layout="fill"
          />
        </div>

        {/* Numbers around the circle */}
        {disposalPoints.map(({ number, baseRotation }) => {
          const { transform, scale, zIndex } = getNumberPosition(baseRotation);

          return (
            <div
              key={number}
              className="absolute 
             w-10 h-10 bg-primaryDark rounded-full flex items-center justify-center text-white border border-white font-semibold shadow-lg transition-all duration-1000"
              style={{
                top: "50%",
                left: "50%",
                transform,
                marginLeft: "-20px", // Offset by half the marker size
                marginTop: "-20px", // Offset by half the marker size
                scale,
                zIndex,
              }}
            >
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisposalDiagram;
