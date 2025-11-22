"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import {
  useDorraPatients,
  useDorraDrugInteractions,
} from "@/lib/api/dorraQueries";
import { PatientDropdown } from "../components/patientDropdown";
import { InteractionChecker } from "./components/interactionChecker";
import { SeverityLegend } from "./components/severityLegend";
import { InteractionCard } from "./components/interactionCard";
import { EmptyInteractionState } from "./components/emptyInteractionState";

interface DrugInteraction {
  id: number;
  patient_name: string;
  unique_id: string;
  drug_a: string;
  drug_b: string;
  severity: "Major" | "Moderate" | "Minor" | "Unknown";
  reason: string;
  created_at: string;
  patient: number;
  encounter: number;
}

const DrugInteractionSystem = () => {
  const { control } = useForm();
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [medicationQuery, setMedicationQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: patientsData } = useDorraPatients();
  const { data: interactionsData, isLoading: interactionsLoading } =
    useDorraDrugInteractions();

  const selectedPatient = patientsData?.results.find(
    (p) => p.id === selectedPatientId
  );

  const filteredInteractions = interactionsData?.results?.filter(
    (interaction: DrugInteraction) =>
      (!selectedPatientId || interaction.patient === selectedPatientId) &&
      (!searchQuery ||
        interaction.drug_a.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interaction.drug_b.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interaction.patient_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  const handleCheckInteractions = () => {
    console.log("Checking interactions for:", medicationQuery);
  };

  return (
    <div className="p-4 lg:p-8 bg-primaryLight min-h-screen">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
          Drug Interaction AI System
        </h1>
        <p className="text-sm lg:text-base text-gray-600">
          AI-powered analysis to identify potential drug interactions and
          provide medication safety recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Panel - Patient Selection & Checker */}
        <div className="lg:col-span-1 space-y-4 lg:space-y-6">
          {/* Patient Dropdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            <PatientDropdown
              control={control}
              patientsData={patientsData}
              selectedPatientId={selectedPatientId}
              selectedPatient={selectedPatient}
              setSelectedPatientId={setSelectedPatientId}
              onAddRecord={() => console.log("Add Record")}
            />
          </div>

          {/* Interaction Checker */}
          <InteractionChecker
            medicationQuery={medicationQuery}
            onMedicationQueryChange={setMedicationQuery}
            onCheckInteractions={handleCheckInteractions}
            disabled={!selectedPatientId || !medicationQuery}
          />
        </div>

        {/* Right Panel - Interactions Display */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0 mb-6">
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-primaryDark">
                  Drug Interactions
                </h3>
                <p className="text-xs lg:text-sm text-gray-600">
                  {filteredInteractions?.length || 0} interaction(s) detected
                </p>
              </div>

              {/* Search Filter */}
              <div className="relative w-full lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search interactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>

            {/* Severity Legend */}
            <SeverityLegend />

            {/* Interactions List */}
            {interactionsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-28 lg:h-32 bg-gray-100 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>
            ) : filteredInteractions && filteredInteractions.length > 0 ? (
              <div className="space-y-4 max-h-[500px] lg:max-h-[600px] overflow-y-auto">
                {filteredInteractions.map((interaction: DrugInteraction) => (
                  <InteractionCard
                    key={interaction.id}
                    interaction={interaction}
                  />
                ))}
              </div>
            ) : (
              <EmptyInteractionState hasSelectedPatient={!!selectedPatientId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugInteractionSystem;
