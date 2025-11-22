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

export const useDorraAppointment = (id: number) => {
  return useQuery<DorraAppointment>({
    queryKey: ["dorra-appointment", id],
    queryFn: async () => {
      const response = await dorraAxiosInstance.get(`/v1/appointments/${id}`);
      return response.data;
    },
    enabled: !!id,
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

export const useDorraEncounter = (id: number) => {
  return useQuery<DorraEncounter>({
    queryKey: ["dorra-encounter", id],
    queryFn: async () => {
      const response = await dorraAxiosInstance.get(`/v1/encounters/${id}`);
      return response.data;
    },
    enabled: !!id,
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

export const useDorraPatientMedications = (
  patientId: number,
  date?: string,
  page?: number
) => {
  return useQuery({
    queryKey: ["dorra-patient-medications", patientId, date, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (date) params.append("created_at__date", date);
      if (page) params.append("page", page.toString());

      const response = await dorraAxiosInstance.get(
        `/v1/patients/${patientId}/medications?${params.toString()}`
      );
      return response.data;
    },
    enabled: !!patientId,
  });
};

export const useDorraPatientTests = (
  patientId: number,
  date?: string,
  page?: number
) => {
  return useQuery({
    queryKey: ["dorra-patient-tests", patientId, date, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (date) params.append("created_at__date", date);
      if (page) params.append("page", page.toString());

      const response = await dorraAxiosInstance.get(
        `/v1/patients/${patientId}/tests?${params.toString()}`
      );
      return response.data;
    },
    enabled: !!patientId,
  });
};

export const useDorraDrugInteractions = (search?: string, page?: number) => {
  return useQuery({
    queryKey: ["dorra-drug-interactions", search, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (page) params.append("page", page.toString());

      const response = await dorraAxiosInstance.get(
        `/v1/pharmavigilance/interactions?${params.toString()}`
      );
      return response.data;
    },
  });
};
