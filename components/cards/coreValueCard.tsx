import { VerticalLine } from "../icons";

interface CoreValueCardProps {
  number: number;
  title: string;
  description: string;
  backgroundColor: string;
  position: "top" | "bottom";
}

export const CoreValueCard: React.FC<CoreValueCardProps> = ({
  number,
  title,
  description,
  backgroundColor,
  position,
}) => (
  <div className="relative flex flex-col items-center w-full">
    {position === "top" && (
      <>
        {/* Card first */}
        <div className="bg-white rounded-b-[80px] rounded-t-[24px] border overflow-hidden hover:shadow-lg transition w-full mb-2">
          {/* Colored header */}
          <div
            className="px-6 py-4 text-white font-bold text-lg text-center rounded-t-[24px]"
            style={{ backgroundColor }}
          >
            {title}
          </div>

          {/* Content */}
          <div className="p-6 text-center text-gray-700">
            <p className="leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Vertical line */}
        <div className="rotate-180 mb-2">
          <VerticalLine />
        </div>

        {/* Numbered circle */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-20"
          style={{ backgroundColor }}
        >
          {number}
        </div>
      </>
    )}

    {position === "bottom" && (
      <>
        {/* Numbered circle */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-20 mb-2"
          style={{ backgroundColor }}
        >
          {number}
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
          <div className="p-6 text-center text-gray-700">
            <p className="leading-relaxed">{description}</p>
          </div>
        </div>
      </>
    )}
  </div>
);
