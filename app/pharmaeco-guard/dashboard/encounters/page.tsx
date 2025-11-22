/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDorraEncounters } from "@/lib/api/dorraQueries";

import { useDorraPatients } from "@/lib/api/dorraQueries";
import { AlertTriangle } from "lucide-react";
import { PatientDropdown } from "../components/patientDropdown";
import { AddEncounterModal } from "./components/addEncounterModal";

const EncountersPage = () => {
  const { control } = useForm();
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "completed" | "pending"
  >("all");

  const { data: patientsData } = useDorraPatients();
  const { data: encountersData, isLoading } = useDorraEncounters();

  const selectedPatient = patientsData?.results.find(
    (p) => p.id === selectedPatientId
  );

  const filteredEncounters = encountersData?.results?.filter((encounter) => {
    const matchesPatient =
      !selectedPatientId || encounter.patient === selectedPatientId;
    return matchesPatient;
  });

  const getStatusColor = (hasDrugInteraction: boolean) => {
    if (hasDrugInteraction) return "bg-red-50 border-red-200";
    return "bg-blue-50 border-blue-200";
  };

  const getStatusBadge = (hasDrugInteraction: boolean) => {
    if (hasDrugInteraction) return "bg-red-100 text-red-700 border-red-300";
    return "bg-green-100 text-green-700 border-green-300";
  };

  return (
    <div className="p-4 lg:p-8 bg-primaryLight min-h-screen">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
          Encounters
        </h1>
        <p className="text-sm lg:text-base text-gray-600">
          Track and manage patient visits
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Panel - Patient Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            <PatientDropdown
              control={control}
              patientsData={patientsData}
              selectedPatientId={selectedPatientId}
              selectedPatient={selectedPatient}
              setSelectedPatientId={setSelectedPatientId}
              onAddRecord={() => setShowAddModal(true)}
            />
          </div>
        </div>

        {/* Right Panel - Encounters List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
              {[
                { key: "all", label: "All", count: encountersData?.count || 0 },
                { key: "active", label: "Active", count: 1 },
                { key: "completed", label: "Completed", count: 3 },
                { key: "pending", label: "Pending", count: 0 },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key as any)}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeFilter === tab.key
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Encounters List */}
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-32 bg-gray-100 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>
            ) : filteredEncounters && filteredEncounters.length > 0 ? (
              <div className="space-y-4">
                {filteredEncounters.map((encounter) => (
                  <div
                    key={encounter.id}
                    className={`border-2 rounded-lg p-4 lg:p-5 transition-all ${getStatusColor(
                      encounter.has_drug_interaction
                    )}`}
                  >
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            encounter.has_drug_interaction
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-bold text-sm lg:text-base text-gray-900">
                            {encounter.patient_name}
                          </p>
                          <p className="text-xs text-gray-600">
                            Main Complaint:{" "}
                            {encounter.consultation_reason ||
                              encounter.diagnosis}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(encounter.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}{" "}
                            -{" "}
                            {encounter.consultation_reason ||
                              "Consultation" ||
                              "Follow-up Visit"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                            encounter.has_drug_interaction
                          )}`}
                        >
                          {encounter.has_drug_interaction
                            ? "Completed"
                            : "Active"}
                        </span>
                      </div>
                    </div>

                    {/* Diagnosis */}
                    {encounter.diagnosis && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          Diagnosis:
                        </p>
                        <p className="text-sm text-gray-900">
                          {encounter.diagnosis}
                        </p>
                      </div>
                    )}

                    {/* Drug Interaction Warning */}
                    {encounter.has_drug_interaction && (
                      <div className="mt-3 p-3 bg-yellow-50 border-2 border-yellow-200 rounded flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-yellow-900">
                            Drug Interactions Detected
                          </p>
                          <p className="text-xs text-yellow-800">
                            Review pharmacovigilance report for details
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-3 mt-3 border-t border-gray-300">
                      <button className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                        View Details
                      </button>
                      <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium text-sm">
                        Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h4 className="text-base lg:text-lg font-semibold text-gray-700 mb-2">
                  No Encounters Found
                </h4>
                <p className="text-sm lg:text-base text-gray-600 mb-6">
                  {selectedPatientId
                    ? "No encounters recorded for this patient yet"
                    : "Select a patient or create a new encounter"}
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium"
                >
                  + New Encounter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Encounter Modal */}
      <AddEncounterModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        patientId={selectedPatientId || undefined}
      />
    </div>
  );
};

export default EncountersPage;
