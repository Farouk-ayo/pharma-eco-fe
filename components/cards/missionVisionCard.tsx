import React from "react";
import { VerticalLine } from "@/components/icons";

interface MissionVisionCardProps {
  letter: string;
  title: string;
  description: string;
  backgroundColor: string;
  letterColor: string;
  textColor?: string;
}

export const MissionVisionCard: React.FC<MissionVisionCardProps> = ({
  letter,
  title,
  description,
  backgroundColor,
  letterColor,
  textColor = "text-gray-700",
}) => (
  <div className="relative flex flex-col items-center w-full">
    {/* Numbered/Lettered circle */}
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-20 mb-2"
      style={{
        backgroundColor: letterColor,
      }}
    >
      {letter}
    </div>

    {/* Vertical line */}
    <div className="mb-2">
      <VerticalLine />
    </div>

    {/* Card */}
    <div className="bg-white rounded-b-[80px] rounded-t-[24px] border overflow-hidden hover:shadow-lg transition w-full">
      {/* Colored header */}
      <div
        className="px-6 py-4 text-white font-bold text-lg text-center rounded-t-[24px]"
        style={{ backgroundColor }}
      >
        {title}
      </div>

      {/* Content */}
      <div className={`p-6 text-center ${textColor}`}>
        <p className="leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);
