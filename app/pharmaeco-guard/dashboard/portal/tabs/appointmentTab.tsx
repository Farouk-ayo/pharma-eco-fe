import React from "react";
import { Calendar } from "lucide-react";
import { DorraAppointment } from "@/lib/types/dorra";

interface AppointmentsTabProps {
  appointments?: DorraAppointment[];
}

export const AppointmentsTab: React.FC<AppointmentsTabProps> = ({
  appointments = [],
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-primaryDark">Appointments</h4>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors text-sm font-medium">
          + Schedule Appointment
        </button>
      </div>

      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="border-2 border-gray-200 rounded-lg p-4 lg:p-5 hover:bg-gray-50 hover:border-primary transition-all"
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {new Date(appointment.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(appointment.date).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold self-start flex-shrink-0 ${
                appointment.status === "active"
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              {appointment.status}
            </span>
          </div>

          {appointment.reason && (
            <div className="mb-2">
              <p className="text-xs font-semibold text-gray-600 mb-1">
                Reason:
              </p>
              <p className="text-sm text-gray-900">{appointment.reason}</p>
            </div>
          )}

          {appointment.summary && (
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">
                Summary:
              </p>
              <p className="text-sm text-gray-700">{appointment.summary}</p>
            </div>
          )}
        </div>
      ))}

      {appointments.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No appointments scheduled
        </p>
      )}
    </div>
  );
};
