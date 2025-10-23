"use client";
import Link from "next/link";

interface SocialIconProps {
  link: string;
  icon: React.ReactNode;
  name?: string;
}

export const SocialIcon = ({ link, icon }: SocialIconProps) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full  bg-primary p-2 hover:scale-105  transition-all duration-300"
    >
      {icon}
    </Link>
  );
};
