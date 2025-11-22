"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { XIcon } from "lucide-react";
import Modal from "@/components/modal/modalConfirmation";
import { useEMRUser } from "@/contexts/emrUserContext";
import Image from "next/image";
import { Logout } from "@/components/icons";
import {
  Appointments,
  Dashboard,
  DrugInteraction,
  Encounters,
  Portal,
  Users,
  Waste,
  Notes,
  Referrals,
  Messaging,
  Prescription,
  Telepharmacy,
} from "@/components/icons/peg-icons";

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

  const icons: Record<string, React.ReactNode> = {
    "/pharmaeco-guard/dashboard": <Dashboard />,
    "/pharmaeco-guard/dashboard/patients": <Users />,
    "/pharmaeco-guard/dashboard/portal": <Portal />,
    "/pharmaeco-guard/dashboard/drug-interaction": <DrugInteraction />,
    "/pharmaeco-guard/dashboard/waste": <Waste />,
    "/pharmaeco-guard/dashboard/encounters": <Encounters />,
    "/pharmaeco-guard/dashboard/appointments": <Appointments />,
    "/pharmaeco-guard/dashboard/notes": <Notes />,
    "/pharmaeco-guard/dashboard/referrals": <Referrals />,
    "/pharmaeco-guard/dashboard/messaging": <Messaging />,
    "/pharmaeco-guard/dashboard/prescriptions": <Prescription />,
    "/pharmaeco-guard/dashboard/telepharmacy": <Telepharmacy />,
  };

  const navlinks = [
    { route: "/pharmaeco-guard/dashboard", label: "Dashboard" },
    {
      route: "/pharmaeco-guard/dashboard/patients",
      label: "Patient Registration",
    },
    {
      route: "/pharmaeco-guard/dashboard/portal",
      label: "Patient Portal",
    },
    {
      route: "/pharmaeco-guard/dashboard/drug-interaction",
      label: "Drug Interaction AI System",
    },

    {
      route: "/pharmaeco-guard/dashboard/encounters",
      label: "Encounters",
    },
    {
      route: "/pharmaeco-guard/dashboard/appointments",
      label: "Appointments",
    },
    {
      route: "/pharmaeco-guard/dashboard/waste",
      label: "Pharmaceutical Waste System",
    },
    {
      route: "/pharmaeco-guard/dashboard/notes",
      label: "Pharmacist Notes",
    },
    {
      route: "/pharmaeco-guard/dashboard/referrals",
      label: "Referrals",
    },
    {
      route: "/pharmaeco-guard/dashboard/messaging",
      label: "Messaging",
    },
    {
      route: "/pharmaeco-guard/dashboard/prescriptions",
      label: "E-Prescription",
    },
    {
      route: "/pharmaeco-guard/dashboard/telepharmacy",
      label: "Telepharmacy",
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
              <div className="relative flex items-center w-36 h-8 md:w-52 md:h-15 scale-[2]">
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
          <ul className="flex flex-col gap-4 text-bodyText">
            {navlinks.map((link) => (
              <Link
                key={link.route}
                className={`flex flex-row gap-5 items-center px-2 py-4 lg:p-4 font-semibold rounded-lg hover:bg-primaryLight cursor-pointer hover:text-primary transition-colors ${
                  currentPath === link.route
                    ? "bg-primaryLight text-primary"
                    : ""
                }`}
                href={link.route}
                onClick={isMobile ? onClose : undefined}
              >
                <span className="flex-shrink-0">{icons[link.route]}</span>
                <span className="text-base">{link.label}</span>
              </Link>
            ))}
            <button
              className="flex p-4 flex-row text-red-500 gap-5 items-center rounded-lg hover:bg-red-50 cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => setShowLogoutModal(true)}
            >
              <span className="flex-shrink-0">
                <Logout />
              </span>
              <span>Logout</span>
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
