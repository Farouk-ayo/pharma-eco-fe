"use client";
import React, { useEffect, useState } from "react";
import { MenuIcon, Search, Bell, ChevronDown } from "lucide-react";
import { useEMRUser } from "@/contexts/emrUserContext";
import Image from "next/image";
import Link from "next/link";

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const { user, loading } = useEMRUser();

  useEffect(() => {
    // Set current date
    const formatDate = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    };
    setCurrentDate(formatDate());

    // Check mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getUserInitials = () => {
    if (!user?.firstName || !user?.lastName) return "U";
    return `${user.firstName.charAt(0)}${user.lastName.charAt(
      0
    )}`.toUpperCase();
  };

  const getFullName = () => {
    if (!user?.firstName || !user?.lastName) return "User";
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <div
      className={`fixed top-0 h-20 z-50  ${
        isMobile ? "left-0 right-0 bg-white" : "left-72 right-0 bg-white"
      } flex items-center justify-between px-4 lg:px-8 py-4 border-b shadow-sm`}
    >
      <div className="flex items-center justify-between w-full gap-6">
        {/* Left Side - Welcome Message */}
        <div className="flex-shrink-0">
          {/* Mobile Logo */}
          <Link href={"/pharmaeco-guard/dashboard"} className="lg:hidden">
            <div className="relative flex items-center w-36 h-8 md:w-52 md:h-15 scale-[2]">
              <Image
                src="/pharma-eco-guard-d.svg"
                alt="pharmaeco"
                className="w-full h-full"
                layout="fill"
              />
            </div>
          </Link>

          {/* Welcome Message - Desktop */}
          <div className="hidden lg:block">
            <h2 className="text-xl font-bold text-primaryDark mb-1">
              {loading ? (
                <span className="animate-pulse">...</span>
              ) : (
                <>Welcome, Pharm. {user?.firstName || "User"} 👋</>
              )}
            </h2>
            <p className="text-sm text-gray-600">{currentDate}.</p>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients, appointments, notes..."
              className="w-full pl-12 pr-4 py-4 h-14 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-100 text-base placeholder:text-gray-400 transition-all rounded-b-[30px] rounded-t-[8px]"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Right Side - Notifications & Profile */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Notifications Icon */}
          <button
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* User Profile - Desktop */}
          <div className="hidden lg:flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-primary flex items-center justify-center flex-shrink-0">
              {loading ? (
                <div className="animate-pulse bg-gray-300 w-full h-full"></div>
              ) : (
                <span className="text-white font-bold text-lg">
                  {getUserInitials()}
                </span>
              )}
            </div>
            <div className="text-left">
              <p className="text-base font-semibold text-primaryDark">
                {loading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  getFullName()
                )}
              </p>
              <p className="text-sm text-gray-600">Superintendent Pharmacist</p>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg lg:hidden hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <MenuIcon className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
