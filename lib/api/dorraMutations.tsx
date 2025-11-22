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
      if (data.resource === "Appointment") {
        queryClient.invalidateQueries({ queryKey: ["dorra-appointments"] });
        queryClient.invalidateQueries({
          queryKey: ["dorra-patient-appointments"],
        });
      } else if (data.resource === "Encounter") {
        queryClient.invalidateQueries({ queryKey: ["dorra-encounters"] });
        queryClient.invalidateQueries({
          queryKey: ["dorra-patient-encounters"],
        });
        queryClient.invalidateQueries({
          queryKey: ["dorra-drug-interactions"],
        });
      }
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
      last_name?: string;
      age?: string;
      date_of_birth?: string;
      gender?: "Male" | "Female" | "Other";
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

export const useDorraUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-update-appointment"],
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: {
        date?: string;
        reason?: string;
        summary?: string;
        status?: "active" | "completed";
        patient?: number;
      };
    }) => {
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
