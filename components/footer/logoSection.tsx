"use client";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "./socialIcons";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const LogoSection = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
  return (
    <div className="lg:col-span-3">
      <Link href={"/"} target="_blank" rel="noopener noreferrer">
        <div className="relative w-36 h-8 md:w-52 md:h-10">
          <Image
            priority
            src="/pharma-eco-logo.svg"
            alt="pharmaeco"
            layout="fill"
          />
        </div>
      </Link>
      <p className="text-base text-gray-600 my-2 mb-6">
        PharmaEco is an AI-driven social enterprise addressing the urgent
        challenge of pharmaceutical waste and packaging management in Nigeria.
        We combine innovation, community engagement, and environmental
        responsibility to ensure the safe collection, recycling, and
        eco-friendly disposal of pharmaceutical waste.
      </p>
      <div className="flex items-center space-x-4">
        {socialLinks.map((link) => (
          <SocialIcon link={link.url} key={link.name} {...link} />
        ))}
      </div>
    </div>
  );
};
export default LogoSection;
