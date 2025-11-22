/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dorraAxiosInstance from "@/services/dorraAxiosInstance";
import { showToast } from "@/lib/util";
import { AIPromptResponse, AIPatientResponse } from "@/lib/types/dorra";

// AI MUTATIONS

export const useDorraAIPrompt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-ai-prompt"],
    mutationFn: async (data: { prompt: string; patient: number }) => {
      const response = await dorraAxiosInstance.post("/v1/ai/emr", data);
      return response.data as AIPromptResponse;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dorra-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["dorra-encounters"] });
      queryClient.invalidateQueries({
        queryKey: ["dorra-patient-appointments"],
      });
      queryClient.invalidateQueries({ queryKey: ["dorra-patient-encounters"] });
      showToast.success(data.message);
    },
    onError: (error: any) => {
      showToast.error(error.response?.data?.message || "AI prompt failed");
    },
  });
};

export const useDorraAICreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-ai-create-patient"],
    mutationFn: async (prompt: string) => {
      const response = await dorraAxiosInstance.post("/v1/ai/patient", {
        prompt,
      });
      return response.data as AIPatientResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dorra-patients"] });
      showToast.success("Patient created successfully via AI");
    },
    onError: (error: any) => {
      showToast.error(
        error.response?.data?.message || "Failed to create patient"
      );
    },
  });
};

// PATIENT MUTATIONS

export const useDorraCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-create-patient"],
    mutationFn: async (data: {
      first_name: string;
      last_name: string;
      age?: string;
      date_of_birth?: string;
      gender?: "Male" | "Female" | "Other" | undefined;
      address?: string;
      phone_number?: string;
      email?: string;
      allergies?: string[];
    }) => {
      const response = await dorraAxiosInstance.post(
        "/v1/patients/create",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dorra-patients"] });
      showToast.success("Patient created successfully");
    },
    onError: (error: any) => {
      showToast.error(
        error.response?.data?.message || "Failed to create patient"
      );
    },
  });
};

export const useDorraUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-update-patient"],
    mutationFn: async ({ id, data }: { id: number; data: Partial<any> }) => {
      const response = await dorraAxiosInstance.patch(
        `/v1/patients/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dorra-patients"] });
      queryClient.invalidateQueries({
        queryKey: ["dorra-patient", variables.id],
      });
      showToast.success("Patient updated successfully");
    },
    onError: (error: any) => {
      showToast.error(
        error.response?.data?.message || "Failed to update patient"
      );
    },
  });
};

export const useDorraDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-delete-patient"],
    mutationFn: async (id: number) => {
      const response = await dorraAxiosInstance.delete(`/v1/patients/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dorra-patients"] });
      showToast.success("Patient deleted successfully");
    },
    onError: (error: any) => {
      showToast.error(
        error.response?.data?.message || "Failed to delete patient"
      );
    },
  });
};

// APPOINTMENT MUTATIONS

export const useDorraCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-create-appointment"],
    mutationFn: async (data: {
      patient: number;
      date: string;
      reason?: string;
      summary?: string;
      status?: "active" | "completed";
    }) => {
      const response = await dorraAxiosInstance.post("/v1/appointments", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dorra-appointments"] });
      queryClient.invalidateQueries({
        queryKey: ["dorra-patient-appointments"],
      });
      showToast.success("Appointment created successfully");
    },
    onError: (error: any) => {
      showToast.error(
        error.response?.data?.message || "Failed to create appointment"
      );
    },
  });
};

export const useDorraUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-update-appointment"],
    mutationFn: async ({ id, data }: { id: number; data: Partial<any> }) => {
      const response = await dorraAxiosInstance.patch(
        `/v1/appointments/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dorra-appointments"] });
      queryClient.invalidateQueries({
        queryKey: ["dorra-appointment", variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["dorra-patient-appointments"],
      });
      showToast.success("Appointment updated successfully");
    },
    onError: (error: any) => {
      showToast.error(
        error.response?.data?.message || "Failed to update appointment"
      );
    },
  });
};

export const useDorraDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-delete-appointment"],
    mutationFn: async (id: number) => {
      const response = await dorraAxiosInstance.delete(
        `/v1/appointments/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dorra-appointments"] });
      queryClient.invalidateQueries({
        queryKey: ["dorra-patient-appointments"],
      });
      showToast.success("Appointment deleted successfully");
    },
    onError: (error: any) => {
      showToast.error(
        error.response?.data?.message || "Failed to delete appointment"
      );
    },
  });
};

