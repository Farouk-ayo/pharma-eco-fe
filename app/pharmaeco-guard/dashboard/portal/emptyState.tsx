import React from "react";
import { Search } from "lucide-react";

export const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-12 lg:p-16 text-center">
      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-10 h-10 lg:w-12 lg:h-12 text-gray-400" />
      </div>
      <h3 className="text-xl lg:text-2xl font-bold text-gray-700 mb-3">
        No Patient Selected
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Select a patient from the list on the left to view their complete
        medical records and health information
      </p>
    </div>
  );
};
