import React, { useEffect, useState } from "react";

interface DevelopmentPageSkeletonProps {
  title: string;
  description: string;
}

const DevelopmentPageSkeleton: React.FC<DevelopmentPageSkeletonProps> = ({
  title,
  description,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show skeleton for 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-primaryLight p-4 lg:p-8">
        <div className="mb-6 lg:mb-8 animate-pulse">
          <div className="h-8 lg:h-10 bg-gray-300 rounded w-64 mb-2"></div>
          <div className="h-4 lg:h-5 bg-gray-200 rounded w-96"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Panel Skeleton */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
              <div className="h-14 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 animate-pulse">
              <div className="flex justify-between items-center mb-6">
                <div className="h-6 bg-gray-300 rounded w-40"></div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-32 lg:h-40 bg-gray-200 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-primaryLight p-4 lg:p-8">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
          {title}
        </h1>
        <p className="text-sm lg:text-base text-gray-600">{description}</p>
      </div>

      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 lg:w-12 lg:h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
            Development In Progress
          </h2>
          <p className="text-sm lg:text-base text-gray-600 mb-4">
            This feature is currently under development and will be available
            soon.
          </p>
          <p className="text-xs text-gray-500">
            Check back later for updates or contact support for more
            information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentPageSkeleton;
