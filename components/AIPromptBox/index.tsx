"use client";
import React, { useState, useMemo } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  useDorraAICreatePatient,
  useDorraAIPrompt,
} from "@/lib/api/dorraMutations";
import { useDorraPatients } from "@/lib/api/dorraQueries";
import { customStyles } from "@/app/register/components/stepTwo";

interface AIPromptFormData {
  selectedPatient: number | null;
}

const AIPromptBox = () => {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<"create" | "action">("create");

  const createPatientMutation = useDorraAICreatePatient();
  const aiPromptMutation = useDorraAIPrompt();
  const { data: patientsData } = useDorraPatients();

  const { control, watch } = useForm<AIPromptFormData>({
    defaultValues: {
      selectedPatient: null,
    },
  });

  const selectedPatientId = watch("selectedPatient");

  const patientOptions = useMemo(() => {
    if (!patientsData?.results) return [];

    return patientsData.results.map((patient) => ({
      value: patient.id,
      label: `${patient.first_name} ${patient.last_name} (${patient.unique_id})`,
    }));
  }, [patientsData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    if (mode === "create") {
      createPatientMutation.mutate(prompt, {
        onSuccess: () => {
          setPrompt("");
        },
      });
    } else {
      if (!selectedPatientId) {
        return;
      }
      aiPromptMutation.mutate(
        { prompt, patient: selectedPatientId },
        {
          onSuccess: () => {
            setPrompt("");
          },
        }
      );
    }
  };

  const isLoading =
    createPatientMutation.isPending || aiPromptMutation.isPending;

  const examplePrompts = [
    "Create a patient named John Doe from Surulere Lagos, contact: +2348012345678",
    "Schedule appointment for patient tomorrow at 10am for consultation",
    "Record encounter: patient complains of headache and fever",
  ];

  return (
    <div className="bg-primary/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-primary/20">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="flex-1 w-full">
          <h3 className="text-lg sm:text-xl font-bold text-primaryDark mb-1 sm:mb-2">
            AI Assistant - Dorra EMR
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
            Type a natural language command to create patients, schedule
            appointments, or record encounters.
          </p>

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-3 sm:mb-4">
            <button
              onClick={() => setMode("create")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                mode === "create"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Create Patient
            </button>
            <button
              onClick={() => setMode("action")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                mode === "action"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Patient Actions
            </button>
          </div>

          {/* Patient Selector for Actions */}
          {mode === "action" && (
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm sm:text-base font-semibold text-gray-600 mb-2">
                Select Patient
              </label>
              <Controller
                name="selectedPatient"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={patientOptions}
                    placeholder="Choose a patient..."
                    styles={customStyles}
                    value={
                      patientOptions.find(
                        (option) => option.value === field.value
                      ) || null
                    }
                    onChange={(option) => field.onChange(option?.value)}
                    isSearchable
                    isClearable
                  />
                )}
              />
            </div>
          )}

          {/* Prompt Input */}
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode === "create"
                  ? "E.g., Create a patient named John Doe from Surulere Lagos, contact: +2348012345678..."
                  : "E.g., Schedule appointment for tomorrow at 10am for consultation..."
              }
              className="w-full px-3 sm:px-4 py-3 sm:py-4 pr-12 sm:pr-14 border-2 border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white min-h-[80px] sm:min-h-[100px] text-sm sm:text-base resize-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={
                isLoading ||
                !prompt.trim() ||
                (mode === "action" && !selectedPatientId)
              }
              className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-primaryDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              )}
            </button>
          </form>

          {/* Example Prompts */}
          <div className="mt-3 sm:mt-4">
            <p className="text-xs font-semibold text-gray-600 mb-2">
              Example prompts:
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example)}
                  className="text-[10px] sm:text-xs bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-colors border border-gray-200"
                >
                  {example.slice(0, 50)}...
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPromptBox;
