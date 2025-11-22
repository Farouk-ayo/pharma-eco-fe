/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dorraAxiosInstance from "@/services/dorraAxiosInstance";
import { showToast } from "@/lib/util";
import { AIPromptResponse, AIPatientResponse } from "@/lib/types/dorra";

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

export const useDorraCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["dorra-create-patient"],
    mutationFn: async (data: {
      first_name: string;
      last_name: string;
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
      const response = await dorraAxiosInstance.delete(`/v/patients/${id}`);
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
