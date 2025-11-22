/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DorraPatient {
  id: number;
  unique_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  age: string;
  date_of_birth: string;
  gender: "Male" | "Female" | "Other" | undefined;
  address: string;
  phone_number: string;
  email: string;
  allergies: string[];
  created_at: string;
  updated_at: string;
  team: number;
}

export interface DorraAppointment {
  id: number;
  patient_name: string;
  date: string;
  reason: string;
  summary: string;
  status: "active" | "completed";
  created_at: string;
  updated_at: string;
  patient: number;
}

export interface DorraEncounter {
  id: number;
  patient_name: string;
  unique_id: string;
  has_drug_interaction: boolean;
  weight: string;
  height: string;
  bmi: string;
  blood_pressure: string;
  heart_rate: string;
  temperature: string;
  symptoms: any;
  diagnosis: string;
  note: string;
  summary: string;
  follow_up: string;
  consultation_reason: string;
  medical_history: string;
  vitals: any;
  medications: any;
  tests: any;
  created_at: string;
  patient: number;
  encounter_medications: any[];
  encounter_tests: any[];
  drug_interactions: any[];
}

export interface AIPromptResponse {
  status: boolean;
  status_code: number;
  message: string;
  resource: "Appointment" | "Encounter" | "Error";
  available_pharmacies?: any[];
  data?: any;
}

export interface AIPatientResponse {
  status: boolean;
  status_code: number;
  message: string;
  id: number;
}

export interface DorraPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
