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
    <div className="lg:col-span-2">
      <Link href={"/"} target="_blank" rel="noopener noreferrer">
        <div className="relative w-56  h-20">
          <Image
            priority
            src="/pharmabin-logo.svg"
            alt="pharmabin"
            layout="fill"
          />
        </div>
      </Link>
      <p className="text-base text-gray-600 my-6">
        PharmaBin is an initiative dedicated to solving the pressing issue of
        pharmaceutical waste management in Nigeria. By integrating technology,
        community engagement, and environmental sustainability, PharmaBin
        provides a safe, efficient, and eco-friendly solution for the disposal
        of expired, unused, or contaminated medications.
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
