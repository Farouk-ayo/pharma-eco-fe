import React from "react";
import { DorraPatient } from "@/lib/types/dorra";

interface SelectedPatientInfoProps {
  patient: DorraPatient;
}

export const SelectedPatientInfo: React.FC<SelectedPatientInfoProps> = ({
  patient,
}) => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary/30 p-4 lg:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-base lg:text-lg flex-shrink-0">
          {patient.first_name?.charAt(0)}
          {patient.last_name?.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm lg:text-base text-primaryDark truncate">
            {patient.full_name}
          </p>
          <p className="text-xs text-gray-600 font-mono">
            ID: {patient.unique_id}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-xs lg:text-sm">
        {patient.age && (
          <div className="flex justify-between">
            <span className="text-gray-600">Age:</span>
            <span className="font-medium text-gray-900">
              {patient.age} years
            </span>
          </div>
        )}
        {patient.gender && (
          <div className="flex justify-between">
            <span className="text-gray-600">Gender:</span>
            <span className="font-medium text-gray-900">{patient.gender}</span>
          </div>
        )}
      </div>

      {patient.allergies && patient.allergies.length > 0 && (
        <div className="mt-4 pt-4 border-t border-primary/20">
          <p className="text-xs font-semibold text-gray-600 mb-2">
            Known Allergies:
          </p>
          <div className="flex flex-wrap gap-2">
            {patient.allergies.map((allergy, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium border border-red-300"
              >
                {allergy}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
