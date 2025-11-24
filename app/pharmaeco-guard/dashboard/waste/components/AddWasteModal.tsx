
import React, { useState } from "react";
import { X, Package, AlertCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Button from "@/components/buttons";
import { customStyles } from "@/app/register/components/stepTwo";
import {
  WASTE_TYPE_CONFIG,
  calculatePoints,
  calculateCO2Saved,
} from "@/lib/types/waste";

interface AddWasteFormData {
  drug_name: string;
  waste_type: keyof typeof WASTE_TYPE_CONFIG;
  quantity: number;
  status: "unused" | "expired" | "damaged";
  reason: string;
  disposal_notes?: string;
}

interface AddWasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: number;
  patientName: string;
  onSubmit: (data: AddWasteFormData) => Promise<void>;
}

const wasteTypeOptions = Object.entries(WASTE_TYPE_CONFIG).map(
  ([key, config]) => ({
    value: key,
    label: (
      <div className="flex items-center gap-2 py-1">
        <span className="text-lg">{config.icon}</span>
        <div>
          <p className="font-medium text-sm">{config.label}</p>
          <p className="text-xs text-gray-500">{config.description}</p>
        </div>
      </div>
    ),
    searchLabel: config.label,
  })
);

const statusOptions = [
  {
    value: "unused",
    label: "Unused - Patient discontinued medication",
  },
  {
    value: "expired",
    label: "Expired - Medication passed expiry date",
  },
  {
    value: "damaged",
    label: "Damaged - Packaging compromised",
  },
];

export const AddWasteModal: React.FC<AddWasteModalProps> = ({
  isOpen,
  onClose,
  patientName,
  onSubmit,
}) => {
  const [calculatedPoints, setCalculatedPoints] = useState(0);
  const [calculatedCO2, setCalculatedCO2] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddWasteFormData>();

  const wasteType = watch("waste_type");
  const quantity = watch("quantity");

  // Calculate points and CO2 when waste type or quantity changes
  React.useEffect(() => {
    if (wasteType && quantity && quantity > 0) {
      const points = calculatePoints(wasteType, quantity);
      const co2 = calculateCO2Saved(wasteType, quantity);
      setCalculatedPoints(points);
      setCalculatedCO2(co2);
    } else {
      setCalculatedPoints(0);
      setCalculatedCO2(0);
    }
  }, [wasteType, quantity]);

  const handleFormSubmit = async (data: AddWasteFormData) => {
    await onSubmit(data);
    reset();
    setCalculatedPoints(0);
    setCalculatedCO2(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-6 h-6 text-primary" />
              Record Waste Return
            </h2>
            <p className="text-xs lg:text-sm text-gray-600 mt-1">
              Register returned medication waste for {patientName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-4 lg:p-6 space-y-6"
        >
          {/* Rewards Preview */}
          {calculatedPoints > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎁</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-green-900 mb-1">
                    Rewards Preview
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Points to Earn</p>
                      <p className="text-2xl font-bold text-green-600">
                        +{calculatedPoints}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">CO₂ Saved</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {calculatedCO2.toFixed(3)} kg
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Drug Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Drug/Medication Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("drug_name", {
                required: "Drug name is required",
              })}
              placeholder="e.g., Omeprazole 20mg, Amlodipine 10mg"
              className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
            />
            {errors.drug_name && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.drug_name.message}
              </span>
            )}
          </div>

          {/* Waste Type and Quantity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Waste Type <span className="text-red-500">*</span>
              </label>
              <Controller
                name="waste_type"
                control={control}
                rules={{ required: "Waste type is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={wasteTypeOptions}
                    placeholder="Select waste type"
                    styles={customStyles}
                    value={wasteTypeOptions.find(
                      (opt) => opt.value === field.value
                    )}
                    onChange={(option) => field.onChange(option?.value)}
                    filterOption={(option, inputValue) =>
                      option.data.searchLabel
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    }
                  />
                )}
              />
              {errors.waste_type && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.waste_type.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 1, message: "Minimum quantity is 1" },
                  valueAsNumber: true,
                })}
                type="number"
                min="1"
                placeholder="Enter quantity"
                className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
              />
              {errors.quantity && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.quantity.message}
                </span>
              )}
              {wasteType && (
                <p className="text-xs text-gray-500 mt-1">
                  {WASTE_TYPE_CONFIG[wasteType].pointsPerUnit} points per{" "}
                  {WASTE_TYPE_CONFIG[wasteType].unit}
                </p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <Controller
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={statusOptions}
                  placeholder="Select status"
                  styles={customStyles}
                  value={statusOptions.find((opt) => opt.value === field.value)}
                  onChange={(option) => field.onChange(option?.value)}
                />
              )}
            />
            {errors.status && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.status.message}
              </span>
            )}
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Reason for Return <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("reason", {
                required: "Reason is required",
              })}
              placeholder="Why is this medication being returned? (e.g., Patient discontinued after doctor consultation, Switched to different medication, etc.)"
              rows={3}
              className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none rounded-b-[30px] rounded-t-[8px]"
            />
            {errors.reason && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.reason.message}
              </span>
            )}
          </div>

          {/* Disposal Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Disposal/Handling Notes (Optional)
            </label>
            <textarea
              {...register("disposal_notes")}
              placeholder="Additional notes about disposal method, special handling requirements, etc."
              rows={2}
              className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none rounded-b-[30px] rounded-t-[8px]"
            />
          </div>

          {/* Important Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">
                  Important Notice
                </p>
                <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                  <li>
                    All returned waste will be disposed per NAFDAC guidelines
                  </li>
                  <li>Points are awarded after pharmacist verification</li>
                  <li>Rewards can be redeemed on next purchase</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              isDisabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Recording..." : "Record Waste Return"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
