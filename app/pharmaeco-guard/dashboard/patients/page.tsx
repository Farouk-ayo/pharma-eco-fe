"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import Button from "@/components/buttons";
import { useDorraPatients, useDorraPatient } from "@/lib/api/dorraQueries";
import {
  useDorraCreatePatient,
  useDorraUpdatePatient,
  useDorraDeletePatient,
} from "@/lib/api/dorraMutations";
import Link from "next/link";
import { customStyles } from "@/app/register/components/stepTwo";
import { PatientFormData, patientSchema } from "@/lib/validation";
import { Pencil, Trash2, X } from "lucide-react";

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const PatientRegistrationPage = () => {
  const [editingPatientId, setEditingPatientId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<number | null>(null);

  const createPatientMutation = useDorraCreatePatient();
  const updatePatientMutation = useDorraUpdatePatient();
  const deletePatientMutation = useDorraDeletePatient();

  const { data: patientsData, isLoading } = useDorraPatients();
  const { data: editingPatient } = useDorraPatient(editingPatientId!);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  // Populate form when editing
  useEffect(() => {
    if (editingPatient && editingPatientId) {
      setValue("first_name", editingPatient.first_name);
      setValue("last_name", editingPatient.last_name);
      setValue("age", editingPatient.age || "");
      setValue("date_of_birth", editingPatient.date_of_birth || "");
      setValue("gender", editingPatient.gender);
      setValue("address", editingPatient.address || "");
      setValue("phone_number", editingPatient.phone_number || "");
      setValue("email", editingPatient.email || "");
      setValue("allergies", editingPatient.allergies?.join(", ") || "");
    }
  }, [editingPatient, editingPatientId, setValue]);

  const onSubmit = (data: PatientFormData) => {
    const payload = {
      ...data,
      allergies: data.allergies
        ? data.allergies.split(",").map((a) => a.trim())
        : [],
    };

    if (editingPatientId) {
      updatePatientMutation.mutate(
        { id: editingPatientId, data: payload },
        {
          onSuccess: () => {
            reset();
            setEditingPatientId(null);
          },
        }
      );
    } else {
      createPatientMutation.mutate(payload, {
        onSuccess: () => {
          reset();
        },
      });
    }
  };

  const handleEdit = (patientId: number) => {
    setEditingPatientId(patientId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingPatientId(null);
    reset();
  };

  const handleDeleteClick = (patientId: number) => {
    setPatientToDelete(patientId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (patientToDelete) {
      deletePatientMutation.mutate(patientToDelete, {
        onSuccess: () => {
          setShowDeleteModal(false);
          setPatientToDelete(null);
          if (editingPatientId === patientToDelete) {
            handleCancelEdit();
          }
        },
      });
    }
  };

  return (
    <div className="p-4 lg:p-8 bg-primaryLight">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
          Patient Registration
        </h1>
        <p className="text-sm lg:text-base text-gray-600">
          {editingPatientId
            ? "Update patient information"
            : "Register a new patient and collect essential information for medical records"}
        </p>
      </div>

      {/* Registration Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8 w-full mb-12">
        {editingPatientId && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Pencil className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold text-blue-900">Editing Patient</p>
                <p className="text-sm text-blue-700">
                  {editingPatient?.full_name} - {editingPatient?.unique_id}
                </p>
              </div>
            </div>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel Edit
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-bold text-primaryDark mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
                  First Name
                </label>
                <input
                  {...register("first_name")}
                  placeholder="Enter first name"
                  className="w-full border px-4 py-2 h-16 rounded-md focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                />
                {errors.first_name && (
                  <span className="text-sm text-red-500 mt-1 block">
                    {errors.first_name.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
                  Last Name
                </label>
                <input
                  {...register("last_name")}
                  placeholder="Enter last name"
                  className="w-full border px-4 py-2 h-16 rounded-md focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                />
                {errors.last_name && (
                  <span className="text-sm text-red-500 mt-1 block">
                    {errors.last_name.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
                  Date of Birth
                </label>
                <input
                  {...register("date_of_birth")}
                  type="date"
                  className="w-full border px-4 py-2 h-16 rounded-md focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                />
              </div>

              <div>
                <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
                  Gender
                </label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={genderOptions}
                      placeholder="Select gender"
                      styles={customStyles}
                      value={
                        genderOptions.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                      onChange={(option) => field.onChange(option?.value)}
                      isClearable
                    />
                  )}
                />
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-600 mb-2">
                  Age
                </label>
                <input
                  {...register("age")}
                  type="number"
                  placeholder="Enter age"
                  className="w-full border px-4 py-2 h-16 rounded-md focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-primaryDark mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  {...register("phone_number")}
                  type="tel"
                  placeholder="(+234)------"
                  className="w-full border px-4 py-2 h-16 rounded-md focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                />
                {errors.phone_number && (
                  <span className="text-sm text-red-500 mt-1 block">
                    {errors.phone_number.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter email address"
                  className="w-full border px-4 py-2 h-16 rounded-md focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                />
                {errors.email && (
                  <span className="text-sm text-red-500 mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
                  Street Address
                </label>
                <input
                  {...register("address")}
                  placeholder="Enter street address"
                  className="w-full border px-4 py-2 h-16 rounded-md focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div>
            <h3 className="text-lg font-bold text-primaryDark mb-4">
              Medical Information
            </h3>
            <div>
              <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
                Known Allergies
              </label>
              <textarea
                {...register("allergies")}
                placeholder="List known allergies (e.g., Penicillin, Peanuts). Separate with commas"
                className="w-full p-2 border resize-none focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
              />
              <p className="text-xs text-gray-500 mt-2">
                Separate multiple allergies with commas
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t w-full">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              isDisabled={isSubmitting}
              className="w-1/2"
            >
              {isSubmitting
                ? editingPatientId
                  ? "Updating..."
                  : "Registering..."
                : editingPatientId
                ? "Update Patient"
                : "Register Patient"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => {
                reset();
                setEditingPatientId(null);
              }}
              className="w-1/2"
            >
              Clear Form
            </Button>
          </div>
        </form>
      </div>

      {/* Recent Patients */}
      <div>
        <h3 className="text-xl font-bold text-primaryDark mb-4">
          Recently Registered Patients ({patientsData?.count || 0})
        </h3>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-xl h-32 animate-pulse"
              ></div>
            ))}
          </div>
        ) : patientsData?.results && patientsData.results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patientsData.results.map((patient) => (
              <div
                key={patient.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {patient.first_name?.charAt(0)}
                      {patient.last_name?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {patient.first_name} {patient.last_name}
                      </h4>
                      <p className="text-xs text-gray-600 font-mono">
                        {patient.unique_id}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  {patient.phone_number && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">📞</span>
                      <span>{patient.phone_number}</span>
                    </div>
                  )}
                  {patient.email && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">📧</span>
                      <span className="truncate">{patient.email}</span>
                    </div>
                  )}
                  {patient.address && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">📍</span>
                      <span className="truncate">{patient.address}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-500 text-xs pt-2 border-t">
                    <span>Registered:</span>
                    <span>
                      {new Date(patient.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/pharmaeco-guard/dashboard/portal?patient=${patient.id}`}
                    className="flex-1 py-2 text-center text-primary font-semibold hover:bg-primaryLight rounded-lg transition-colors"
                  >
                    View Details →
                  </Link>
                  <button
                    onClick={() => handleEdit(patient.id)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    title="Edit Patient"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(patient.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    title="Delete Patient"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No patients registered yet</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Delete Patient
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this patient? All associated
              records will be permanently removed.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPatientToDelete(null);
                }}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletePatientMutation.isPending}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
              >
                {deletePatientMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientRegistrationPage;
