"use client";
import { useRouter } from "next/navigation";
import Button from "../buttons";
import SocialLinks from "../navbar/socialLinks";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const route = useRouter();

  return (
    <div className="relative px-4 lg:px-28 py-40 min-h-screen flex items-center overflow-hidden bg-primary/15 ">
      <SocialLinks />

      <div className="relative w-full   lg:w-[70%] text-left  flex flex-col gap-5">
        <div className="flex gap-2 items-center text-base md:text-2xl">
          <Image
            src="/pharmaecobot.png"
            alt="bot"
            height={40}
            width={40}
            objectFit="cover"
          />
          <Link
            className=" underline text-primary text-base md:text-2xl"
            href={"/#"}
          >
            Say Hi To PharmaEcoBot Now
          </Link>
          👋
        </div>
        <h1 className="text-3xl md:text-5xl  font-bold ">
          Building a Smarter, Safer, and{" "}
          <span className="text-primary">Greener</span> Future Through
          <span className="text-secondary">AI-Powered</span> Pharmaceutical
          Waste Management
        </h1>
        <p className="text-sm md:text-lg text-medium ">
          PharmaEco is an AI-driven social enterprise addressing the urgent
          challenge of pharmaceutical waste and packaging management in Nigeria.
          We combine innovation, community engagement, and environmental
          responsibility to ensure the safe collection, recycling, and
          eco-friendly disposal of pharmaceutical waste.
        </p>
        <div className="flex space-x-2 md:space-x-4">
          <Button variant="primary" size="lg">
            <a href="/register">Register With Us Now</a>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => route.push("/collection-points")}
          >
            View Collection Location Near You
          </Button>
        </div>
      </div>
    </div>
  );
}
