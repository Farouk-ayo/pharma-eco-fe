import React from "react";

interface Tab {
  key: string;
  label: string;
}

interface PatientTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs: Tab[] = [
  {
    key: "overview",
    label: "Overview",
  },
  {
    key: "medical",
    label: "Medical Records",
  },
  {
    key: "appointments",
    label: "Appointments",
  },
  {
    key: "documents",
    label: "Documents",
  },
  { key: "vitals", label: "Vitals" },
];

export const PatientTabs: React.FC<PatientTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="  my-4 rounded-b-[30px] rounded-t-[8px] bg-[#F1F1F1]  ">
      <div className="flex  overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-2 m-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap rounded-b-[30px] rounded-t-[8px] ${
              activeTab === tab.key
                ? "bg-white font-semibold"
                : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
