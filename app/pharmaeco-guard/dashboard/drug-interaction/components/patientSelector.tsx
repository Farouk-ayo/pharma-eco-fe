import React from "react";
import { DorraPatient } from "@/lib/types/dorra";

interface PatientSelectorProps {
  patients?: DorraPatient[];
  isLoading: boolean;
  selectedPatientId: number | null;
  onSelectPatient: (id: number) => void;
}

export const PatientSelector: React.FC<PatientSelectorProps> = ({
  patients = [],
  isLoading,
  selectedPatientId,
  onSelectPatient,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
      <h3 className="text-base lg:text-lg font-bold text-primaryDark mb-2">
        Patients
      </h3>
      <p className="text-xs lg:text-sm text-gray-600 mb-4">
        Choose a patient to check for drug interactions
      </p>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-14 lg:h-16 bg-gray-100 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="space-y-2 max-h-[300px] lg:max-h-[400px] overflow-y-auto">
          {patients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => onSelectPatient(patient.id)}
              className={`w-full text-left p-3 lg:p-4 rounded-lg border-2 transition-all ${
                selectedPatientId === patient.id
                  ? "bg-primaryLight border-primary"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2 lg:gap-3">
                <div
                  className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                    selectedPatientId === patient.id
                      ? "bg-primary"
                      : "bg-gray-400"
                  }`}
                >
                  {patient.first_name?.charAt(0)}
                  {patient.last_name?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm lg:text-base text-gray-900 truncate">
                    {patient.full_name}
                  </p>
                  <p className="text-xs text-gray-600 font-mono">
                    {patient.unique_id}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
