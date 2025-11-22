import React from "react";
import { X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Button from "@/components/buttons";
import { customStyles } from "@/app/register/components/stepTwo";

interface AddRecordFormData {
  record_type: string;
  date: string;
  title: string;
  description: string;
  severity?: string;
  status?: string;
  pharmacist?: string;
  clinical_notes?: string;
}

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
}

const recordTypeOptions = [
  { value: "visit", label: "Visit Summary" },
  { value: "prescription", label: "Prescription" },
  { value: "lab", label: "Lab Results" },
  { value: "imaging", label: "Imaging Report" },
];

const severityOptions = [
  { value: "minor", label: "Minor" },
  { value: "moderate", label: "Moderate" },
  { value: "severe", label: "Severe" },
];

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "in-progress", label: "In Progress" },
];

export const AddRecordModal: React.FC<AddRecordModalProps> = ({
  isOpen,
  onClose,
  patientName,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddRecordFormData>();

  const onSubmit = async (data: AddRecordFormData) => {
    console.log("Adding record:", data);
    // TODO: Implement API call
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-900">
              Add Medical Record
            </h2>
            <p className="text-xs lg:text-sm text-gray-600">
              Add a new medical record for {patientName}
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
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 lg:p-6 space-y-6"
        >
          {/* Record Type and Date */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Record Type
              </label>
              <Controller
                name="record_type"
                control={control}
                rules={{ required: "Record type is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={recordTypeOptions}
                    placeholder="Select type"
                    styles={customStyles}
                    value={recordTypeOptions.find(
                      (opt) => opt.value === field.value
                    )}
                    onChange={(option) => field.onChange(option?.value)}
                  />
                )}
              />
              {errors.record_type && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.record_type.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Date
              </label>
              <input
                {...register("date", { required: "Date is required" })}
                type="date"
                className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
              />
              {errors.date && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.date.message}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="eg. Hypertension, Type 2 Diabetes, HIV/AIDS..."
              className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
            />
            {errors.title && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Detailed description of the condition, procedure, or medication"
              rows={4}
              className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none rounded-b-[30px] rounded-t-[8px]"
            />
            {errors.description && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Severity, Status, Pharmacist */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Severity
              </label>
              <Controller
                name="severity"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={severityOptions}
                    placeholder="Select severity"
                    styles={customStyles}
                    value={severityOptions.find(
                      (opt) => opt.value === field.value
                    )}
                    onChange={(option) => field.onChange(option?.value)}
                    isClearable
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Status
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={statusOptions}
                    placeholder="Select status"
                    styles={customStyles}
                    value={statusOptions.find(
                      (opt) => opt.value === field.value
                    )}
                    onChange={(option) => field.onChange(option?.value)}
                    isClearable
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Pharmacist
              </label>
              <input
                {...register("pharmacist")}
                placeholder="Attending pharmacist"
                className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
              />
            </div>
          </div>

          {/* Clinical Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Clinical Notes
            </label>
            <textarea
              {...register("clinical_notes")}
              placeholder="Additional clinical notes, treatment plans, or observations"
              rows={3}
              className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none rounded-b-[30px] rounded-t-[8px]"
            />
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
              {isSubmitting ? "Adding..." : "Add Medical Record"}
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
