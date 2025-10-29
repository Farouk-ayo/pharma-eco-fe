import { HorizontalLine, VerticalLine } from "@/components/icons";

export const LineConnector = ({ number }: { number: number }) => (
  <div className="relative flex items-center justify-center w-full h-12 mb-4">
    {/* Vertical line from top */}
    <div className="absolute top-4 left-1/2 -translate-x-1/2">
      <div
        className={`absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full  z-20 text-white flex items-center justify-center font-bold text-3xl scale-100`}
        style={{
          backgroundColor: "#009D3D",
          boxShadow: `0 0 0 6px #009D3D50 `,
        }}
      >
        {number}
      </div>
      <VerticalLine />
    </div>
    {/* Horizontal line extending left and right */}
    <HorizontalLine className="relative -top-6 left-0  " />
  </div>
);
