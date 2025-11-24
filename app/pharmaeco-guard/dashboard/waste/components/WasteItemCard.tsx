import React from "react";
import { Package, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { WasteItem, WASTE_TYPE_CONFIG } from "@/lib/types/waste";

interface WasteItemCardProps {
  waste: WasteItem;
  onVerify?: (wasteId: number) => void;
  onViewDetails?: (wasteId: number) => void;
}

export const WasteItemCard: React.FC<WasteItemCardProps> = ({
  waste,
  onVerify,
  onViewDetails,
}) => {
  const wasteConfig = WASTE_TYPE_CONFIG[waste.waste_type];

  const getStatusConfig = () => {
    switch (waste.status) {
      case "expired":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          iconBg: "bg-red-100",
          icon: (
            <AlertTriangle className="w-5 h-5 lg:w-6 lg:h-6 text-red-600" />
          ),
          badge: "bg-red-100 text-red-700 border-red-300",
          label: "Expired",
        };
      case "damaged":
        return {
          bg: "bg-orange-50",
          border: "border-orange-200",
          iconBg: "bg-orange-100",
          icon: (
            <AlertTriangle className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
          ),
          badge: "bg-orange-100 text-orange-700 border-orange-300",
          label: "Damaged",
        };
      default:
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          iconBg: "bg-yellow-100",
          icon: <Package className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />,
          badge: "bg-yellow-100 text-yellow-700 border-yellow-300",
          label: "Unused",
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div
      className={`border-2 rounded-lg p-4 lg:p-5 transition-all hover:shadow-md ${statusConfig.bg} ${statusConfig.border}`}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${statusConfig.iconBg}`}
          >
            {statusConfig.icon}
          </div>
          <div>
            <p className="font-bold text-sm lg:text-base text-gray-900">
              {waste.drug_name}
            </p>
            <p className="text-xs text-gray-600">
              {waste.patient_name} • {waste.unique_id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.badge} flex-shrink-0`}
          >
            {statusConfig.label}
          </span>
          {waste.verified ? (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Pending
            </span>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <div className="bg-white/50 rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Waste Type</p>
          <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
            <span className="text-base">{wasteConfig.icon}</span>
            {wasteConfig.label}
          </p>
        </div>

        <div className="bg-white/50 rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Quantity</p>
          <p className="text-sm font-semibold text-gray-900">
            {waste.quantity}
          </p>
        </div>

        <div className="bg-white/50 rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Points Earned</p>
          <p className="text-lg font-bold text-green-600">
            +{waste.points_earned}
          </p>
        </div>

        <div className="bg-white/50 rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Date Returned</p>
          <p className="text-sm font-semibold text-gray-900">
            {new Date(waste.date_returned).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Reason */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-600 mb-1">
          Reason for Return:
        </p>
        <p className="text-sm text-gray-900">{waste.reason}</p>
      </div>

      {/* Environmental Impact */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">🌱</span>
          <p className="text-xs font-semibold text-green-900">
            Environmental Impact
          </p>
        </div>
        <p className="text-sm text-green-800">
          CO₂ Saved:{" "}
          <strong>
            {(wasteConfig.co2SavedKg * waste.quantity_numeric).toFixed(3)} kg
          </strong>
        </p>
      </div>

      {/* Verification Info */}
      {waste.verified && waste.verified_by && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-xs font-semibold text-blue-900 mb-1">
            Verification Details
          </p>
          <p className="text-sm text-blue-800">
            Verified by: <strong>{waste.verified_by}</strong>
          </p>
          {waste.verified_at && (
            <p className="text-xs text-blue-700 mt-1">
              {new Date(waste.verified_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={() => onViewDetails?.(waste.id)}
          className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          View Details
        </button>
        {!waste.verified && onVerify && (
          <button
            onClick={() => onVerify(waste.id)}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Verify & Award Points
          </button>
        )}
      </div>
    </div>
  );
};
