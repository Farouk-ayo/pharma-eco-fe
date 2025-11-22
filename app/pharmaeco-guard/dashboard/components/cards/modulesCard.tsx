import React from "react";
import Link from "next/link";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  href: string;
}

export const ModuleCardSkeleton = () => {
  return (
    <div className="bg-gray-200 rounded-2xl p-6 animate-pulse h-full">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  bgColor,
  textColor,
  href,
}) => {
  return (
    <Link href={href}>
      <div
        className={`${bgColor} border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer h-full`}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div>
            <h3 className={`text-base lg:text-lg font-bold ${textColor} mb-2`}>
              {title}
            </h3>
            <p className={`text-sm ${textColor} opacity-90`}>{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;
