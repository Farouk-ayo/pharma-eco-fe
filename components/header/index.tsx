"use client";
import { useRouter } from "next/navigation";
import Button from "../buttons";
import {
  BottomLeftIcon,
  BottomRightIcon,
  TopLeftIcon,
  TopRightIcon,
} from "../icons";

export default function Header() {
  const route = useRouter();

  return (
    <div className="relative  top-24 px-4 lg:px-28 py-40 min-h-[600px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url(./hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 md:bg-gradient-to-r from-[#157D18]/90 via-[#157D18]/50 to-transparent bg-[#157D18]/60 md:bg-transparent " />

      <div className="relative w-full md:w-[90%] text-left p-5 md:p-10 flex flex-col gap-5">
        <div className="absolute top-0 left-0 ">
          <TopLeftIcon />
        </div>
        <div className="absolute top-0 right-0 ">
          <TopRightIcon />{" "}
        </div>
        <div className="absolute bottom-0 left-0 ">
          <BottomLeftIcon />{" "}
        </div>
        <div className="absolute bottom-0 right-0 ">
          <BottomRightIcon />{" "}
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white">
          Safely Dispose Your Pharmaceutical Waste With Our Eco-Friendly
          Services
        </h1>
        <p className="text-sm md:text-lg text-medium text-white">
          PharmaBin is an initiative dedicated to solving the pressing issue of
          pharmaceutical waste management in Nigeria. By integrating technology,
          community engagement, and environmental sustainability, PharmaBin
          provides a safe, efficient, and eco-friendly solution for the disposal
          of expired, unused, or contaminated medications.
        </p>
        <div className="flex space-x-2 md:space-x-4">
          <Button variant="secondary">
            <a href="/register">Register With Us Now</a>
          </Button>
          <Button
            variant="tertiary"
            className="text-white"
            onClick={() => route.push("/collection-points")}
          >
            View Collection Location Near You
          </Button>
        </div>
      </div>
    </div>
  );
}
