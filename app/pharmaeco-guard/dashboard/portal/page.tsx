"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useDorraPatients,
  useDorraPatient,
  useDorraPatientAppointments,
  useDorraPatientEncounters,
} from "@/lib/api/dorraQueries";
import { PatientDropdown } from "../components/patientDropdown";
import { PatientHeader } from "./components/patientHeader";
import { PatientTabs } from "./tabs/patientTab";
import { OverviewTab } from "./tabs/overviewTab";
import { MedicalRecordsTab } from "./tabs/medicalRecordsTab";
import { AppointmentsTab } from "./tabs/appointmentTab";
import { DocumentsTab } from "./tabs/documentsTab";
import { VitalsTab } from "./tabs/vitalsTab";
// import { EmptyState } from "./emptyState";

type TabType = "overview" | "medical" | "appointments" | "documents" | "vitals";

const PatientPortalPage = () => {
  const { control } = useForm();
  const [searchQuery] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const { data: patientsData } = useDorraPatients(searchQuery);
  const { data: selectedPatient } = useDorraPatient(selectedPatientId!);
  const { data: appointmentsData } = useDorraPatientAppointments(
    selectedPatientId!
  );
  const { data: encountersData } = useDorraPatientEncounters(
    selectedPatientId!
  );

  const totalRecords =
    (encountersData?.count || 0) + (appointmentsData?.count || 0);
  const lastVisit = encountersData?.results[0]
    ? new Date(encountersData.results[0].created_at).toLocaleDateString()
    : undefined;

  return (
    <div className="p-4 lg:p-8 bg-primaryLight min-h-screen">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
          Patient Portal
        </h1>
        <p className="text-sm lg:text-base text-gray-600">
          Access and manage patient health information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Sidebar - Patient Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 sticky top-6">
            <PatientDropdown
              control={control}
              patientsData={patientsData}
              selectedPatient={selectedPatient}
              selectedPatientId={selectedPatientId}
              setSelectedPatientId={setSelectedPatientId}
              onAddRecord={() => console.log("Open Add Record Modal")}
            />
          </div>
        </div>

        {/* Right Content - Patient Details */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <div className="rounded-xl shadow-sm">
              {/* Patient Header */}
              <PatientHeader
                patient={selectedPatient}
                lastVisit={lastVisit}
                totalRecords={totalRecords}
              />

              {/* Tabs */}
              <PatientTabs
                activeTab={activeTab}
                onTabChange={(tab) => setActiveTab(tab as TabType)}
              />

              {/* Tab Content */}
              <div className="p-4 lg:p-6">
                {activeTab === "overview" && (
                  <OverviewTab
                    patient={selectedPatient}
                    encounters={encountersData?.results}
                    appointments={appointmentsData?.results}
                  />
                )}

                {activeTab === "medical" && (
                  <MedicalRecordsTab
                    patient={selectedPatient}
                    encounters={encountersData?.results}
                  />
                )}

                {activeTab === "appointments" && (
                  <AppointmentsTab appointments={appointmentsData?.results} />
                )}

                {activeTab === "documents" && <DocumentsTab />}

                {activeTab === "vitals" && (
                  <VitalsTab encounters={encountersData?.results} />
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientPortalPage;