// ENCOUNTER MUTATIONS

export const useDorraCreateEncounter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-create-encounter"],
    mutationFn: async (data: {
      patient: number;
      consultation_reason: string;
      symptoms: string;
      diagnosis: string;
      medical_history?: string;
      weight?: string;
      height?: string;
      bmi?: string;
      blood_pressure?: string;
      heart_rate?: string;
      temperature?: string;
      note?: string;
      summary?: string;
      follow_up?: string;
      medications?: any;
      tests?: any;
      vitals?: any;
    }) => {
      const response = await dorraAxiosInstance.post("/v1/encounters", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dorra-encounters"] });
      queryClient.invalidateQueries({ queryKey: ["dorra-patient-encounters"] });
      queryClient.invalidateQueries({ queryKey: ["dorra-drug-interactions"] });
      showToast.success("Encounter created successfully");
    },
    onError: (error: any) => {
      showToast.error(
        error.response?.data?.message || "Failed to create encounter"
      );
    },
  });
};

export const useDorraUpdateEncounter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-update-encounter"],
    mutationFn: async ({ id, data }: { id: number; data: Partial<any> }) => {
      const response = await dorraAxiosInstance.patch(
        `/v1/encounters/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dorra-encounters"] });
      queryClient.invalidateQueries({
        queryKey: ["dorra-encounter", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["dorra-patient-encounters"] });
      showToast.success("Encounter updated successfully");
    },
    onError: (error: any) => {
      showToast.error(
        error.response?.data?.message || "Failed to update encounter"
      );
    },
  });
};

export const useDorraDeleteEncounter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-delete-encounter"],
    mutationFn: async (id: number) => {
      const response = await dorraAxiosInstance.delete(`/v1/encounters/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dorra-encounters"] });
      queryClient.invalidateQueries({ queryKey: ["dorra-patient-encounters"] });
      showToast.success("Encounter deleted successfully");
    },
    onError: (error: any) => {
      showToast.error(
        error.response?.data?.message || "Failed to delete encounter"
      );
    },
  });
};

// MEDICAL RECORD MUTATIONS

export const useDorraCreateMedication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-create-medication"],
    mutationFn: async (data: {
      patient: number;
      encounter?: number;
      name: string;
      dosage: string;
      frequency: string;
      start_date: string;
      end_date?: string;
      duration?: string;
    }) => {
      const response = await dorraAxiosInstance.post("/v1/medications", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dorra-patient-medications"],
      });
      queryClient.invalidateQueries({ queryKey: ["dorra-encounters"] });
      showToast.success("Medication added successfully");
    },
    onError: (error: any) => {
      showToast.error(
        error.response?.data?.message || "Failed to add medication"
      );
    },
  });
};

export const useDorraCreateTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-create-test"],
    mutationFn: async (data: {
      patient: number;
      encounter?: number;
      name: string;
      result?: string;
    }) => {
      const response = await dorraAxiosInstance.post("/v1/tests", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dorra-patient-tests"] });
      queryClient.invalidateQueries({ queryKey: ["dorra-encounters"] });
      showToast.success("Test added successfully");
    },
    onError: (error: any) => {
      showToast.error(error.response?.data?.message || "Failed to add test");
    },
  });
};

// PHARMAVIGILANCE MUTATIONS

export const useDorraRegisterWebhook = () => {
  return useMutation({
    mutationKey: ["dorra-register-webhook"],
    mutationFn: async (data: { url: string }) => {
      const response = await dorraAxiosInstance.post("/v1/auth/webhook", data);
      return response.data;
    },
    onSuccess: () => {
      showToast.success("Webhook registered successfully");
    },
    onError: (error: any) => {
      showToast.error(
        error.response?.data?.message || "Failed to register webhook"
      );
    },
  });
};

export const useDorraTestWebhook = () => {
  return useMutation({
    mutationKey: ["dorra-test-webhook"],
    mutationFn: async (data: { url: string }) => {
      const response = await dorraAxiosInstance.post(
        "/v1/auth/webhook/test",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      showToast.success("Test webhook sent successfully");
    },
    onError: (error: any) => {
      showToast.error(
        error.response?.data?.message || "Failed to send test webhook"
      );
    },
  });
};
