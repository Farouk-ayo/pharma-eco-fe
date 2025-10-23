"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { StepTwoInputs, stepTwoSchema } from "@/lib/validation";
import { nigeriaStates } from "@/lib/data/nigeria-states-lga";
import Button from "@/components/buttons";
import { ArrowLeftIcon } from "lucide-react";
import Select from "react-select";

interface StepTwoProps {
  onNext: (data: StepTwoInputs) => void;
  onBack: () => void;
  defaultValues?: Partial<StepTwoInputs>;
  isLoading?: boolean;
}

interface SelectOption {
  value: string;
  label: string;
}

export const customStyles = {
  control: (base: any) => ({
    ...base,
    padding: "2px",
    borderRadius: "6px",
    borderColor: "#E5E7EB",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#D1D5DB",
    },
    minHeight: "42px",
    scrollbarWidth: "thin",
    scrollbarColor: "#e5e7eb #e5e7eb",
  }),
  option: (base: any, state: { isSelected: boolean }) => ({
    ...base,
    backgroundColor: state.isSelected ? "#157D18" : "white",
    "&:hover": {
      backgroundColor: state.isSelected ? "#157D18" : "#f3f4f6",
    },
  }),
};

const StepTwoForm = ({
  onNext,
  onBack,
  defaultValues,
  isLoading,
}: StepTwoProps) => {
  const [availableLGAs, setAvailableLGAs] = useState<SelectOption[]>([]);

  // Format states for react-select using names instead of IDs
  const stateOptions: SelectOption[] = nigeriaStates.map((state) => ({
    value: state.state.name,
    label: state.state.name,
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<StepTwoInputs>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues,
  });

  const selectedState = watch("State");

  useEffect(() => {
    if (selectedState) {
      const selected = nigeriaStates.find(
        (state) => state.state.name === selectedState
      );
      if (selected) {
        const lgaOptions = selected.state.locals.map((lga) => ({
          value: lga.name,
          label: lga.name,
        }));
        setAvailableLGAs(lgaOptions);
      }
    }
  }, [selectedState]);

  useEffect(() => {
    if (defaultValues?.State) {
      const selected = nigeriaStates.find(
        (state) => state.state.name === defaultValues.State
      );
      if (selected) {
        const lgaOptions = selected.state.locals.map((lga) => ({
          value: lga.name,
          label: lga.name,
        }));
        setAvailableLGAs(lgaOptions);
      }
    }
  }, [defaultValues]);

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div className="w-full">
        <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
          Pharmacy Name
        </label>
        <input
          {...register("organizationName")}
          placeholder="Enter business name"
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {errors.organizationName && (
          <span className="text-sm text-red-500">
            {errors.organizationName.message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
            Pharmacy Address/City
          </label>
          <input
            {...register("City")}
            placeholder="Enter business address"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {errors.City && (
            <span className="text-sm text-red-500">{errors.City.message}</span>
          )}
        </div>
        <div>
          <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
            Pharmacy State
          </label>
          <Controller
            name="State"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={stateOptions}
                placeholder="Select State"
                styles={customStyles}
                value={
                  stateOptions.find((option) => option.value === field.value) ||
                  null
                }
                onChange={(option) => field.onChange(option?.value)}
              />
            )}
          />
          {errors.State && (
            <span className="text-sm text-red-500">{errors.State.message}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
            Pharmacy Local Govt
          </label>
          <Controller
            name="localGovt"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={availableLGAs}
                isDisabled={!selectedState}
                placeholder="Select LGA"
                styles={customStyles}
                value={
                  availableLGAs.find(
                    (option) => option.value === field.value
                  ) || null
                }
                onChange={(option) => field.onChange(option?.value)}
              />
            )}
          />
          {errors.localGovt && (
            <span className="text-sm text-red-500">
              {errors.localGovt.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
            Pharmacy Zip Code (optional)
          </label>
          <input
            {...register("zipCode")}
            type="text"
            pattern="\d*"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
            placeholder="Enter zip code"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {errors.zipCode && (
            <span className="text-sm text-red-500">
              {errors.zipCode.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
          Others (What do you want to dispose? Any special time?)
        </label>
        <textarea
          {...register("Others")}
          className="w-full p-2 border rounded-md resize-none"
          rows={3}
          placeholder="Enter other details"
        />
      </div>

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          isDisabled={isSubmitting}
          isLoading={isLoading}
          className="text-white w-full"
        >
          Submit
        </Button>
        <Button
          onClick={onBack}
          className="w-full flex items-center gap-2 justify-center text-primaryDark border-none bg-transparent"
        >
          <ArrowLeftIcon /> Back
        </Button>
      </div>
    </form>
  );
};

export default StepTwoForm;
