"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDorraPatients } from "@/lib/api/dorraQueries";
import { PatientDropdown } from "../components/patientDropdown";
import { Trash2, Package, AlertTriangle, CheckCircle } from "lucide-react";

// Dummy waste data
const dummyWasteData = [
  {
    id: 1,
    patient_name: "John Doe",
    unique_id: "PAT-001",
    drug_name: "Omeprazole 20mg",
    waste_type: "Blister Pack",
    quantity: "1 sachet - 6 tabs remains",
    date: "2025-11-20",
    status: "unused",
    reason: "Patient discontinued medication after doctor consultation",
  },
  {
    id: 2,
    patient_name: "Jane Smith",
    unique_id: "PAT-002",
    drug_name: "Amlodipine 10mg",
    waste_type: "Blister Pack",
    quantity: "1 sachet - 2 tabs remains",
    date: "2025-11-20",
    status: "unused",
    reason: "Switched to different medication",
  },
  {
    id: 3,
    patient_name: "Mike Johnson",
    unique_id: "PAT-003",
    drug_name: "Lisinopril 10mg",
    waste_type: "Blister Pack",
    quantity: "1 sachet - 4 tabs remains",
    date: "2025-11-20",
    status: "expired",
    reason: "Medication expired before completion",
  },
];

const WastePage = () => {
  const { control } = useForm();
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<
    "all" | "unused" | "expired"
  >("all");

  const { data: patientsData } = useDorraPatients();
  const selectedPatient = patientsData?.results.find(
    (p) => p.id === selectedPatientId
  );

  // Filter waste by patient and status
  const filteredWaste = dummyWasteData.filter((waste) => {
    if (activeFilter !== "all" && waste.status !== activeFilter) return false;
    return true;
  });

  const allCount = dummyWasteData.length;
  const unusedCount = dummyWasteData.filter(
    (w) => w.status === "unused"
  ).length;
  const expiredCount = dummyWasteData.filter(
    (w) => w.status === "expired"
  ).length;

  const getStatusBadge = (status: string) => {
    if (status === "expired") return "bg-red-100 text-red-700 border-red-300";
    return "bg-yellow-100 text-yellow-700 border-yellow-300";
  };

  const getStatusIcon = (status: string) => {
    if (status === "expired") {
      return <AlertTriangle className="w-5 h-5 lg:w-6 lg:h-6 text-red-600" />;
    }
    return <Package className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />;
  };

  return (
    <div className="p-4 lg:p-8 bg-primaryLight min-h-screen">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
          Pharmaceutical Waste Management
        </h1>
        <p className="text-sm lg:text-base text-gray-600">
          Track and guide patient pharmaceutical waste disposal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Panel - Patient Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 mb-4">
            <PatientDropdown
              control={control}
              patientsData={patientsData}
              selectedPatientId={selectedPatientId}
              selectedPatient={selectedPatient}
              setSelectedPatientId={setSelectedPatientId}
              onAddRecord={() => {}}
            />
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 mb-4">
            <h3 className="text-lg font-bold text-primaryDark mb-4">
              Waste Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Total Waste Returned
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {allCount}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Unused Drugs
                </span>
                <span className="text-lg font-bold text-yellow-600">
                  {unusedCount}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Expired Drugs
                </span>
                <span className="text-lg font-bold text-red-600">
                  {expiredCount}
                </span>
              </div>
            </div>
          </div>

          {/* Eco-Lessons Info */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-900 mb-1">
                  Eco-Lessons
                </p>
                <p className="text-xs text-green-700">
                  Educate patients on medication safety and proper disposal of
                  unused & expired drugs using NAFDAC-approved methods
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Waste Records */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            {/* Header with Tabs */}
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-primaryDark">
                    Returned Medicines
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600">
                    Unused and expired drugs returned from patients back into
                    the system to avoid environmental impact
                  </p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium text-sm whitespace-nowrap">
                  + Add Waste Returned
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeFilter === "all"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  All ({allCount})
                </button>
                <button
                  onClick={() => setActiveFilter("unused")}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeFilter === "unused"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Unused ({unusedCount})
                </button>
                <button
                  onClick={() => setActiveFilter("expired")}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeFilter === "expired"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Expired ({expiredCount})
                </button>
              </div>
            </div>

            {/* Waste Records List */}
            <div className="space-y-4">
              {filteredWaste.map((waste) => (
                <div
                  key={waste.id}
                  className={`border-2 rounded-lg p-4 lg:p-5 transition-all hover:shadow-md ${
                    waste.status === "expired"
                      ? "border-red-200 bg-red-50"
                      : "border-yellow-200 bg-yellow-50"
                  }`}
                >
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          waste.status === "expired"
                            ? "bg-red-100"
                            : "bg-yellow-100"
                        }`}
                      >
                        {getStatusIcon(waste.status)}
                      </div>
                      <div>
                        <p className="font-bold text-sm lg:text-base text-gray-900">
                          {waste.drug_name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {waste.patient_name} • {waste.unique_id}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                        waste.status
                      )} flex-shrink-0 self-start`}
                    >
                      {waste.status === "expired" ? "Expired" : "Unused"}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-gray-600 min-w-[80px]">
                        Waste Type:
                      </span>
                      <span className="text-sm text-gray-900">
                        {waste.waste_type}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-gray-600 min-w-[80px]">
                        Quantity:
                      </span>
                      <span className="text-sm text-gray-900">
                        {waste.quantity}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-gray-600 min-w-[80px]">
                        Date:
                      </span>
                      <span className="text-sm text-gray-900">
                        {new Date(waste.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-gray-600 min-w-[80px]">
                        Reason:
                      </span>
                      <span className="text-sm text-gray-900">
                        {waste.reason}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="w-full lg:w-auto px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                      See Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredWaste.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 lg:w-10 lg:h-10 text-gray-400" />
                </div>
                <h4 className="text-base lg:text-lg font-semibold text-gray-700 mb-2">
                  No Waste Records Found
                </h4>
                <p className="text-sm lg:text-base text-gray-600">
                  No waste has been returned for the selected filter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WastePage;
