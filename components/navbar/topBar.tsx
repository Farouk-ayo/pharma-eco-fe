"use client";

import { PhoneCallIcon } from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsappIcon, XIcon } from "../icons";

const socialLinks = [
  {
    name: "PharmaBin Waste",
    icon: (
      <FacebookIcon className="w-4 h-4 cursor-pointer text-white hover:text-secondary" />
    ),
    url: "https://www.facebook.com/profile.php?id=61572270426064&mibextid=ZbWKwL",
  },
  {
    name: "PharmaBin",
    icon: (
      <InstagramIcon className="w-4 h-4 cursor-pointer text-white hover:text-secondary" />
    ),
    url: "https://www.instagram.com/pharmabin?utm_source=qr&igsh=MTc2MTh5MHBjaDR3bg==",
  },

  {
    name: "@PharmaBin1",
    icon: (
      <XIcon className="w-4 h-4 cursor-pointer text-white hover:text-secondary" />
    ),
    url: "https://x.com/pharmabin1?t=gHx2rchT87XsIhBxdce0LQ&s=08",
  },
];

const TopBar: React.FC = () => {
  return (
    <div className=" hidden md:flex bg-primaryDark text-white py-3 px-5 lg:px-28  sm:flex-col md:flex-row justify-between items-center text-sm h-14">
      <div className="flex items-center space-x-2 ">
        <div className="flex items-center space-x-4">
          <PhoneCallIcon className="w-4 h-4" />
          <WhatsappIcon className="w-4 h-4" />
        </div>
        <div className="flex items-center space-x-1 ">
          <a
            href="tel:+2348079508822"
            className=" hover:text-primary transition"
          >
            +234-807-950-8822
          </a>
          <span className="hidden md:inline">/</span>
          <a
            href="tel:+2349039539042"
            className=" hover:text-primary transition"
          >
            +234-903-953-9042
          </a>
        </div>
      </div>

      <div className="flex items-center space-x-4 mt-2 md:mt-0">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1"
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
