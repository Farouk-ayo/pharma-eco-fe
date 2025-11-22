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
import { EmptyState } from "./emptyState";

type TabType = "overview" | "medical" | "appointments" | "documents" | "vitals";

const PatientHeaderSkeleton = () => (
  <div className="p-4 lg:p-4 bg-white rounded-md animate-pulse">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-200 rounded-full"></div>
      <div className="flex-1">
        <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-40"></div>
      </div>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  </div>
);

const TabContentSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
    ))}
  </div>
);

const PatientPortalPage = () => {
  const { control } = useForm();
  const [searchQuery] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const { data: patientsData, isLoading: patientsLoading } =
    useDorraPatients(searchQuery);
  const { data: selectedPatient, isLoading: patientLoading } = useDorraPatient(
    selectedPatientId!
  );
  const { data: appointmentsData, isLoading: appointmentsLoading } =
    useDorraPatientAppointments(selectedPatientId!);
  const { data: encountersData, isLoading: encountersLoading } =
    useDorraPatientEncounters(selectedPatientId!);

  const totalRecords =
    (encountersData?.count || 0) + (appointmentsData?.count || 0);
  const lastVisit = encountersData?.results[0]
    ? new Date(encountersData.results[0].created_at).toLocaleDateString()
    : undefined;

  const isLoadingPatientData =
    patientLoading || appointmentsLoading || encountersLoading;

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
            {patientsLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <PatientDropdown
                control={control}
                patientsData={patientsData}
                selectedPatient={selectedPatient}
                selectedPatientId={selectedPatientId}
                setSelectedPatientId={setSelectedPatientId}
              />
            )}
          </div>
        </div>

        {/* Right Content - Patient Details */}
        <div className="lg:col-span-2">
          {selectedPatientId ? (
            <div className="rounded-xl shadow-sm">
              {/* Patient Header */}
              {isLoadingPatientData ? (
                <PatientHeaderSkeleton />
              ) : selectedPatient ? (
                <PatientHeader
                  patient={selectedPatient}
                  lastVisit={lastVisit}
                  totalRecords={totalRecords}
                />
              ) : null}

              {/* Tabs */}
              <PatientTabs
                activeTab={activeTab}
                onTabChange={(tab) => setActiveTab(tab as TabType)}
              />

              {/* Tab Content */}
              <div className="p-4 lg:p-6">
                {isLoadingPatientData ? (
                  <TabContentSkeleton />
                ) : selectedPatient ? (
                  <>
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
                      <AppointmentsTab
                        appointments={appointmentsData?.results}
                      />
                    )}

                    {activeTab === "documents" && <DocumentsTab />}

                    {activeTab === "vitals" && (
                      <VitalsTab encounters={encountersData?.results} />
                    )}
                  </>
                ) : null}
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientPortalPage;
