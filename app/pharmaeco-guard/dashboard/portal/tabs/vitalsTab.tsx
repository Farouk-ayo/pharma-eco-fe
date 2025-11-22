import React from "react";
import { DorraEncounter } from "@/lib/types/dorra";

interface VitalsTabProps {
  encounters?: DorraEncounter[];
}

export const VitalsTab: React.FC<VitalsTabProps> = ({ encounters = [] }) => {
  const encountersWithVitals = encounters.filter(
    (e) =>
      e.blood_pressure ||
      e.heart_rate ||
      e.temperature ||
      e.weight ||
      e.height ||
      e.bmi
  );

  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-primaryDark mb-4">
        Vital Signs History
      </h4>

      {encountersWithVitals.map((encounter) => (
        <div
          key={encounter.id}
          className="border-2 border-gray-200 rounded-lg p-4 lg:p-5"
        >
          <p className="text-sm text-gray-600 mb-4 font-medium">
            {new Date(encounter.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {encounter.blood_pressure && (
              <div className="p-3 lg:p-4 bg-red-50 rounded-lg border-2 border-red-200">
                <p className="text-xs text-red-900 font-medium mb-1">
                  Blood Pressure
                </p>
                <p className="text-lg lg:text-xl font-bold text-red-900">
                  {encounter.blood_pressure}
                </p>
                <p className="text-xs text-red-700 mt-1">mmHg</p>
              </div>
            )}

            {encounter.heart_rate && (
              <div className="p-3 lg:p-4 bg-pink-50 rounded-lg border-2 border-pink-200">
                <p className="text-xs text-pink-900 font-medium mb-1">
                  Heart Rate
                </p>
                <p className="text-lg lg:text-xl font-bold text-pink-900">
                  {encounter.heart_rate}
                </p>
                <p className="text-xs text-pink-700 mt-1">bpm</p>
              </div>
            )}

            {encounter.temperature && (
              <div className="p-3 lg:p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <p className="text-xs text-orange-900 font-medium mb-1">
                  Temperature
                </p>
                <p className="text-lg lg:text-xl font-bold text-orange-900">
                  {encounter.temperature}
                </p>
                <p className="text-xs text-orange-700 mt-1">°F</p>
              </div>
            )}

            {encounter.weight && (
              <div className="p-3 lg:p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <p className="text-xs text-blue-900 font-medium mb-1">Weight</p>
                <p className="text-lg lg:text-xl font-bold text-blue-900">
                  {encounter.weight}
                </p>
                <p className="text-xs text-blue-700 mt-1">kg</p>
              </div>
            )}

            {encounter.height && (
              <div className="p-3 lg:p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <p className="text-xs text-green-900 font-medium mb-1">
                  Height
                </p>
                <p className="text-lg lg:text-xl font-bold text-green-900">
                  {encounter.height}
                </p>
                <p className="text-xs text-green-700 mt-1">cm</p>
              </div>
            )}

            {encounter.bmi && (
              <div className="p-3 lg:p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                <p className="text-xs text-purple-900 font-medium mb-1">BMI</p>
                <p className="text-lg lg:text-xl font-bold text-purple-900">
                  {encounter.bmi}
                </p>
                <p className="text-xs text-purple-700 mt-1">kg/m²</p>
              </div>
            )}
          </div>
        </div>
      ))}

      {encountersWithVitals.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No vital signs recorded yet
        </p>
      )}
    </div>
  );
};
