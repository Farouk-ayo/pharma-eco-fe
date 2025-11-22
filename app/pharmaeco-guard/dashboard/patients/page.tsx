"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/buttons";
import { Calendar, Sparkles, User, X } from "lucide-react";
import { useDorraPatients } from "@/lib/api/dorraQueries";
import {
  useDorraAICreatePatient,
  useDorraCreatePatient,
} from "@/lib/api/dorraMutations";

// Validation schema matching Dorra API
const patientSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  age: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  address: z.string().optional(),
  phone_number: z.string().min(10, "Valid phone number required").optional(),
  email: z.string().email("Valid email required").optional(),
  allergies: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

const PatientRegistrationPage = () => {
  const [useAI, setUseAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showForm, setShowForm] = useState(false);

  const createPatientMutation = useDorraCreatePatient();
  const aiCreatePatientMutation = useDorraAICreatePatient();
  const { data: patientsData } = useDorraPatients();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit = (data: PatientFormData) => {
    const payload = {
      ...data,
      allergies: data.allergies
        ? data.allergies.split(",").map((a) => a.trim())
        : [],
    };

    createPatientMutation.mutate(payload, {
      onSuccess: () => {
        reset();
        setShowForm(false);
      },
    });
  };

  const handleAISubmit = () => {
    if (!aiPrompt.trim()) return;

    aiCreatePatientMutation.mutate(aiPrompt, {
      onSuccess: () => {
        setAiPrompt("");
        setUseAI(false);
      },
    });
  };

  // Generate Patient ID
  const generatePatientId = () => {
    const count = patientsData?.count || 0;
    const timestamp = Date.now().toString().slice(-6);
    return `PAT-${timestamp}-${String(count + 1).padStart(3, "0")}`;
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
              Patient Registration
            </h1>
            <p className="text-sm lg:text-base text-gray-600">
              Register a new patient and collect essential information for
              medical records
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primaryDark transition-colors font-semibold flex items-center gap-2"
          >
            <User className="w-5 h-5" />
            New Patient
          </button>
        </div>

        {/* Method Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setUseAI(false)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              !useAI
                ? "bg-primary text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            Standard Form
          </button>
          <button
            onClick={() => setUseAI(true)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              useAI
                ? "bg-primary text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            AI Registration
          </button>
        </div>
      </div>

      {/* AI Registration */}
      {useAI ? (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primaryDark">
                  AI-Powered Patient Registration
                </h3>
                <p className="text-sm text-gray-600">
                  Describe the patient in natural language and Dorra will
                  extract the information
                </p>
              </div>
            </div>

            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Example: Create a patient named John Doe from Surulere Lagos, male, 35 years old, contact: +2348012345678, email: john@email.com, allergic to penicillin, wants to register for pharmaceutical waste collection"
              className="w-full px-6 py-4 border-2 border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white min-h-[150px] text-base resize-none mb-4"
              disabled={aiCreatePatientMutation.isPending}
            />

            <div className="flex gap-4">
              <Button
                variant="primary"
                size="actionBtn"
                onClick={handleAISubmit}
                isDisabled={
                  aiCreatePatientMutation.isPending || !aiPrompt.trim()
                }
                className="flex-1"
              >
                {aiCreatePatientMutation.isPending
                  ? "Creating..."
                  : "Create Patient with AI"}
              </Button>
              <button
                onClick={() => setAiPrompt("")}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Clear
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900 font-medium mb-2">
                💡 Tips for better results:
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Include full name, age or date of birth, and gender</li>
                <li>• Add contact information (phone and/or email)</li>
                <li>• Mention any known allergies</li>
                <li>• Include address or location if available</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Standard Form Modal/Overlay */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <div>
                    <h2 className="text-2xl font-bold text-primaryDark">
                      New Patient Registration
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Fill in the patient details below
                    </p>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                  {/* Patient Identification */}
                  <div className="bg-primaryLight p-6 rounded-xl mb-6">
                    <h3 className="text-lg font-bold text-primary mb-4">
                      Patient Identification
                    </h3>
                    <div className="bg-white p-4 rounded-lg border border-primary/20">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Patient ID
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={generatePatientId()}
                          readOnly
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 font-mono"
                        />
                        <button
                          type="button"
                          className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors text-sm font-medium"
                        >
                          Generate New ID
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Unique patient identifier automatically generated for
                        this registration
                      </p>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-primaryDark mb-4">
                      Personal Information
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Basic patient details and demographics
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-base font-semibold text-gray-600 mb-2">
                          First Name *
                        </label>
                        <input
                          {...register("first_name")}
                          placeholder="Enter first name"
                          className="w-full border border-gray-300 px-4 py-3 h-14 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                        />
                        {errors.first_name && (
                          <span className="text-sm text-red-500 mt-1 block">
                            {errors.first_name.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-base font-semibold text-gray-600 mb-2">
                          Last Name *
                        </label>
                        <input
                          {...register("last_name")}
                          placeholder="Enter last name"
                          className="w-full border border-gray-300 px-4 py-3 h-14 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                        />
                        {errors.last_name && (
                          <span className="text-sm text-red-500 mt-1 block">
                            {errors.last_name.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-base font-semibold text-gray-600 mb-2">
                          Date of Birth
                        </label>
                        <div className="relative">
                          <input
                            {...register("date_of_birth")}
                            type="date"
                            placeholder="mm/dd/yyyy"
                            className="w-full border border-gray-300 px-4 py-3 h-14 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                          />
                          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-base font-semibold text-gray-600 mb-2">
                          Gender
                        </label>
                        <select
                          {...register("gender")}
                          className="w-full border border-gray-300 px-4 py-3 h-14 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-primaryDark mb-4">
                      Contact Information
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Phone, email, and address details
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-base font-semibold text-gray-600 mb-2">
                          Phone Number
                        </label>
                        <input
                          {...register("phone_number")}
                          type="tel"
                          placeholder="(+234)------"
                          className="w-full border border-gray-300 px-4 py-3 h-14 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                        />
                        {errors.phone_number && (
                          <span className="text-sm text-red-500 mt-1 block">
                            {errors.phone_number.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-base font-semibold text-gray-600 mb-2">
                          Email Address
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="Enter email address"
                          className="w-full border border-gray-300 px-4 py-3 h-14 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                        />
                        {errors.email && (
                          <span className="text-sm text-red-500 mt-1 block">
                            {errors.email.message}
                          </span>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-base font-semibold text-gray-600 mb-2">
                          Street Address
                        </label>
                        <input
                          {...register("address")}
                          placeholder="Enter street address"
                          className="w-full border border-gray-300 px-4 py-3 h-14 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-primaryDark mb-4">
                      Initial Medical Information
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Basic medical history and current medications
                    </p>

                    <div>
                      <label className="block text-base font-semibold text-gray-600 mb-2">
                        Known Allergies
                      </label>
                      <textarea
                        {...register("allergies")}
                        placeholder="List known allergies (e.g., medications, foods, environmental...). Separate with commas"
                        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg min-h-[100px] resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Separate multiple allergies with commas
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t">
                    <Button
                      variant="primary"
                      type="submit"
                      size="actionBtn"
                      isDisabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? "Registering..." : "Register Patient"}
                    </Button>
                    <button
                      type="button"
                      onClick={() => {
                        reset();
                        setShowForm(false);
                      }}
                      className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                    >
                      Clear Form
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Show instruction when no form is open */}
          {!showForm && (
            <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No Patient Registration in Progress
              </h3>
              <p className="text-gray-600 mb-6">
                Click &quot;New Patient&quot; button above to start registering
                a new patient
              </p>
            </div>
          )}
        </>
      )}

      {/* Recent Patients Preview */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-primaryDark mb-4">
          Recently Registered Patients
        </h3>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Patient ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Registered
                </th>
              </tr>
            </thead>
            <tbody>
              {patientsData?.results.slice(0, 5).map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-primary font-mono font-semibold">
                    {patient.unique_id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {patient.full_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {patient.phone_number || patient.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(patient.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistrationPage;
