import React from "react";
import { Upload } from "lucide-react";

export const DocumentsTab: React.FC = () => {
  return (
    <div className="text-center py-12 lg:py-16">
      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Upload className="w-8 h-8 lg:w-10 lg:h-10 text-gray-400" />
      </div>
      <h4 className="text-lg font-semibold text-gray-700 mb-2">
        No Documents Available
      </h4>
      <p className="text-gray-600 mb-6">Document management coming soon</p>
      <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium">
        Upload Document
      </button>
    </div>
  );
};
