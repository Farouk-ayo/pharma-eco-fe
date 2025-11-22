"use client";
import React, { useState } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import {
  useDorraAICreatePatient,
  useDorraAIPrompt,
} from "@/lib/api/dorraMutations";

const AIPromptBox = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );
  const [mode, setMode] = useState<"create" | "action">("create");

  const createPatientMutation = useDorraAICreatePatient();
  const aiPromptMutation = useDorraAIPrompt();

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
    "Create a patient named John Doe from Surulere Lagos, contact: +2348012345678, wants to register for pharmaceutical waste collection",
    "Schedule appointment for patient ID 286 tomorrow at 10am for consultation",
    "Record encounter: patient complains of headache and fever, prescribed Paracetamol 500mg",
  ];

  return (
    <div className="bg-gradient-to-r from-primary/10 to-purple-100 rounded-2xl p-6 lg:p-8 mb-8 border border-primary/20">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-primaryDark mb-2">
            AI Assistant - Dorra EMR
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Type a natural language command to create patients, schedule
            appointments, or record encounters. Dorra will understand and
            execute your request.
          </p>

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setMode("create")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "create"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Create Patient
            </button>
            <button
              onClick={() => setMode("action")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "action"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Patient Actions
            </button>
          </div>

          {/* Patient ID Input for Actions */}
          {mode === "action" && (
            <input
              type="text"
              placeholder="Enter Patient ID"
              value={selectedPatientId || ""}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            />
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
              className="w-full px-4 py-4 pr-14 border-2 border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white min-h-[100px] text-base resize-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={
                isLoading ||
                !prompt.trim() ||
                (mode === "action" && !selectedPatientId)
              }
              className="absolute bottom-4 right-4 w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-primaryDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Send className="w-5 h-5 text-white" />
              )}
            </button>
          </form>

          {/* Example Prompts */}
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-600 mb-2">
              Example prompts:
            </p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example)}
                  className="text-xs bg-white px-3 py-1.5 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-colors border border-gray-200"
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
