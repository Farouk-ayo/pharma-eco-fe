import React from "react";

const PrescriptionPage = () => {
  return (
    <div className="min-h-screen w-full bg-primaryLight p-4 lg:p-8">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
          E-prescription (E-Rx)
        </h1>
        <p className="text-sm lg:text-base text-gray-600">
          Electronic prescription management system.
        </p>
      </div>

      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl lg:text-2xl font-semibold text-primary mb-2">
            Development In Progress. Check Back Later
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPage;
