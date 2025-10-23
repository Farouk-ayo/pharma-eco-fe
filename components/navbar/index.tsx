"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Button from "../buttons";
import TopBar from "./topBar";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);
  const currentPath = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (currentPath === "/" && targetSection) {
      document
        .getElementById(targetSection)
        ?.scrollIntoView({ behavior: "smooth" });
      setTargetSection(null);
    }
  }, [currentPath, targetSection]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/articles", label: "Articles" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const isActiveLink = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white fixed  top-0 w-full z-[100] ">
      <TopBar />
      <div className="py-2 flex h-24 justify-between items-center px-5 lg:px-28">
        <Link href={"/"}>
          <div className="relative flex items-center w-48 md:w-52 h-10">
            <Image
              src="/pharmabin-logo.svg"
              alt="pharmabin"
              className="w-full h-full"
              layout="fill"
            />
          </div>
        </Link>
        <div className="flex gap-20 items-center">
          <div className="hidden text-textPrimary font-semibold md:flex md:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className={`transition-colors duration-200 ${
                  isActiveLink(link.href)
                    ? "text-primary"
                    : "hover:text-primary text-textPrimary"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <Button
              href={"/register"}
              variant="secondary"
              className="text-black"
            >
              Join us Now
            </Button>
          </div>
        </div>
        <div className="md:hidden z-50">
          <button
            className={`hamburger ${
              isOpen ? "open" : ""
            } relative z-30 w-8 h-4 flex flex-col justify-between items-center`}
            onClick={toggleMenu}
          >
            <span className="line block w-full h-[0.4px] dark:bg-secondary-color-3 bg-black transition-transform duration-300 ease-in-out origin-center"></span>
            <span className="line block w-full h-[0.4px] dark:bg-secondary-color-3 bg-black transition-opacity duration-300 ease-in-out"></span>
            <span className="line block w-full h-[0.4px] dark:bg-secondary-color-3 bg-black transition-transform duration-300 ease-in-out origin-center"></span>
          </button>
        </div>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? "0%" : "100%" }}
          transition={{ duration: 0.5 }}
          className={`fixed inset-0 w-full h-lvh bg-black bg-opacity-50 lg:hidden`}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? "0%" : "100%" }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 right-0 h-full w-3/4 bg-white shadow-lg p-4"
          >
            <nav className="w-full flex flex-col items-center  z-40 mt-36 gap-4 justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  className={`transition-colors font-semibold duration-200 text-lg ${
                    isActiveLink(link.href)
                      ? "text-primary "
                      : "hover:text-primary text-textPrimary"
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                href={"/register"}
                variant="secondary"
                className="text-black px-10"
              >
                Join us Now
              </Button>
            </nav>
          </motion.div>
        </motion.div>
      </div>
    </nav>
  );
}
