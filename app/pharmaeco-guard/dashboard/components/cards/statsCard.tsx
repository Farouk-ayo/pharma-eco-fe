import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  iconBgColor: string;
}

export const StatCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendUp,
  iconBgColor,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-2xl lg:text-3xl font-bold text-primaryDark mb-2">
            {value}
          </h3>
          <p className="text-sm lg:text-base text-gray-600 font-medium mb-3">
            {title}
          </p>
          <div className="flex items-center gap-1">
            <span
              className={`text-xs font-medium ${
                trendUp ? "text-green-600" : "text-red-600"
              }`}
            >
              {trendUp ? "↑" : "↓"} {trend}
            </span>
          </div>
        </div>
        <div
          className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center ${iconBgColor}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
