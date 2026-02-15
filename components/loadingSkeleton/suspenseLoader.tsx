import React from "react";

const SuspenseLoader = () => {
  return (
    <div className="w-full">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-14 bg-gray-200 rounded"></div>
        <div className="h-14 bg-gray-200 rounded"></div>
        <div className="h-14 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SuspenseLoader;
