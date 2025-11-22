import React from "react";
import Link from "next/link";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  borderColor: string;
  href: string;
}

export const SystemModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  bgColor,
  textColor,
  borderColor,
  href,
}) => {
  return (
    <Link href={href}>
      <div
        className={`${bgColor} ${borderColor} border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer h-full`}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div>
            <h3 className={`text-lg font-bold ${textColor} mb-2`}>{title}</h3>
            <p className={`text-sm ${textColor} opacity-90`}>{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const SystemModuleCardSkeleton = () => {
  return (
    <div className="bg-gray-200 rounded-2xl p-6 animate-pulse h-full">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};
