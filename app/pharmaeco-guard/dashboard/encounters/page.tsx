"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDorraEncounters, useDorraEncounter } from "@/lib/api/dorraQueries";
import { useDorraPatients } from "@/lib/api/dorraQueries";
import { AlertTriangle, FileText, Plus, X } from "lucide-react";
import { PatientDropdown } from "../components/patientDropdown";

const EncountersPage = () => {
  const { control } = useForm();
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [selectedEncounterId, setSelectedEncounterId] = useState<number | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<
    "all" | "recent" | "withDrugInteraction"
  >("all");

  const { data: patientsData } = useDorraPatients();
  const { data: encountersData, isLoading } = useDorraEncounters();
  const { data: selectedEncounter, isLoading: encounterLoading } =
    useDorraEncounter(selectedEncounterId!);

  const selectedPatient = patientsData?.results.find(
    (p) => p.id === selectedPatientId
  );

  // Filter encounters
  const filteredEncounters = encountersData?.results?.filter((encounter) => {
    const matchesPatient =
      !selectedPatientId || encounter.patient === selectedPatientId;

    if (!matchesPatient) return false;

    if (activeFilter === "withDrugInteraction") {
      return encounter.has_drug_interaction;
    }

    return true;
  });

  // Calculate counts
  const allCount = encountersData?.count || 0;
  const recentCount =
    encountersData?.results?.filter((e) => {
      const encounterDate = new Date(e.created_at);
      const daysDiff = Math.floor(
        (Date.now() - encounterDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysDiff <= 7;
    }).length || 0;
  const drugInteractionCount =
    encountersData?.results?.filter((e) => e.has_drug_interaction).length || 0;

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
          View and track patient visits
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

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Plus className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">
                  Create New Encounter
                </p>
                <p className="text-xs text-blue-700">
                  Use the AI prompt box on the dashboard to create new
                  encounters. Example: &quot;Create encounter for patient 123
                  with symptoms of fever and cough, diagnosed with flu&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Encounters List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            {/* Tabs */}
            <div className="my-4 rounded-b-[30px] rounded-t-[8px] bg-[#F1F1F1]">
              <div className="flex overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`flex items-center gap-2 m-2 px-4 py-3 transition-all whitespace-nowrap rounded-b-[30px] rounded-t-[8px] ${
                    activeFilter === "all"
                      ? "bg-white font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-sm">All ({allCount})</span>
                </button>
                <button
                  onClick={() => setActiveFilter("recent")}
                  className={`flex items-center gap-2 m-2 px-4 py-3 transition-all whitespace-nowrap rounded-b-[30px] rounded-t-[8px] ${
                    activeFilter === "recent"
                      ? "bg-white font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-sm">Recent ({recentCount})</span>
                </button>
                <button
                  onClick={() => setActiveFilter("withDrugInteraction")}
                  className={`flex items-center gap-2 m-2 px-4 py-3 transition-all whitespace-nowrap rounded-b-[30px] rounded-t-[8px] ${
                    activeFilter === "withDrugInteraction"
                      ? "bg-white font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-sm">
                    Drug Interactions ({drugInteractionCount})
                  </span>
                </button>
              </div>
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
                    className={`border-2 rounded-lg p-4 lg:p-5 transition-all cursor-pointer hover:shadow-md ${
                      encounter.has_drug_interaction
                        ? "border-red-200 bg-red-50"
                        : "border-blue-200 bg-blue-50"
                    } ${
                      selectedEncounterId === encounter.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => setSelectedEncounterId(encounter.id)}
                  >
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            encounter.has_drug_interaction
                              ? "bg-red-100"
                              : "bg-blue-100"
                          }`}
                        >
                          <FileText
                            className={`w-5 h-5 lg:w-6 lg:h-6 ${
                              encounter.has_drug_interaction
                                ? "text-red-600"
                                : "text-blue-600"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-sm lg:text-base text-gray-900">
                            {encounter.patient_name}
                          </p>
                          <p className="text-xs text-gray-600">
                            ID: {encounter.unique_id}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(encounter.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                          encounter.has_drug_interaction
                        )} flex-shrink-0 self-start`}
                      >
                        {encounter.has_drug_interaction
                          ? "⚠️ Drug Interaction"
                          : "✓ Safe"}
                      </span>
                    </div>

                    {/* Consultation Reason */}
                    {encounter.consultation_reason && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          Consultation Reason:
                        </p>
                        <p className="text-sm text-gray-900">
                          {encounter.consultation_reason}
                        </p>
                      </div>
                    )}

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

                    {/* Vitals Summary */}
                    {(encounter.blood_pressure ||
                      encounter.heart_rate ||
                      encounter.temperature) && (
                      <div className="mb-3 p-3 bg-white border border-gray-200 rounded-lg">
                        <p className="text-xs font-semibold text-gray-600 mb-2">
                          Vitals:
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs">
                          {encounter.blood_pressure && (
                            <span className="text-gray-700">
                              BP: <strong>{encounter.blood_pressure}</strong>
                            </span>
                          )}
                          {encounter.heart_rate && (
                            <span className="text-gray-700">
                              HR: <strong>{encounter.heart_rate} bpm</strong>
                            </span>
                          )}
                          {encounter.temperature && (
                            <span className="text-gray-700">
                              Temp: <strong>{encounter.temperature}°F</strong>
                            </span>
                          )}
                        </div>
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
                            Click to view full details
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 lg:w-10 lg:h-10 text-gray-400" />
                </div>
                <h4 className="text-base lg:text-lg font-semibold text-gray-700 mb-2">
                  No Encounters Found
                </h4>
                <p className="text-sm lg:text-base text-gray-600 mb-6">
                  {selectedPatientId
                    ? "No encounters recorded for this patient yet"
                    : "Select a patient or create a new encounter"}
                </p>
                <p className="text-xs text-gray-400">
                  Use AI prompt to create encounters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Encounter Details Modal */}
      {selectedEncounterId && selectedEncounter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-gray-900">
                  Encounter Details
                </h2>
                <p className="text-xs lg:text-sm text-gray-600">
                  {selectedEncounter.patient_name} • ID:{" "}
                  {selectedEncounter.unique_id}
                </p>
              </div>
              <button
                onClick={() => setSelectedEncounterId(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            {encounterLoading ? (
              <div className="p-6 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-gray-100 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="p-4 lg:p-6 space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-600">Date</p>
                    <p className="text-sm text-gray-900">
                      {new Date(
                        selectedEncounter.created_at
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedEncounter.consultation_reason && (
                    <div>
                      <p className="text-xs font-semibold text-gray-600">
                        Consultation Reason
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedEncounter.consultation_reason}
                      </p>
                    </div>
                  )}
                </div>

                {/* Vitals */}
                {(selectedEncounter.blood_pressure ||
                  selectedEncounter.heart_rate ||
                  selectedEncounter.temperature ||
                  selectedEncounter.weight ||
                  selectedEncounter.height) && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">
                      Vital Signs
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {selectedEncounter.blood_pressure && (
                        <div className="p-3 bg-red-50 rounded">
                          <p className="text-xs text-gray-600">
                            Blood Pressure
                          </p>
                          <p className="text-base font-bold">
                            {selectedEncounter.blood_pressure}
                          </p>
                        </div>
                      )}
                      {selectedEncounter.heart_rate && (
                        <div className="p-3 bg-pink-50 rounded">
                          <p className="text-xs text-gray-600">Heart Rate</p>
                          <p className="text-base font-bold">
                            {selectedEncounter.heart_rate} bpm
                          </p>
                        </div>
                      )}
                      {selectedEncounter.temperature && (
                        <div className="p-3 bg-orange-50 rounded">
                          <p className="text-xs text-gray-600">Temperature</p>
                          <p className="text-base font-bold">
                            {selectedEncounter.temperature}°F
                          </p>
                        </div>
                      )}
                      {selectedEncounter.weight && (
                        <div className="p-3 bg-blue-50 rounded">
                          <p className="text-xs text-gray-600">Weight</p>
                          <p className="text-base font-bold">
                            {selectedEncounter.weight} kg
                          </p>
                        </div>
                      )}
                      {selectedEncounter.height && (
                        <div className="p-3 bg-green-50 rounded">
                          <p className="text-xs text-gray-600">Height</p>
                          <p className="text-base font-bold">
                            {selectedEncounter.height} cm
                          </p>
                        </div>
                      )}
                      {selectedEncounter.bmi && (
                        <div className="p-3 bg-purple-50 rounded">
                          <p className="text-xs text-gray-600">BMI</p>
                          <p className="text-base font-bold">
                            {selectedEncounter.bmi}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Diagnosis */}
                {selectedEncounter.diagnosis && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      Diagnosis
                    </h3>
                    <p className="text-sm text-gray-700">
                      {selectedEncounter.diagnosis}
                    </p>
                  </div>
                )}

                {/* Summary */}
                {selectedEncounter.summary && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      Summary
                    </h3>
                    <p className="text-sm text-gray-700">
                      {selectedEncounter.summary}
                    </p>
                  </div>
                )}

                {/* Medical History */}
                {selectedEncounter.medical_history && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      Medical History
                    </h3>
                    <p className="text-sm text-gray-700">
                      {selectedEncounter.medical_history}
                    </p>
                  </div>
                )}

                {/* Follow-up */}
                {selectedEncounter.follow_up && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      Follow-up Instructions
                    </h3>
                    <p className="text-sm text-gray-700">
                      {selectedEncounter.follow_up}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EncountersPage;
