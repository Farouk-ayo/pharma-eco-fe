"use client";
import React from "react";

import { Users, Calendar, FileText, Trash2 } from "lucide-react";
import { useEMRUser } from "@/contexts/emrUserContext";
import StatCard, { StatCardSkeleton } from "./components/cards/statsCard";
import ModuleCard, { ModuleCardSkeleton } from "./components/cards/modulesCard";

const DashboardPage = () => {
  //   const { user, loading } = useEMRUser();
  const { loading } = useEMRUser();

  const stats = [
    {
      title: "Total Patients",
      value: 60,
      icon: <Users className="w-6 h-6 text-orange-600" />,
      trend: "+12% more than last week",
      trendUp: true,
      iconBgColor: "bg-orange-100",
    },
    {
      title: "Today's Appointments",
      value: 4,
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      trend: "0.2% lower than yesterday",
      trendUp: false,
      iconBgColor: "bg-blue-100",
    },
    {
      title: "Active Encounters",
      value: 1,
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      trend: "1% more than last week",
      trendUp: true,
      iconBgColor: "bg-purple-100",
    },
    {
      title: "Waste Returned (In Sachets)",
      value: 15,
      icon: <Trash2 className="w-6 h-6 text-green-600" />,
      trend: "4% more than last week",
      trendUp: true,
      iconBgColor: "bg-green-100",
    },
  ];

  const modules = [
    {
      title: "Patient Registration",
      description: "Register new patients and manage personal details",
      icon: "👥",
      bgColor: "bg-purple-100",
      textColor: "text-purple-900",
      href: "/pharmaeco-guard/dashboard/patients",
    },
    {
      title: "Patient Portal",
      description: "View and update patient medical records",
      icon: "🏥",
      bgColor: "bg-orange-100",
      textColor: "text-orange-900",
      href: "/pharmaeco-guard/dashboard/portal",
    },
    {
      title: "Drug Interaction AI System",
      description: "Check drug interactions and predict adverse drug reactions",
      icon: "💊",
      bgColor: "bg-pink-100",
      textColor: "text-pink-900",
      href: "/pharmaeco-guard/dashboard/drug-interaction",
    },
    {
      title: "Pharmaceutical Waste System",
      description:
        "Report and track waste returned from patients back into the system",
      icon: "♻️",
      bgColor: "bg-green-100",
      textColor: "text-green-900",
      href: "/pharmaeco-guard/dashboard/waste",
    },
    {
      title: "Encounters",
      description: "Track and manage patient visits in the facility",
      icon: "📋",
      bgColor: "bg-gray-100",
      textColor: "text-gray-900",
      href: "/pharmaeco-guard/dashboard/encounters",
    },
    {
      title: "Appointments",
      description: "Schedule and manage patient appointments",
      icon: "📅",
      bgColor: "bg-blue-100",
      textColor: "text-blue-900",
      href: "/pharmaeco-guard/dashboard/appointments",
    },
    {
      title: "Pharmacist Notes",
      description: "Clinical notes and treatment plans for the patients",
      icon: "📝",
      bgColor: "bg-cyan-100",
      textColor: "text-cyan-900",
      href: "/pharmaeco-guard/dashboard/notes",
    },
    {
      title: "Referrals",
      description:
        "Manage patient referrals to specialists and other facilities",
      icon: "🔄",
      bgColor: "bg-red-100",
      textColor: "text-red-900",
      href: "/pharmaeco-guard/dashboard/referrals",
    },
    {
      title: "Messaging",
      description: "HIPAA-compliant patient communication",
      icon: "💬",
      bgColor: "bg-teal-100",
      textColor: "text-teal-900",
      href: "/pharmaeco-guard/dashboard/messaging",
    },
    {
      title: "E-prescription (E-Rx)",
      description: "Electronic prescription management system",
      icon: "💉",
      bgColor: "bg-pink-100",
      textColor: "text-pink-900",
      href: "/pharmaeco-guard/dashboard/prescriptions",
    },
    {
      title: "Telepharmacy",
      description: "Secure video consultations with patients",
      icon: "📞",
      bgColor: "bg-lime-100",
      textColor: "text-lime-900",
      href: "/pharmaeco-guard/dashboard/telepharmacy",
    },
  ];

  return (
    <div className="p-4 lg:p-8 bg-primaryLight">
      {/* Welcome Banner */}
      <div className="  p-6 lg:p-8 mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3 text-center">
          Welcome To PharmaEcoGuard EMR
        </h2>
        <p className="text-sm lg:text-base text-textPrimary text-center max-w-3xl mx-auto">
          Your unified Electronic Medical Record System that helps to improve
          patient safety, documents care, and protects the environment.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))
          : stats.map((stat, index) => <StatCard key={index} {...stat} />)}
      </div>

      {/* System Modules */}
      <div className="mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-primaryDark">
          System Modules
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {loading
          ? Array.from({ length: 11 }).map((_, i) => (
              <ModuleCardSkeleton key={i} />
            ))
          : modules.map((module, index) => (
              <ModuleCard key={index} {...module} />
            ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        Copyright © 2025 PharmaEcoGuard EMR. All Rights Reserved
      </div>
    </div>
  );
};

export default DashboardPage;
