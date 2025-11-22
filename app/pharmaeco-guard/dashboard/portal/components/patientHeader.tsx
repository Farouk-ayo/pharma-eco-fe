import React from "react";
import { DorraPatient } from "@/lib/types/dorra";

interface PatientHeaderProps {
  patient: DorraPatient;
  lastVisit?: string;
  totalRecords: number;
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({
  patient,
  lastVisit,
}) => {
  return (
    <div className="p-4 lg:p-4 bg-white rounded-md">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl lg:text-3xl shadow-lg flex-shrink-0">
            {patient.first_name?.charAt(0)}
            {patient.last_name?.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-primaryDark mb-1">
              {patient.last_name} {patient.first_name}
            </h2>
            <p className="text-xs lg:text-sm text-gray-600 font-mono mb-1">
              Patient ID: {patient.unique_id}
            </p>
            <div className="flex items-center gap-2 lg:gap-3 text-xs lg:text-sm text-gray-700">
              {patient.age && <span>{patient.age} years</span>}
              {patient.gender && (
                <>
                  <span>•</span>
                  <span>{patient.gender}</span>
                </>
              )}
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                Active
              </span>
            </div>
          </div>
        </div>
        <div className="text-left lg:text-right">
          {patient.date_of_birth && (
            <p className="text-xs lg:text-sm text-gray-600 mb-1">
              DOB: {patient.date_of_birth}
            </p>
          )}
          {patient.phone_number && (
            <p className="text-xs lg:text-sm text-gray-600">
              Phone: {patient.phone_number}
            </p>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {lastVisit && (
          <div className="text-center p-3 lg:p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-600 mb-1 font-medium">Last Visit</p>
            <p className="text-sm font-bold text-gray-900">{lastVisit}</p>
          </div>
        )}
      </div>
    </div>
  );
};
