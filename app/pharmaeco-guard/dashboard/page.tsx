"use client";

import React, { useMemo } from "react";
import { Users, Calendar, FileText, Trash2 } from "lucide-react";
import {
  useDorraAppointments,
  useDorraEncounters,
  useDorraPatients,
} from "@/lib/api/dorraQueries";
import AIPromptBox from "@/components/AIPromptBox";
import StatCard, { StatCardSkeleton } from "./components/cards/statsCard";
import {
  Users as UsersIcon,
  Portal,
  DrugInteraction,
  Waste,
  Encounters as EncountersIcon,
  Appointments as AppointmentsIcon,
  Notes,
  Referrals,
  Messaging,
  Prescription,
  Telepharmacy,
} from "@/components/icons/peg-icons";
import {
  SystemModuleCard,
  SystemModuleCardSkeleton,
} from "./components/cards/modulesCard";

const DashboardPage = () => {
  const { data: patientsData, isLoading: patientsLoading } = useDorraPatients();
  const { data: appointmentsData, isLoading: appointmentsLoading } =
    useDorraAppointments();
  const { data: encountersData, isLoading: encountersLoading } =
    useDorraEncounters();

  // Calculate stats from real data
  const stats = useMemo(() => {
    const totalPatients = patientsData?.count || 0;

    const today = new Date().toISOString().split("T")[0];
    const todayAppointments =
      appointmentsData?.results.filter((apt) => apt.date.startsWith(today))
        .length || 0;

    const activeEncounters = encountersData?.count || 0;

    return [
      {
        title: "Total Patients",
        value: totalPatients,
        icon: <Users className="w-6 h-6 text-orange-600" />,
        trend: "+12% more than last week",
        trendUp: true,
        iconBgColor: "bg-orange-100",
      },
      {
        title: "Today's Appointments",
        value: todayAppointments,
        icon: <Calendar className="w-6 h-6 text-blue-600" />,
        trend: appointmentsData?.count
          ? `${appointmentsData.count} total`
          : "No data",
        trendUp: todayAppointments > 0,
        iconBgColor: "bg-blue-100",
      },
      {
        title: "Active Encounters",
        value: activeEncounters,
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
  }, [patientsData, appointmentsData, encountersData]);

  const modules = [
    {
      title: "Patient Registration",
      description: "Register new patients and manage personal details",
      icon: <UsersIcon className="text-purple-900" />,
      bgColor: "bg-purple-100",
      textColor: "text-purple-900",
      borderColor: "border-purple-300",
      href: "/pharmaeco-guard/dashboard/patients",
    },
    {
      title: "Patient Portal",
      description: "View and update patient medical records",
      icon: <Portal className="text-orange-900" />,
      bgColor: "bg-orange-100",
      textColor: "text-orange-900",
      borderColor: "border-orange-300",
      href: "/pharmaeco-guard/dashboard/portal",
    },
    {
      title: "Drug Interaction AI System",
      description: "Check drug interactions and predict adverse drug reactions",
      icon: <DrugInteraction className="text-pink-900" />,
      bgColor: "bg-pink-100",
      textColor: "text-pink-900",
      borderColor: "border-pink-300",
      href: "/pharmaeco-guard/dashboard/drug-interaction",
    },
    {
      title: "Pharmaceutical Waste System",
      description:
        "Report and track waste returned from patients back into the system",
      icon: <Waste className="text-green-900" />,
      bgColor: "bg-green-100",
      textColor: "text-green-900",
      borderColor: "border-green-300",
      href: "/pharmaeco-guard/dashboard/waste",
    },
    {
      title: "Encounters",
      description: "Track and manage patient visits in the facility",
      icon: <EncountersIcon className="text-gray-900" />,
      bgColor: "bg-gray-100",
      textColor: "text-gray-900",
      borderColor: "border-gray-300",
      href: "/pharmaeco-guard/dashboard/encounters",
    },
    {
      title: "Appointments",
      description: "Schedule and manage patient appointments",
      icon: <AppointmentsIcon className="text-blue-900" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-900",
      borderColor: "border-blue-300",
      href: "/pharmaeco-guard/dashboard/appointments",
    },
    {
      title: "Pharmacist Notes",
      description: "Clinical notes and treatment plans for the patients",
      icon: <Notes className="text-indigo-900" />,
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-900",
      borderColor: "border-indigo-300",
      href: "/pharmaeco-guard/dashboard/notes",
    },
    {
      title: "Referrals",
      description:
        "Manage patient referrals to specialists and other facilities",
      icon: <Referrals className="text-red-900" />,
      bgColor: "bg-red-100",
      textColor: "text-red-900",
      borderColor: "border-red-300",
      href: "/pharmaeco-guard/dashboard/referrals",
    },
    {
      title: "Messaging",
      description: "HIPAA-compliant patient communication",
      icon: <Messaging className="text-cyan-900" />,
      bgColor: "bg-cyan-100",
      textColor: "text-cyan-900",
      borderColor: "border-cyan-300",
      href: "/pharmaeco-guard/dashboard/messaging",
    },
    {
      title: "E-prescription (E-Rx)",
      description: "Electronic prescription management system",
      icon: <Prescription className="text-pink-900" />,
      bgColor: "bg-pink-100",
      textColor: "text-pink-900",
      borderColor: "border-pink-300",
      href: "/pharmaeco-guard/dashboard/prescriptions",
    },
    {
      title: "Telepharmacy",
      description: "Secure video consultations with patients",
      icon: <Telepharmacy className="text-lime-900" />,
      bgColor: "bg-lime-100",
      textColor: "text-lime-900",
      borderColor: "border-lime-300",
      href: "/pharmaeco-guard/dashboard/telepharmacy",
    },
  ];

  const isLoading = patientsLoading || appointmentsLoading || encountersLoading;

  return (
    <div className="p-4 lg:p-8 bg-primaryLight">
      {/* Welcome Banner */}
      <div className="p-6 lg:p-8 mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold text-center text-primary mb-3">
          Welcome <br />
          To PharmaEcoGuard EMR
        </h2>
        <p className="text-sm lg:text-base text-textPrimary text-center max-w-3xl mx-auto">
          Your unified Electronic Medical Record System that helps to improve
          patient safety, documents care, and protects the environment.
        </p>
      </div>

      {/* AI Prompt Box */}
      <AIPromptBox />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {isLoading
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
        {isLoading
          ? Array.from({ length: 11 }).map((_, i) => (
              <SystemModuleCardSkeleton key={i} />
            ))
          : modules.map((module, index) => (
              <SystemModuleCard key={index} {...module} />
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
