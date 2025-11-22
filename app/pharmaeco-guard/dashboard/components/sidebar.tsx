"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { XIcon, LogOut } from "lucide-react";
import Modal from "@/components/modal/modalConfirmation";
import { useEMRUser } from "@/contexts/emrUserContext";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const currentPath = usePathname();
  const { logout } = useEMRUser();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navlinks = [
    { route: "/pharmaeco-guard/dashboard", label: "Dashboard", icon: "📊" },
    {
      route: "/pharmaeco-guard/dashboard/patients",
      label: "Patient Registration",
      icon: "👥",
    },
    {
      route: "/pharmaeco-guard/dashboard/portal",
      label: "Patient Portal",
      icon: "🏥",
    },
    {
      route: "/pharmaeco-guard/dashboard/drug-interaction",
      label: "Drug Interaction AI",
      icon: "💊",
    },
    {
      route: "/pharmaeco-guard/dashboard/waste",
      label: "Waste System",
      icon: "♻️",
    },
    {
      route: "/pharmaeco-guard/dashboard/encounters",
      label: "Encounters",
      icon: "📋",
    },
    {
      route: "/pharmaeco-guard/dashboard/appointments",
      label: "Appointments",
      icon: "📅",
    },
  ];

  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  return (
    <>
      <div
        className={`fixed flex flex-col justify-between gap-8 h-full w-58 lg:w-72 bg-white text-gray-500 py-4 px-3 lg:px-6 transition-transform transform overflow-y-auto z-50 border-r ${
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{ maxHeight: "100vh" }}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-row items-center justify-between">
            <Link href={"/pharmaeco-guard/dashboard"}>
              <div className="relative flex items-center  w-36 h-8 md:w-52 md:h-10">
                <Image
                  src="/pharma-eco-guard-d.svg"
                  alt="pharmaeco"
                  className="w-full h-full"
                  layout="fill"
                />
              </div>
            </Link>
            <button
              className="absolute top-6 right-2 lg:hidden"
              onClick={onClose}
            >
              <XIcon className="w-5 h-5 text-black" />
            </button>
          </div>
          <ul className="flex flex-col gap-2 text-textPrimary">
            {navlinks.map((link) => (
              <Link
                key={link.route}
                className={`flex flex-row gap-3 items-center px-3 py-3 font-medium rounded-lg hover:bg-primaryLight cursor-pointer transition-colors ${
                  currentPath === link.route
                    ? "bg-primaryLight text-primary"
                    : ""
                }`}
                href={link.route}
                onClick={isMobile ? onClose : undefined}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}
            <button
              className="flex px-3 py-3 flex-row text-red-500 gap-3 items-center rounded-lg hover:bg-red-50 cursor-pointer transition-colors mt-4"
              onClick={() => setShowLogoutModal(true)}
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </ul>
        </div>
      </div>
      <Modal
        confirmText="Yes"
        cancelText="No"
        isOpen={showLogoutModal}
        title="Are you sure you want to Logout?"
        onConfirm={handleLogout}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export default Sidebar;
