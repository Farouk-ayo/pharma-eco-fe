import React from "react";
import { Search } from "lucide-react";

interface InteractionCheckerProps {
  medicationQuery: string;
  onMedicationQueryChange: (value: string) => void;
  onCheckInteractions: () => void;
  disabled: boolean;
}

export const InteractionChecker: React.FC<InteractionCheckerProps> = ({
  medicationQuery,
  onMedicationQueryChange,
  onCheckInteractions,
  disabled,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
      <h3 className="text-base lg:text-lg font-bold text-primaryDark mb-2">
        Interaction Checker
      </h3>
      <p className="text-xs lg:text-sm text-gray-600 mb-4">
        Search for prescription drugs, OTC medications, or herbal supplements
      </p>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Enter multiple medication names"
          value={medicationQuery}
          onChange={(e) => onMedicationQueryChange(e.target.value)}
          className="w-full pl-9 lg:pl-10 pr-4 py-2 lg:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm lg:text-base"
        />
      </div>

      <button
        disabled={disabled}
        onClick={onCheckInteractions}
        className="w-full mt-4 py-2 lg:py-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
      >
        Check Interactions
      </button>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Separate multiple medications with commas
      </p>
    </div>
  );
};
