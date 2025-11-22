import React from "react";
import { CheckCircle } from "lucide-react";

interface EmptyInteractionStateProps {
  hasSelectedPatient: boolean;
}

export const EmptyInteractionState: React.FC<EmptyInteractionStateProps> = ({
  hasSelectedPatient,
}) => {
  return (
    <div className="text-center py-12 lg:py-16">
      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" />
      </div>
      <h4 className="text-base lg:text-lg font-semibold text-gray-700 mb-2">
        No Interactions Detected
      </h4>
      <p className="text-sm lg:text-base text-gray-600 max-w-md mx-auto px-4">
        {hasSelectedPatient
          ? "No drug interactions found for this patient. Continue monitoring medication safety."
          : "Select a patient and enter medications to check for potential interactions"}
      </p>
    </div>
  );
};
