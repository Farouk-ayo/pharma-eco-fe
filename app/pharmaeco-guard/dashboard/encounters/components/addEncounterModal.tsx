import React from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "@/components/buttons";
import { useDorraCreateEncounter } from "@/lib/api/dorraMutations";

interface AddEncounterFormData {
  patient: number;
  consultation_reason: string;
  symptoms: string;
  diagnosis: string;
  medical_history?: string;
  weight?: string;
  height?: string;
  blood_pressure?: string;
  heart_rate?: string;
  temperature?: string;
  note?: string;
  follow_up?: string;
}

interface AddEncounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId?: number;
}

export const AddEncounterModal: React.FC<AddEncounterModalProps> = ({
  isOpen,
  onClose,
  patientId,
}) => {
  const createEncounterMutation = useDorraCreateEncounter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddEncounterFormData>({
    defaultValues: {
      patient: patientId,
    },
  });

  const onSubmit = async (data: AddEncounterFormData) => {
    createEncounterMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-900">
              New Encounter
            </h2>
            <p className="text-xs lg:text-sm text-gray-600">
              Track and manage patient visits
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
          {/* Patient ID and Consultation Reason */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Consultation Reason
              </label>
              <input
                {...register("consultation_reason", {
                  required: "Consultation reason is required",
                })}
                placeholder="Reason for visit"
                className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
              />
              {errors.consultation_reason && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.consultation_reason.message}
                </span>
              )}
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Symptoms
            </label>
            <textarea
              {...register("symptoms", { required: "Symptoms are required" })}
              placeholder="Patient symptoms"
              rows={3}
              className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none rounded-b-[30px] rounded-t-[8px]"
            />
            {errors.symptoms && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.symptoms.message}
              </span>
            )}
          </div>

          {/* Diagnosis */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Diagnosis
            </label>
            <textarea
              {...register("diagnosis", { required: "Diagnosis is required" })}
              placeholder="Clinical diagnosis"
              rows={3}
              className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none rounded-b-[30px] rounded-t-[8px]"
            />
            {errors.diagnosis && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.diagnosis.message}
              </span>
            )}
          </div>

          {/* Vitals Section */}
          <div>
            <h3 className="text-base font-bold text-primaryDark mb-4">
              Vital Signs
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  Weight (kg)
                </label>
                <input
                  {...register("weight")}
                  placeholder="70"
                  className="w-full border px-3 py-2 h-12 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  Height (cm)
                </label>
                <input
                  {...register("height")}
                  placeholder="170"
                  className="w-full border px-3 py-2 h-12 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  BP (mmHg)
                </label>
                <input
                  {...register("blood_pressure")}
                  placeholder="120/80"
                  className="w-full border px-3 py-2 h-12 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  HR (bpm)
                </label>
                <input
                  {...register("heart_rate")}
                  placeholder="72"
                  className="w-full border px-3 py-2 h-12 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  Temp (°F)
                </label>
                <input
                  {...register("temperature")}
                  placeholder="98.6"
                  className="w-full border px-3 py-2 h-12 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                />
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Medical History
            </label>
            <textarea
              {...register("medical_history")}
              placeholder="Relevant medical history"
              rows={2}
              className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none rounded-b-[30px] rounded-t-[8px]"
            />
          </div>

          {/* Clinical Notes and Follow-up */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Clinical Notes
              </label>
              <textarea
                {...register("note")}
                placeholder="Additional notes"
                rows={3}
                className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none rounded-b-[30px] rounded-t-[8px]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Follow-up Instructions
              </label>
              <textarea
                {...register("follow_up")}
                placeholder="Follow-up care instructions"
                rows={3}
                className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none rounded-b-[30px] rounded-t-[8px]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              isDisabled={isSubmitting || createEncounterMutation.isPending}
              className="flex-1"
            >
              {isSubmitting || createEncounterMutation.isPending
                ? "Creating..."
                : "Create Encounter"}
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
