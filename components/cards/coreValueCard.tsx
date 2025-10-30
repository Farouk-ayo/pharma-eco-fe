import { VerticalLine } from "../icons";

interface CoreValueCardProps {
  number: number;
  title: string;
  description: string;
  backgroundColor: string;
  position: "top" | "bottom";
}

export const CoreValueCard: React.FC<CoreValueCardProps> = ({
  title,
  description,
  backgroundColor,
  position,
}) => (
  <div className="relative flex flex-col items-center w-full">
    {position === "top" && (
      <>
        {/* Card first */}
        <div className="bg-white rounded-b-[80px] rounded-t-[24px] border overflow-hidden hover:shadow-lg transition w-full mb-4">
          {/* Colored header */}
          <div
            className="px-6 py-4 text-white font-bold text-lg text-center rounded-t-[24px]"
            style={{ backgroundColor }}
          >
            {title}
          </div>

          {/* Content */}
          <div className="p-6 text-center text-gray-700">
            <p className="leading-relaxed text-sm">{description}</p>
          </div>
        </div>

        {/* Vertical line connector */}
        <div className="flex justify-center">
          <VerticalLine />
        </div>
      </>
    )}

    {position === "bottom" && (
      <>
        {/* Vertical line connector */}
        <div className="flex justify-center mb-4">
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
            <p className="leading-relaxed text-sm">{description}</p>
          </div>
        </div>
      </>
    )}
  </div>
);
