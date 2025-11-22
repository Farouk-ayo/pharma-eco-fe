import React from "react";
import { AlertTriangle, Info } from "lucide-react";

interface DrugInteraction {
  id: number;
  patient_name: string;
  unique_id: string;
  drug_a: string;
  drug_b: string;
  severity: "major" | "moderate" | "minor" | "unknown";
  reason: string;
  created_at: string;
}

interface InteractionCardProps {
  interaction: DrugInteraction;
}

const severityConfig = {
  major: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-900",
    badge: "bg-red-100 text-red-700 border-red-300",
    icon: <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-red-600" />,
  },
  moderate: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-900",
    badge: "bg-orange-100 text-orange-700 border-orange-300",
    icon: <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />,
  },
  minor: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-900",
    badge: "bg-yellow-100 text-yellow-700 border-yellow-300",
    icon: <Info className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-600" />,
  },
  unknown: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-900",
    badge: "bg-gray-100 text-gray-700 border-gray-300",
    icon: <Info className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />,
  },
};

export const InteractionCard: React.FC<InteractionCardProps> = ({
  interaction,
}) => {
  const config = severityConfig[interaction.severity];
  console.log(interaction);

  return (
    <div
      className={`border-2 ${config.border} ${config.bg} rounded-lg p-4 lg:p-5 transition-all hover:shadow-md`}
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 lg:gap-0 mb-4">
        <div className="flex items-center gap-2 lg:gap-3">
          {config.icon}
          <div className="min-w-0">
            <p className="font-bold text-sm lg:text-base text-gray-900 break-words">
              {interaction.drug_a} ↔️ {interaction.drug_b}
            </p>
            <p className="text-xs lg:text-sm text-gray-600 truncate">
              Patient: {interaction.patient_name} • {interaction.unique_id}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${config.badge} flex-shrink-0 self-start`}
        >
          {interaction.severity}
        </span>
      </div>

      <div className={`p-3 lg:p-4 bg-white rounded-lg border ${config.border}`}>
        <p className="text-xs font-semibold text-gray-600 mb-2">
          Interaction Details:
        </p>
        <p className={`text-xs lg:text-sm ${config.text}`}>
          {interaction.reason}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 lg:gap-0 mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Detected:{" "}
          {new Date(interaction.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <button className="text-xs lg:text-sm text-primary hover:text-primaryDark font-medium self-start lg:self-auto">
          View Full Report →
        </button>
      </div>
    </div>
  );
};
