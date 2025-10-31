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
        <div
          className="bg-white rounded-b-[120px] rounded-t-[30px] overflow-hidden  transition w-64 h-60 "
          style={{
            border: `1px solid ${backgroundColor}25`,
          }}
        >
          {/* Colored header */}
          <div
            className="px-6 py-4 text-white font-bold text-lg text-center rounded-t-[30px]"
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
        <div className="flex justify-center rotate-180">
          <VerticalLine color={backgroundColor} fill={backgroundColor} />
        </div>
      </>
    )}

    {position === "bottom" && (
      <>
        {/* Vertical line connector */}
        <div className="flex justify-center  ">
          <VerticalLine color={backgroundColor} fill={backgroundColor} />
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-b-[120px] rounded-t-[30px] border overflow-hidden hover:shadow-lg transition w-64 h-60"
          style={{
            border: `1px solid ${backgroundColor}25`,
          }}
        >
          {/* Colored header */}
          <div
            className="px-6 py-4 text-white font-bold text-lg text-center rounded-t-[30px]"
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
