"use client";
import React, { useEffect, useState } from "react";
import { MenuIcon, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className={`fixed top-0 h-24 z-50 w-full ${
        isMobile ? "left-0 right-0 bg-white" : "left-72 right-0 bg-white"
      } flex items-center justify-between px-4 py-3 border-b`}
    >
      <div className="flex items-center justify-between w-full">
        <Link href={"/"} className="lg:hidden">
          <div className="relative flex items-center w-48 md:w-52 h-20">
            <Image
              src="/pharmabin-logo.svg"
              alt="pharmabin"
              className="w-full h-full"
              layout="fill"
            />
          </div>
        </Link>

        <div className="flex items-center justify-end gap-4">
          <div className="relative hidden lg:flex ">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-[300px] border rounded-full focus:outline-none focus:ring-1 focus:ring-primary bg-gray-100"
            />
          </div>

          <button onClick={toggleSidebar} className="p-2 rounded-lg lg:hidden">
            <MenuIcon className="w-6 h-6" stroke="#157D18" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
