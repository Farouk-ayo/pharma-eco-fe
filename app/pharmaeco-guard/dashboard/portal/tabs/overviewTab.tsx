import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  DorraPatient,
  DorraEncounter,
  DorraAppointment,
} from "@/lib/types/dorra";
import { AddRecordModal } from "../components/addRecordModal";
import { ScheduleAppointmentModal } from "../components/scheduleAppointmentModal";

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
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const latestEncounter = encounters[0];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
          <div className="space-y-3">
            {encounters.slice(0, 3).map((encounter) => (
              <div
                key={encounter.id}
                className="bg-white border border-gray-200 rounded-lg p-3"
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-medium text-gray-900">
                    Last Visit
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(encounter.created_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                {encounter.diagnosis && (
                  <p className="text-xs text-gray-600 truncate">
                    {encounter.diagnosis}
                  </p>
                )}
              </div>
            ))}

            {appointments.slice(0, 2).map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white border border-gray-200 rounded-lg p-3"
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

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
          <div className="space-y-3">
            <button
              onClick={() => setShowScheduleModal(true)}
              className="w-full bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors flex items-center justify-between group"
            >
              <span className="text-sm font-medium text-gray-900">
                Schedule Appointment
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </button>

            <button
              onClick={() => setShowAddRecordModal(true)}
              className="w-full bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors flex items-center justify-between group"
            >
              <span className="text-sm font-medium text-gray-900">
                Add Medical Record
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </button>

            <button className="w-full bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors flex items-center justify-between group">
              <span className="text-sm font-medium text-gray-900">
                Upload Documents
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <AddRecordModal
        isOpen={showAddRecordModal}
        onClose={() => setShowAddRecordModal(false)}
        patientName={patient.full_name}
      />
      ;{/* Modals */}
      <ScheduleAppointmentModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        patientId={patient.id}
        patientName={patient.full_name}
        patientPhone={patient.phone_number}
      />
    </>
  );
};
