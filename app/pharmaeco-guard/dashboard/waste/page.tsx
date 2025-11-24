/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDorraPatients } from "@/lib/api/dorraQueries";
import { PatientDropdown } from "../components/patientDropdown";
import { Trash2, Gift, TrendingUp } from "lucide-react";

import { toast } from "sonner";
import { dummyUserRewards, dummyWasteData } from "@/lib/data/waste";
import { HowItWorksGuide } from "./components/HowItWorksGuide";
import { DiscountRedemption } from "./components/DiscountRedemption";
import { WasteItemCard } from "./components/WasteItemCard";
import { RewardsDashboard } from "./components/RewardsDashboard";
import { RewardsHistory } from "./components/RewardsHistory";
import { AddWasteModal } from "./components/AddWasteModal";

const WastePage = () => {
  const { control } = useForm();
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"waste" | "rewards" | "history">(
    "waste"
  );
  const [activeFilter, setActiveFilter] = useState<
    "all" | "unused" | "expired" | "damaged"
  >("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const { data: patientsData } = useDorraPatients();
  const selectedPatient = patientsData?.results.find(
    (p) => p.id === selectedPatientId
  );

  // Filter waste by patient and status
  const filteredWaste = dummyWasteData.filter((waste) => {
    if (selectedPatientId && waste.patient_id !== selectedPatientId)
      return false;
    if (activeFilter !== "all" && waste.status !== activeFilter) return false;
    return true;
  });

  // Get user rewards for selected patient
  const userRewards = selectedPatientId
    ? dummyUserRewards[selectedPatientId]
    : null;

  // Calculate stats
  const allCount = dummyWasteData.length;
  const unusedCount = dummyWasteData.filter(
    (w) => w.status === "unused"
  ).length;
  const expiredCount = dummyWasteData.filter(
    (w) => w.status === "expired"
  ).length;
  const damagedCount = dummyWasteData.filter(
    (w) => w.status === "damaged"
  ).length;
  const unverifiedCount = dummyWasteData.filter((w) => !w.verified).length;

  const handleAddWaste = async (data: any) => {
    console.log("Adding waste:", data);
    toast.success(
      "Waste return recorded successfully! Points will be awarded after verification."
    );
    setShowAddModal(false);
  };

  const handleVerify = (wasteId: number) => {
    console.log("Verifying waste:", wasteId);
    toast.success("Waste verified! Points awarded to patient.");
  };

  const handleRedeemDiscount = async (
    purchaseAmount: number,
    discountPercentage: number
  ) => {
    console.log("Redeeming discount:", { purchaseAmount, discountPercentage });
    toast.success(
      `${discountPercentage}% discount applied! You saved ₦${(
        (purchaseAmount * discountPercentage) /
        100
      ).toFixed(2)}`
    );
  };

  return (
    <div className="p-4 lg:p-8 bg-primaryLight min-h-screen">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
          Pharmaceutical Waste Management
        </h1>
        <p className="text-sm lg:text-base text-gray-600">
          Track waste returns and manage patient rewards program
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Panel - Patient Selection & Stats */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            <PatientDropdown
              control={control}
              patientsData={patientsData}
              selectedPatientId={selectedPatientId}
              selectedPatient={selectedPatient}
              setSelectedPatientId={setSelectedPatientId}
              onAddRecord={() => {}}
            />
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            <h3 className="text-lg font-bold text-primaryDark mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              System Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-medium text-gray-700">
                  Total Waste Returned
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {allCount}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="text-sm font-medium text-gray-700">
                  Unused Drugs
                </span>
                <span className="text-lg font-bold text-yellow-600">
                  {unusedCount}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                <span className="text-sm font-medium text-gray-700">
                  Expired Drugs
                </span>
                <span className="text-lg font-bold text-red-600">
                  {expiredCount}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <span className="text-sm font-medium text-gray-700">
                  Damaged
                </span>
                <span className="text-lg font-bold text-orange-600">
                  {damagedCount}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <span className="text-sm font-medium text-gray-700">
                  Pending Verification
                </span>
                <span className="text-lg font-bold text-purple-600">
                  {unverifiedCount}
                </span>
              </div>
            </div>
          </div>

          {/* Eco-Lessons Info */}
          <HowItWorksGuide />

          {/* Discount Redemption - Only show if patient selected and has rewards */}
          {selectedPatientId && userRewards && (
            <DiscountRedemption
              userRewards={userRewards}
              onRedeemDiscount={handleRedeemDiscount}
            />
          )}
        </div>

        {/* Right Panel - Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200">
            {/* Tabs */}
            <div className="my-4 mx-4 rounded-b-[30px] rounded-t-[8px] bg-[#F1F1F1]">
              <div className="flex overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => setActiveTab("waste")}
                  className={`flex items-center gap-2 m-2 px-4 py-3 transition-all whitespace-nowrap rounded-b-[30px] rounded-t-[8px] ${
                    activeTab === "waste"
                      ? "bg-white font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Waste Returns</span>
                </button>
                {selectedPatientId && (
                  <>
                    <button
                      onClick={() => setActiveTab("rewards")}
                      className={`flex items-center gap-2 m-2 px-4 py-3 transition-all whitespace-nowrap rounded-b-[30px] rounded-t-[8px] ${
                        activeTab === "rewards"
                          ? "bg-white font-semibold"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                      <span className="text-sm">Rewards</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("history")}
                      className={`flex items-center gap-2 m-2 px-4 py-3 transition-all whitespace-nowrap rounded-b-[30px] rounded-t-[8px] ${
                        activeTab === "history"
                          ? "bg-white font-semibold"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-sm">History</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4 lg:p-6">
              {activeTab === "waste" && (
                <>
                  {/* Header with Add Button */}
                  <div className="mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-primaryDark">
                          Returned Medicines
                        </h3>
                        <p className="text-xs lg:text-sm text-gray-600 mt-1">
                          Track unused and expired drugs returned from patients
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (!selectedPatientId) {
                            toast.error("Please select a patient first");
                            return;
                          }
                          setShowAddModal(true);
                        }}
                        className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium text-sm whitespace-nowrap flex items-center gap-2"
                      >
                        <span className="text-lg">+</span>
                        Add Waste Return
                      </button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="rounded-b-[30px] rounded-t-[8px] bg-[#F1F1F1]">
                      <div className="flex gap-1 overflow-x-auto hide-scrollbar p-2">
                        <button
                          onClick={() => setActiveFilter("all")}
                          className={`px-4 py-2 rounded-b-[30px] rounded-t-[8px] font-medium text-sm whitespace-nowrap transition-all ${
                            activeFilter === "all"
                              ? "bg-white font-semibold text-gray-900"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          All ({allCount})
                        </button>
                        <button
                          onClick={() => setActiveFilter("unused")}
                          className={`px-4 py-2 rounded-b-[30px] rounded-t-[8px] font-medium text-sm whitespace-nowrap transition-all ${
                            activeFilter === "unused"
                              ? "bg-white font-semibold text-gray-900"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          Unused ({unusedCount})
                        </button>
                        <button
                          onClick={() => setActiveFilter("expired")}
                          className={`px-4 py-2 rounded-b-[30px] rounded-t-[8px] font-medium text-sm whitespace-nowrap transition-all ${
                            activeFilter === "expired"
                              ? "bg-white font-semibold text-gray-900"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          Expired ({expiredCount})
                        </button>
                        <button
                          onClick={() => setActiveFilter("damaged")}
                          className={`px-4 py-2 rounded-b-[30px] rounded-t-[8px] font-medium text-sm whitespace-nowrap transition-all ${
                            activeFilter === "damaged"
                              ? "bg-white font-semibold text-gray-900"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          Damaged ({damagedCount})
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Waste List */}
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {filteredWaste.map((waste) => (
                      <WasteItemCard
                        key={waste.id}
                        waste={waste}
                        onVerify={handleVerify}
                        onViewDetails={(id) => console.log("View details:", id)}
                      />
                    ))}

                    {filteredWaste.length === 0 && (
                      <div className="text-center py-16">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Trash2 className="w-8 h-8 lg:w-10 lg:h-10 text-gray-400" />
                        </div>
                        <h4 className="text-base lg:text-lg font-semibold text-gray-700 mb-2">
                          No Waste Records Found
                        </h4>
                        <p className="text-sm lg:text-base text-gray-600 mb-4">
                          {selectedPatientId
                            ? "This patient hasn't returned any waste yet"
                            : "Select a patient or change filter"}
                        </p>
                        {selectedPatientId && (
                          <button
                            onClick={() => setShowAddModal(true)}
                            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium text-sm"
                          >
                            Record First Return
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeTab === "rewards" && userRewards && (
                <RewardsDashboard userRewards={userRewards} />
              )}

              {activeTab === "history" && userRewards && (
                <RewardsHistory transactions={userRewards.rewards_history} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Waste Modal */}
      {showAddModal && selectedPatient && (
        <AddWasteModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          patientId={selectedPatientId!}
          patientName={selectedPatient.full_name}
          onSubmit={handleAddWaste}
        />
      )}
    </div>
  );
};

export default WastePage;
