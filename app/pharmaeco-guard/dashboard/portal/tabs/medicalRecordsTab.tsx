import React from "react";
import { DorraPatient, DorraEncounter } from "@/lib/types/dorra";

interface MedicalRecordsTabProps {
  patient: DorraPatient;
  encounters?: DorraEncounter[];
}

export const MedicalRecordsTab: React.FC<MedicalRecordsTabProps> = ({
  patient,
  encounters = [],
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-primaryDark">Medical Records</h4>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors text-sm font-medium">
          + Add Record
        </button>
      </div>

      {/* Allergies */}
      {patient.allergies && patient.allergies.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 lg:p-5">
          <h5 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
            ⚠️ Known Allergies
          </h5>
          <div className="flex flex-wrap gap-2">
            {patient.allergies.map((allergy, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium border border-red-300"
              >
                {allergy}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Encounters/Visits */}
      <div>
        <h5 className="font-semibold text-primaryDark mb-3">
          Medical Encounters
        </h5>
        <div className="space-y-3">
          {encounters.map((encounter) => (
            <div
              key={encounter.id}
              className="border-2 border-gray-200 rounded-lg p-4 lg:p-5 hover:bg-gray-50 hover:border-primary transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    Encounter #{encounter.unique_id}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(encounter.created_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                <button className="text-primary hover:text-primaryDark text-sm font-medium self-start">
                  View Details →
                </button>
              </div>

              {encounter.diagnosis && (
                <div className="mb-2">
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    Diagnosis:
                  </p>
                  <p className="text-sm text-gray-900">{encounter.diagnosis}</p>
                </div>
              )}

              {encounter.summary && (
                <div className="mb-2">
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    Summary:
                  </p>
                  <p className="text-sm text-gray-700">{encounter.summary}</p>
                </div>
              )}

              {/* Vitals */}
              {(encounter.blood_pressure ||
                encounter.temperature ||
                encounter.heart_rate) && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-2">
                    Vitals:
                  </p>
                  <div className="flex flex-wrap gap-3 lg:gap-4 text-sm">
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

              {/* Drug Interactions Warning */}
              {encounter.has_drug_interaction && (
                <div className="mt-3 p-3 bg-yellow-50 border-2 border-yellow-200 rounded">
                  <p className="text-xs font-semibold text-yellow-900 mb-1">
                    ⚠️ Drug Interactions Detected
                  </p>
                  <p className="text-xs text-yellow-800">
                    Review pharmacovigilance report for details
                  </p>
                </div>
              )}
            </div>
          ))}

          {encounters.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No medical encounters recorded yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
