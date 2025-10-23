"use client";
import React, { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useGetRegisterUsers } from "@/lib/hooks/api/queries";
import { nigeriaStates } from "@/lib/data/nigeria-states-lga";
import LoadingSkeleton from "@/components/loadingSkeleton";
import Button from "@/components/buttons";

const PharmacyDirectory = () => {
  const { data: pharmacies = [], isLoading } = useGetRegisterUsers();
  const [selectedState, setSelectedState] = useState("Osun State");
  const [selectedArea, setSelectedArea] = useState<string>("Ife Central");
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [localAreas, setLocalAreas] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsStateDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const stateData = nigeriaStates.find(
      (state) => state.state.name === selectedState
    );
    if (stateData) {
      const areaNames = stateData.state.locals.map((local) => local.name);
      setLocalAreas(areaNames);

      const hasIfeCentral = areaNames.includes("Ife Central");
      if (hasIfeCentral) {
        setSelectedArea("Ife Central");
      } else {
        setSelectedArea(areaNames[0] || "");
      }
    }
  }, [selectedState]);

  const filteredPharmacies = pharmacies.filter(
    (pharmacy) =>
      pharmacy.State === selectedState && pharmacy.localGovt === selectedArea
  );

  return (
    <div className="mx-auto px-4 lg:px-28 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div
          className="flex flex-col sm:flex-row md:items-center gap-5 justify-center mx-auto relative"
          ref={dropdownRef}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Discover PharmaBin Collection Point In
          </h1>
          <div className="">
            <Button
              variant="primary"
              onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
              className="bg-primary relative text-white px-4 py-2 rounded-md flex text-left md:items-center gap-2  "
            >
              {selectedState}
              <ChevronDown size={20} />
            </Button>

            {/* Updated Dropdown */}
            {isStateDropdownOpen && (
              <div className="absolute left-0 md:right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                <div className="py-1">
                  {nigeriaStates.map((state) => (
                    <button
                      key={state.state.name}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm"
                      onClick={() => {
                        setSelectedState(state.state.name);
                        setIsStateDropdownOpen(false);
                      }}
                    >
                      {state.state.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        style={{
          backgroundImage: "url(./bg-community.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-transparent p-4 rounded-lg border">
            <h2 className="font-semibold mb-4 text-xl border-b md:text-2xl">
              Local Governments
            </h2>
            <nav className="space-y-1 ">
              {localAreas.map((areaName) => (
                <button
                  key={areaName}
                  onClick={() => setSelectedArea(areaName)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedArea === areaName
                      ? "bg-green-100 text-primary font-bold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {areaName}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Pharmacy Listings */}
        <div className="lg:col-span-3 ">
          {isLoading ? (
            <LoadingSkeleton />
          ) : filteredPharmacies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredPharmacies.map((pharmacy) => (
                <div
                  key={pharmacy._id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-primbg-primary mb-2 text-xl">
                    {pharmacy.organizationName}
                  </h3>
                  <div className="space-y-2 text-base">
                    <div className="flex items-start gap-2">
                      <p className="text-gray-600">{pharmacy.City}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600  ">
                        <span className="font-semibold"> Phone No:</span>{" "}
                        <span> {pharmacy.phoneNumber}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600 ">
                        <span className="font-semibold"> Email:</span>{" "}
                        <span>{pharmacy.emailAddress}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No pharmacies found for this selection.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyDirectory;
