/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Search,
  FileText,
  Calendar,
  Pill,
  Activity,
  Upload,
  ChevronRight,
} from "lucide-react";
import {
  useDorraPatients,
  useDorraPatient,
  useDorraPatientAppointments,
  useDorraPatientEncounters,
} from "@/lib/api/dorraQueries";

const PatientPortalPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<
    "overview" | "medical" | "appointments" | "documents" | "vitals"
  >("overview");

  const { data: patientsData, isLoading: patientsLoading } =
    useDorraPatients(searchQuery);
  //   const { data: selectedPatient, isLoading: patientLoading } = useDorraPatient(
  //     selectedPatientId!
  //   );
  const { data: selectedPatient } = useDorraPatient(selectedPatientId!);
  const { data: appointmentsData } = useDorraPatientAppointments(
    selectedPatientId!
  );
  const { data: encountersData } = useDorraPatientEncounters(
    selectedPatientId!
  );

  const tabs = [
    {
      key: "overview",
      label: "Overview",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      key: "medical",
      label: "Medical Records",
      icon: <Pill className="w-4 h-4" />,
    },
    {
      key: "appointments",
      label: "Appointments",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      key: "documents",
      label: "Documents",
      icon: <Upload className="w-4 h-4" />,
    },
    { key: "vitals", label: "Vitals", icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
          Patient Portal
        </h1>
        <p className="text-sm lg:text-base text-gray-600">
          Access and manage patient health information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Patient List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-lg font-bold text-primaryDark mb-4">
              Patients
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Choose a patient to view their medical history
            </p>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Patient List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {patientsLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-gray-100 h-20 rounded-lg"
                    ></div>
                  ))
                : patientsData?.results.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatientId(patient.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedPatientId === patient.id
                          ? "bg-primaryLight border-primary"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {patient.first_name?.charAt(0)}
                          {patient.last_name?.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {patient.full_name}
                          </p>
                          <p className="text-xs text-gray-600 font-mono">
                            {patient.unique_id}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </button>
                  ))}
            </div>
          </div>
        </div>

        {/* Right Content - Patient Details */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <div className="bg-white rounded-xl border border-gray-200">
              {/* Patient Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {selectedPatient.first_name?.charAt(0)}
                      {selectedPatient.last_name?.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-primaryDark">
                        {selectedPatient.full_name}
                      </h2>
                      <p className="text-sm text-gray-600 font-mono">
                        Patient ID: {selectedPatient.unique_id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">
                      DOB: {selectedPatient.date_of_birth || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phone: {selectedPatient.phone_number || "N/A"}
                    </p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mt-2">
                      Active
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Last Visit</p>
                    <p className="text-sm font-bold text-gray-900">
                      {encountersData?.results[0]
                        ? new Date(
                            encountersData.results[0].created_at
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Blood Group</p>
                    <p className="text-sm font-bold text-gray-900">AB+</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Genotype</p>
                    <p className="text-sm font-bold text-gray-900">AA</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Total Records</p>
                    <p className="text-sm font-bold text-gray-900">
                      {(encountersData?.count || 0) +
                        (appointmentsData?.count || 0)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 px-6">
                <div className="flex gap-2 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.key
                          ? "border-primary text-primary font-semibold"
                          : "border-transparent text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab.icon}
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Patient ID Section */}
                    <div className="bg-primaryLight p-4 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">
                        Patient Information
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Gender:</p>
                          <p className="font-medium text-gray-900">
                            {selectedPatient.gender || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Age:</p>
                          <p className="font-medium text-gray-900">
                            {selectedPatient.age || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Email:</p>
                          <p className="font-medium text-gray-900">
                            {selectedPatient.email || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Address:</p>
                          <p className="font-medium text-gray-900">
                            {selectedPatient.address || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h4 className="font-semibold text-primaryDark mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Recent Activity
                      </h4>
                      <div className="space-y-3">
                        {encountersData?.results
                          .slice(0, 3)
                          .map((encounter) => (
                            <div
                              key={encounter.id}
                              className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                            >
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                  Last Visit
                                </p>
                                <p className="text-sm text-gray-600">
                                  {new Date(
                                    encounter.created_at
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          ))}

                        {appointmentsData?.results
                          .slice(0, 2)
                          .map((appointment) => (
                            <div
                              key={appointment.id}
                              className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                            >
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                  Appointment
                                </p>
                                <p className="text-sm text-gray-600">
                                  {new Date(
                                    appointment.date
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  appointment.status === "active"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {appointment.status}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Health Summary */}
                    <div>
                      <h4 className="font-semibold text-primaryDark mb-4">
                        Health Summary
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-red-900">
                              Blood Pressure
                            </p>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                              Normal
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-red-900">
                            {encountersData?.results[0]?.blood_pressure ||
                              "120/80"}
                          </p>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-blue-900">
                              Cholesterol
                            </p>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                              Normal
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-blue-900">
                            180 mg/dL
                          </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-purple-900">
                              BMI
                            </p>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                              Normal
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-purple-900">
                            {encountersData?.results[0]?.bmi || "22.5"}
                          </p>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <p className="text-sm font-medium text-yellow-900 mb-2">
                            Temperature
                          </p>
                          <p className="text-2xl font-bold text-yellow-900">
                            {encountersData?.results[0]?.temperature ||
                              "98.6°F"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <h4 className="font-semibold text-primaryDark mb-4">
                        Quick Actions
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        <button className="p-4 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors text-center">
                          <Calendar className="w-6 h-6 mx-auto mb-2" />
                          <span className="text-sm font-medium">
                            Schedule Appointment
                          </span>
                        </button>
                        <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center">
                          <FileText className="w-6 h-6 mx-auto mb-2" />
                          <span className="text-sm font-medium">
                            View Records
                          </span>
                        </button>
                        <button className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center">
                          <Upload className="w-6 h-6 mx-auto mb-2" />
                          <span className="text-sm font-medium">
                            Upload Documents
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "medical" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-primaryDark">
                        Medical Records
                      </h4>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors text-sm">
                        + Add Record
                      </button>
                    </div>

                    {/* Allergies */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h5 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                        ⚠️ Known Allergies
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedPatient.allergies &&
                        selectedPatient.allergies.length > 0 ? (
                          selectedPatient.allergies.map((allergy, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                            >
                              {allergy}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-red-700">
                            No known allergies
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Encounters/Visits */}
                    <div>
                      <h5 className="font-semibold text-primaryDark mb-3">
                        Medical Encounters
                      </h5>
                      <div className="space-y-3">
                        {encountersData?.results.map((encounter) => (
                          <div
                            key={encounter.id}
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="font-semibold text-gray-900">
                                  Encounter #{encounter.unique_id}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {new Date(
                                    encounter.created_at
                                  ).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                              <button className="text-primary hover:text-primaryDark text-sm font-medium">
                                View Details →
                              </button>
                            </div>

                            {encounter.diagnosis && (
                              <div className="mb-2">
                                <p className="text-xs font-semibold text-gray-600 mb-1">
                                  Diagnosis:
                                </p>
                                <p className="text-sm text-gray-900">
                                  {encounter.diagnosis}
                                </p>
                              </div>
                            )}

                            {encounter.summary && (
                              <div className="mb-2">
                                <p className="text-xs font-semibold text-gray-600 mb-1">
                                  Summary:
                                </p>
                                <p className="text-sm text-gray-700">
                                  {encounter.summary}
                                </p>
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
                                <div className="flex gap-4 text-sm">
                                  {encounter.blood_pressure && (
                                    <span className="text-gray-700">
                                      BP:{" "}
                                      <strong>
                                        {encounter.blood_pressure}
                                      </strong>
                                    </span>
                                  )}
                                  {encounter.heart_rate && (
                                    <span className="text-gray-700">
                                      HR:{" "}
                                      <strong>
                                        {encounter.heart_rate} bpm
                                      </strong>
                                    </span>
                                  )}
                                  {encounter.temperature && (
                                    <span className="text-gray-700">
                                      Temp:{" "}
                                      <strong>{encounter.temperature}°F</strong>
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Drug Interactions Warning */}
                            {encounter.drug_interactions &&
                              encounter.drug_interactions.length > 0 && (
                                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                  <p className="text-xs font-semibold text-yellow-900 mb-1">
                                    ⚠️ Drug Interactions Detected:{" "}
                                    {encounter.drug_interactions.length}
                                  </p>
                                  <p className="text-xs text-yellow-800">
                                    Review pharmacovigilance report for details
                                  </p>
                                </div>
                              )}
                          </div>
                        ))}

                        {!encountersData?.results.length && (
                          <p className="text-center text-gray-500 py-8">
                            No medical encounters recorded yet
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "appointments" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-primaryDark">
                        Appointments
                      </h4>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors text-sm">
                        + Schedule Appointment
                      </button>
                    </div>

                    {appointmentsData?.results.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {new Date(appointment.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                              <p className="text-sm text-gray-600">
                                {new Date(appointment.date).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "numeric",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              appointment.status === "active"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
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
                            <p className="text-sm text-gray-900">
                              {appointment.reason}
                            </p>
                          </div>
                        )}

                        {appointment.summary && (
                          <div>
                            <p className="text-xs font-semibold text-gray-600 mb-1">
                              Summary:
                            </p>
                            <p className="text-sm text-gray-700">
                              {appointment.summary}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}

                    {!appointmentsData?.results.length && (
                      <p className="text-center text-gray-500 py-8">
                        No appointments scheduled
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "documents" && (
                  <div className="text-center py-12">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">
                      No Documents Available
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Document management coming soon
                    </p>
                    <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors">
                      Upload Document
                    </button>
                  </div>
                )}

                {activeTab === "vitals" && (
                  <div className="space-y-6">
                    <h4 className="font-semibold text-primaryDark mb-4">
                      Vital Signs History
                    </h4>

                    {encountersData?.results
                      .filter((e) => e.vitals || e.blood_pressure)
                      .map((encounter) => (
                        <div
                          key={encounter.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <p className="text-sm text-gray-600 mb-3">
                            {new Date(encounter.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {encounter.blood_pressure && (
                              <div className="p-3 bg-red-50 rounded-lg">
                                <p className="text-xs text-red-900 font-medium mb-1">
                                  Blood Pressure
                                </p>
                                <p className="text-lg font-bold text-red-900">
                                  {encounter.blood_pressure}
                                </p>
                              </div>
                            )}

                            {encounter.heart_rate && (
                              <div className="p-3 bg-pink-50 rounded-lg">
                                <p className="text-xs text-pink-900 font-medium mb-1">
                                  Heart Rate
                                </p>
                                <p className="text-lg font-bold text-pink-900">
                                  {encounter.heart_rate} bpm
                                </p>
                              </div>
                            )}

                            {encounter.temperature && (
                              <div className="p-3 bg-orange-50 rounded-lg">
                                <p className="text-xs text-orange-900 font-medium mb-1">
                                  Temperature
                                </p>
                                <p className="text-lg font-bold text-orange-900">
                                  {encounter.temperature}°F
                                </p>
                              </div>
                            )}

                            {encounter.weight && (
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-xs text-blue-900 font-medium mb-1">
                                  Weight
                                </p>
                                <p className="text-lg font-bold text-blue-900">
                                  {encounter.weight} kg
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                    {!encountersData?.results.some(
                      (e) => e.vitals || e.blood_pressure
                    ) && (
                      <p className="text-center text-gray-500 py-8">
                        No vital signs recorded yet
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No Patient Selected
              </h3>
              <p className="text-gray-600">
                Select a patient from the list to view their medical records
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientPortalPage;
