import React from "react";
import { Info } from "lucide-react";
import {
  DorraPatient,
  DorraEncounter,
  DorraAppointment,
} from "@/lib/types/dorra";

interface OverviewTabProps {
  patient: DorraPatient;
  encounters?: DorraEncounter[];
  appointments?: DorraAppointment[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  patient,
  encounters = [],
  appointments = [],
}) => {
  const latestEncounter = encounters[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Activity */}
      <div className="lg:col-span-1">
        <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
        <div className="space-y-3">
          {encounters.slice(0, 3).map((encounter) => (
            <div
              key={encounter.id}
              className="bg-white border border-gray-200 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-medium text-gray-900">Last Visit</p>
                <p className="text-xs text-gray-500">
                  {new Date(encounter.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              {encounter.diagnosis && (
                <p className="text-xs text-gray-600 truncate">
                  {encounter.diagnosis}
                </p>
              )}
              {encounter.has_drug_interaction && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                  ⚠️ Drug Interaction
                </span>
              )}
            </div>
          ))}

          {appointments.slice(0, 2).map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white border border-gray-200 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-medium text-gray-900">
                  {appointment.status === "active"
                    ? "Upcoming Appointment"
                    : "Past Appointment"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(appointment.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              {appointment.reason && (
                <p className="text-xs text-gray-600 truncate">
                  {appointment.reason}
                </p>
              )}
            </div>
          ))}

          {encounters.length === 0 && appointments.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500">No recent activity</p>
            </div>
          )}
        </div>
      </div>

      {/* Health Summary */}
      <div className="lg:col-span-1">
        <h4 className="font-semibold text-gray-900 mb-4">Health Summary</h4>
        <div className="space-y-3">
          {latestEncounter?.blood_pressure && (
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-900">
                  Blood Pressure
                </p>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  Normal
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900 mt-1">
                {latestEncounter.blood_pressure}
              </p>
            </div>
          )}

          {latestEncounter?.bmi && (
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-900">BMI</p>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  Normal
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900 mt-1">
                {latestEncounter.bmi}
              </p>
            </div>
          )}

          {latestEncounter?.heart_rate && (
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-900">Heart Rate</p>
              <p className="text-lg font-bold text-gray-900 mt-1">
                {latestEncounter.heart_rate} bpm
              </p>
            </div>
          )}

          {latestEncounter?.temperature && (
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-900">Temperature</p>
              <p className="text-lg font-bold text-gray-900 mt-1">
                {latestEncounter.temperature}°F
              </p>
            </div>
          )}

          {!latestEncounter && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500">No vitals recorded yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Info */}
      <div className="lg:col-span-1">
        <h4 className="font-semibold text-gray-900 mb-4">
          Patient Information
        </h4>
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Total Encounters</p>
            <p className="text-2xl font-bold text-gray-900">
              {encounters.length}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Total Appointments</p>
            <p className="text-2xl font-bold text-gray-900">
              {appointments.length}
            </p>
          </div>

          {patient.allergies && patient.allergies.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-xs text-red-900 font-semibold mb-2">
                ⚠️ Known Allergies
              </p>
              <div className="flex flex-wrap gap-1">
                {patient.allergies.map((allergy, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Info about creating records */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-blue-900 mb-1">
                  Create Records via AI
                </p>
                <p className="text-xs text-blue-700">
                  Use the AI prompt on the dashboard to create appointments and
                  encounters
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
