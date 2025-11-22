import React from "react";
import { AlertTriangle, Info } from "lucide-react";

const severityConfig = {
  Major: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-900",
    icon: <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-red-600" />,
    description: "Life-threatening. Immediate action required.",
  },
  Moderate: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-900",
    icon: <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />,
    description: "May require therapy adjustment.",
  },
  Minor: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-900",
    icon: <Info className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-600" />,
    description: "Monitor for side effects.",
  },
  Unknown: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-900",
    icon: <Info className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />,
    description: "Details are unknown.",
  },
};

export const SeverityLegend: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 mb-6">
      {Object.entries(severityConfig).map(([severity, config]) => (
        <div
          key={severity}
          className={`p-2 lg:p-3 rounded-lg border-2 ${config.border} ${config.bg}`}
        >
          <div className="flex items-center gap-2 mb-1">
            {config.icon}
            <span className={`text-xs font-bold ${config.text}`}>
              {severity}
            </span>
          </div>
          <p className="text-xs text-gray-600 hidden lg:block">
            {config.description}
          </p>
        </div>
      ))}
    </div>
  );
};
