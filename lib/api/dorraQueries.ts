import { useQuery } from "@tanstack/react-query";
import dorraAxiosInstance from "@/services/dorraAxiosInstance";
import {
  DorraPatient,
  DorraAppointment,
  DorraEncounter,
  DorraPaginatedResponse,
} from "@/lib/types/dorra";

export const useDorraPatients = (search?: string, page?: number) => {
  return useQuery<DorraPaginatedResponse<DorraPatient>>({
    queryKey: ["dorra-patients", search, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (page) params.append("page", page.toString());

      const response = await dorraAxiosInstance.get(
        `/v1/patients?${params.toString()}`
      );
      return response.data;
    },
  });
};

export const useDorraPatient = (id: number) => {
  return useQuery<DorraPatient>({
    queryKey: ["dorra-patient", id],
    queryFn: async () => {
      const response = await dorraAxiosInstance.get(`/v1/patients/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useDorraAppointments = (search?: string, page?: number) => {
  return useQuery<DorraPaginatedResponse<DorraAppointment>>({
    queryKey: ["dorra-appointments", search, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (page) params.append("page", page.toString());

      const response = await dorraAxiosInstance.get(
        `/v1/appointments?${params.toString()}`
      );
      return response.data;
    },
  });
};

export const useDorraEncounters = (search?: string, page?: number) => {
  return useQuery<DorraPaginatedResponse<DorraEncounter>>({
    queryKey: ["dorra-encounters", search, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (page) params.append("page", page.toString());

      const response = await dorraAxiosInstance.get(
        `/v1/encounters?${params.toString()}`
      );
      return response.data;
    },
  });
};

export const useDorraPatientAppointments = (patientId: number) => {
  return useQuery<DorraPaginatedResponse<DorraAppointment>>({
    queryKey: ["dorra-patient-appointments", patientId],
    queryFn: async () => {
      const response = await dorraAxiosInstance.get(
        `/v1/patients/${patientId}/appointments`
      );
      return response.data;
    },
    enabled: !!patientId,
  });
};

export const useDorraPatientEncounters = (patientId: number) => {
  return useQuery<DorraPaginatedResponse<DorraEncounter>>({
    queryKey: ["dorra-patient-encounters", patientId],
    queryFn: async () => {
      const response = await dorraAxiosInstance.get(
        `/v1/patients/${patientId}/encounters`
      );
      return response.data;
    },
    enabled: !!patientId,
  });
};

export const useDorraDrugInteractions = () => {
  return useQuery({
    queryKey: ["dorra-drug-interactions"],
    queryFn: async () => {
      const response = await dorraAxiosInstance.get(
        "/v1/pharmavigilance/interactions"
      );
      return response.data;
    },
  });
};
