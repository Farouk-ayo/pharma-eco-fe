"use client";
import Image from "next/image";
import React, { useState } from "react";
import Badge from "../badge";

const DisposalDiagram = () => {
  const [activeBox, setActiveBox] = useState<number | null>(null);
  const LineWithArrow = ({
    rotation,
    className,
  }: {
    rotation: number;
    className: string;
  }) => (
    <svg
      width="150"
      height="6"
      viewBox="0 0 200 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`relative ${className} z-[10]`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <path
        d="M200 3L195 5.88675V0.113249L200 3ZM10.2692 3.5H17.1154V2.5H10.2692V3.5ZM23.9615 3.5H30.8077V2.5H23.9615V3.5ZM37.6538 3.5H44.5V2.5H37.6538V3.5ZM51.3462 3.5H58.1923V2.5H51.3462V3.5ZM65.0385 3.5H71.8846V2.5H65.0385V3.5ZM78.7308 3.5H85.5769V2.5H78.7308V3.5ZM92.4231 3.5H99.2692V2.5H92.4231V3.5ZM106.115 3.5H112.962V2.5H106.115V3.5ZM119.808 3.5H126.654V2.5H119.808V3.5ZM133.5 3.5H140.346V2.5H133.5V3.5ZM147.192 3.5H154.038V2.5H147.192V3.5ZM160.885 3.5H167.731V2.5H160.885V3.5ZM174.577 3.5H0V2.5H174.577V3.5Z"
        fill="#157D18"
      />
    </svg>
  );

  const items = [
    {
      id: 1,
      title: "Sustainability",
      content: "Committed to long-term environmental and public health safety.",
      position: "col-start-1 row-start-2",
      rotation: 180,
      className: "bottom-[55%] right-[40%] ",
    },
    {
      id: 2,
      title: "Innovation",
      content: "Using technology to simplify pharmaceutical waste disposal.",
      position: "col-start-1 row-start-1",
      rotation: 240,
      className: "-top-[110%] right-[10%] ",
    },

    {
      id: 3,
      title: "Community Engagement",
      content:
        "Partnering with local pharmacies and hospitals to drive impact.",
      position: "col-start-3 row-start-1",
      rotation: 300,
      className: "-top-[110%] left-[60%]",
    },
    {
      id: 4,
      title: "Integrity & Compliance",
      content: "Adhering to regulatory guidelines and ethical practices.",
      position: "col-start-3 row-start-2",
      rotation: 0,
      className: "bottom-[55%] left-[94%] ",
    },
    {
      id: 5,
      title: "Public Health Advocacy",
      content:
        "Educating people on responsible pharmaceutical waste management.",
      position: "col-start-3 row-start-3",
      rotation: 120,
      className: "bottom-[0%] right-[10%]  ",
    },
    {
      id: 6,
      title: "Accountability",
      content:
        "Ensuring transparency in waste collection and disposal processes.",
      position: "col-start-1 row-start-3",
      rotation: 60,
      className: "bottom-[0%] left-[60%]  ",
    },
  ];

  return (
    <div className="w-full text-center mx-auto py-10 ">
      <Badge text="Core Values" bgColor="bg-tertiary mb-4" />
      <h1 className="text-3xl md:text-4xl font-bold text-tertiary3 mb-20 text-center">
        Core Values Of PharmaBin
      </h1>
      <div className="lg:grid lg:grid-cols-3 gap-x-32 gap-y-24 relative flex flex-col items-center justify-center">
        <div className="lg:col-start-2 lg:row-start-2 w-80 h-80 mx-auto relative hidden lg:block">
          <div className="relative w-full h-full z-20">
            {/* Outer Background Circle */}
            <div className="absolute z-10 w-full h-full rounded-full">
              <Image
                priority
                src={"/ellipse-3.svg"}
                alt="ellipse"
                layout="fill"
              />
            </div>

            {/* Middle Circle with Border */}
            <div className=" z-20 absolute flex items-center justify-center w-full h-full">
              <div className="w-60 h-60 bg-transparent rounded-full border-white border"></div>
            </div>

            {/* Foreground Circle */}
            <div className="absolute z-30 flex items-center justify-center w-full h-full">
              <Image
                priority
                src={"/ellipse-4.svg"}
                alt="ellipse"
                className=" scale-125  w-60 h-60 md:w-[30rem] md:h-[30rem] animate-rotateSlow "
                layout="fill"
              />
            </div>
          </div>

          {items.map((item) => (
            <LineWithArrow
              key={item.id}
              rotation={item.rotation}
              className={item.className}
            />
          ))}
          {items.map((item, index) => (
            <button
              key={item.id}
              className={`absolute w-10 h-10 bg-primaryDark rounded-full lg:flex items-center justify-center text-white border border-white font-semibold transition-all duration-1000 shadow-lg z-30 hidden ${item.className}`}
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${
                  ((index + 3) % 6) * 60
                }deg) translate(120px) rotate(-${((index + 3) % 6) * 60}deg)`,
                marginLeft: "-20px",
                marginTop: "-20px",
              }}
              onClick={() => {
                setActiveBox(item.id);
              }}
            >
              {item.id}
            </button>
          ))}
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className={`relative z-20 ${
              item.position
            } items-center  my-auto  w-full  ${
              item.id === 2
                ? "lg:left-[45%]"
                : item.id === 3
                ? "lg:right-[45%]"
                : item.id === 1 || item.id === 4
                ? ""
                : item.id === 6
                ? "lg:left-[45%]"
                : item.id === 5
                ? "lg:right-[45%]"
                : ""
            }`}
          >
            <div
              className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary z-20 text-white flex items-center justify-center font-bold text-xl 
                ${
                  activeBox === item.id
                    ? "scale-105 border-green-500"
                    : "scale-100"
                }
              `}
            >
              {item.id}
            </div>

            <div
              className={`p-6 rounded-lg border border-primary bg-white shadow-lg transition-all duration-300   ${
                activeBox === item.id
                  ? "scale-105 border-green-500"
                  : "scale-100"
              }`}
            >
              <h3 className="text-xl font-bold text-tertiary3 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisposalDiagram;
