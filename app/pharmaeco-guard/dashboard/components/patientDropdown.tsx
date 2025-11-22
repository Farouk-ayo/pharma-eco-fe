/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";
import Select from "react-select";
import Button from "@/components/buttons";
import { DorraPatient } from "@/lib/types/dorra";

interface PatientDropdownProps {
  control: any;
  patientsData: any;
  selectedPatientId: number | null;
  selectedPatient?: DorraPatient;
  setSelectedPatientId: (id: number) => void;
  onAddRecord: () => void;
}

const customStyles = {
  control: (base: any) => ({
    ...base,
    padding: "2px",
    borderRadius: "6px",
    borderColor: "#E5E7EB",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#D1D5DB",
    },
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
    minHeight: "64px",
    scrollbarWidth: "thin",
    scrollbarColor: "#e5e7eb #e5e7eb",
  }),
  option: (base: any, state: { isSelected: boolean }) => ({
    ...base,
    backgroundColor: state.isSelected ? "#157D1810" : "white",
    "&:hover": {
      backgroundColor: state.isSelected ? "#157D1810" : "#f3f4f6",
    },
  }),
};

export const PatientDropdown = ({
  control,
  patientsData,
  selectedPatientId,
  selectedPatient,
  setSelectedPatientId,
  onAddRecord,
}: PatientDropdownProps) => {
  const patientOptions =
    patientsData?.results?.map((p: any) => ({
      value: p.id,
      label: (
        <div className="flex items-center gap-3 py-2">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            {p.first_name?.charAt(0)}
            {p.last_name?.charAt(0)}
          </div>

          {/* Name + ID */}
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              {p.last_name} - {p.first_name}
            </p>
            <p className="text-xs text-gray-500 font-mono">ID: {p.unique_id}</p>
          </div>
        </div>
      ),
    })) || [];

  return (
    <div className="bg-white">
      <h3 className="text-lg font-bold text-primaryDark mb-2">Patients</h3>
      <p className="text-sm text-gray-600 mb-4">
        Choose a patient to view their medical history
      </p>

      {/* Dropdown */}
      <Controller
        name="patient"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={patientOptions}
            className="cursor-pointer"
            placeholder="Select patient"
            styles={customStyles}
            value={
              patientOptions.find(
                (opt: { value: number | null }) =>
                  opt.value === selectedPatientId
              ) || null
            }
            onChange={(option: any) => {
              field.onChange(option?.value);
              setSelectedPatientId(option?.value);
            }}
            isClearable
          />
        )}
      />

      {selectedPatient && (
        <div className="space-y-3 mt-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm space-y-2">
              <div>
                <span className="text-gray-600">Patient ID: </span>
                <span className="font-medium text-green-700">
                  {selectedPatient.unique_id}
                </span>
              </div>
              <div>
                <span className="text-gray-600">DOB: </span>
                <span className="font-medium">
                  {selectedPatient.date_of_birth || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Blood Group: </span>
                <span className="font-medium">AB+</span>
              </div>
              <div>
                <span className="text-gray-600">Genotype: </span>
                <span className="font-medium">AA</span>
              </div>
              <div>
                <span className="text-gray-600">Total Records: </span>
                <span className="font-medium">5</span>
              </div>
            </div>
          </div>

          {/* Add Record */}
          <div className="mt-4">
            <Button
              type="button"
              variant="primary"
              className="w-full py-3"
              onClick={onAddRecord}
            >
              + Add Record
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
