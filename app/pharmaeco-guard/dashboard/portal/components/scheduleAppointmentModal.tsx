import React from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "@/components/buttons";
import { useDorraCreateAppointment } from "@/lib/api/dorraMutations";

interface ScheduleAppointmentFormData {
  patient: number;
  date: string;
  reason: string;
  summary?: string;
  status: "active" | "completed";
}

interface ScheduleAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId?: number;
  patientName?: string;
  patientPhone?: string;
}

export const ScheduleAppointmentModal: React.FC<
  ScheduleAppointmentModalProps
> = ({ isOpen, onClose, patientId, patientName }) => {
  const createAppointmentMutation = useDorraCreateAppointment();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ScheduleAppointmentFormData>({
    defaultValues: {
      patient: patientId,
      status: "active",
    },
  });

  const onSubmit = async (data: ScheduleAppointmentFormData) => {
    createAppointmentMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-900">
              Schedule New Appointment
            </h2>
            <p className="text-xs lg:text-sm text-gray-600">
              {patientName
                ? `Create appointment for ${patientName}`
                : "Create a new appointment for a patient"}
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
          {/* Patient ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Patient ID
            </label>
            <input
              {...register("patient", {
                required: "Patient ID is required",
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Enter patient ID"
              className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
            />
            {errors.patient && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.patient.message}
              </span>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Date & Time
              </label>
              <input
                {...register("date", { required: "Date is required" })}
                type="datetime-local"
                className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
              />
              {errors.date && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.date.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Reason for Appointment
            </label>
            <input
              {...register("reason", {
                required: "Reason is required",
              })}
              placeholder="eg. Follow-up visit, medication review, consultation"
              className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
            />
            {errors.reason && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.reason.message}
              </span>
            )}
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Notes/Summary
            </label>
            <textarea
              {...register("summary")}
              placeholder="Additional notes or special instructions"
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
              isDisabled={isSubmitting || createAppointmentMutation.isPending}
              className="flex-1"
            >
              {isSubmitting || createAppointmentMutation.isPending
                ? "Scheduling..."
                : "Schedule Appointment"}
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
