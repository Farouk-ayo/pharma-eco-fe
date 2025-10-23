"use client";

import Link from "next/link";
import { socialLinksData } from "../footer";

const SocialLinks: React.FC = () => {
  return (
    <div className="absolute right-4 lg:right-28 bottom-1/3 transform z-50 hidden lg:flex flex-col items-center gap-4">
      <div className="flex flex-col gap-4">
        {socialLinksData.map((social, index) => (
          <Link
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full  bg-primary p-2 hover:scale-105  transition-all duration-300"
          >
            {social.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
