import { z } from "zod";

export const stepOneSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(11, "Phone number must be at least 11 digits"),
});

export const stepTwoSchema = z.object({
  organizationName: z.string().min(3, "Business name is required"),
  city: z.string().min(5, "Business address is required"),
  state: z.string().min(1, "State is required"),
  localGovt: z.string().min(1, "Local Government is required"),
  zipCode: z.coerce.number().int("Zip code must be an integer").optional(),
  others: z.string().optional(),
});

export const formSchema = stepOneSchema.merge(stepTwoSchema);

export const feedbackSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
  organizationName: z
    .string()
    .min(3, "Organization name must be at least 3 characters long"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const articleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  caption: z.string().min(3, "Caption must be at least 3 characters long"),
  subtitle11: z.string().min(3, "Subtitle  must be at least 3 characters long"),
  subtitle12: z.string().optional(),
  subtitle13: z.string().optional(),
  subtitle14: z.string().optional(),
  content1: z.string().min(10, "Content 1 must be at least 10 characters long"),
  content2: z.string().optional(),
  content3: z.string().optional(),
  content4: z.string().optional(),
  images: z.array(z.instanceof(File).nullable()).length(4),
});

export const emrSignUpSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    emailAddress: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const emrSignInSchema = z.object({
  emailAddress: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const patientSchema = z.object({
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

export type PatientFormData = z.infer<typeof patientSchema>;
export type EMRSignUpInputs = z.infer<typeof emrSignUpSchema>;
export type EMRSignInInputs = z.infer<typeof emrSignInSchema>;

export type FeedbackFormInputs = z.infer<typeof feedbackSchema>;
export type LoginFormmInputs = z.infer<typeof loginSchema>;

export type StepOneInputs = z.infer<typeof stepOneSchema>;
export type StepTwoInputs = z.infer<typeof stepTwoSchema>;
export type FormInputs = z.infer<typeof formSchema>;
