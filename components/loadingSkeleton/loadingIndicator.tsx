import Image from "next/image";
import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex-shrink-0 mr-2">
        <div className="bg-green-100 rounded-full p-2 w-10 h-10 flex items-center justify-center">
          <Image
            src="/logo-pharmabin.webp"
            alt="PharmaEco"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div className="bg-[#157D181F] text-textPrimary rounded-lg p-3 max-w-[75%] shadow-sm">
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "200ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "400ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
