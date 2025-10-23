// types/form.ts
import { z } from "zod";

export const stepOneSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(11, "Phone number must be at least 11 digits"),
});

export const stepTwoSchema = z.object({
  organizationName: z.string().min(3, "Business name is required"),
  City: z.string().min(5, "Business address is required"),
  State: z.string().min(1, "State is required"),
  localGovt: z.string().min(1, "Local Government is required"),
  zipCode: z.coerce.number().int("Zip code must be an integer").optional(),
  Others: z.string().optional(),
});

export const formSchema = stepOneSchema.merge(stepTwoSchema);

export const customerServiceSchema = z.object({
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
  Message: z.string().min(10, "Message must be at least 10 characters long"),
  newsUpdates: z.boolean().optional(),
});

export const loginSchema = z.object({
  Email: z.string().email("Invalid email address"),
  Password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const articleSchema = z.object({
  Title: z.string().min(3, "Title must be at least 3 characters long"),
  Caption: z.string().min(3, "Caption must be at least 3 characters long"),
  Subtitle11: z.string().min(3, "Subtitle  must be at least 3 characters long"),
  Subtitle12: z.string().optional(),
  Subtitle13: z.string().optional(),
  Subtitle14: z.string().optional(),
  Content1: z.string().min(10, "Content 1 must be at least 10 characters long"),
  Content2: z.string().optional(),
  Content3: z.string().optional(),
  Content4: z.string().optional(),
  images: z.array(z.instanceof(File).nullable()).length(4),
});

export type CustomerServiceFormInputs = z.infer<typeof customerServiceSchema>;
export type LoginFormmInputs = z.infer<typeof loginSchema>;

export type StepOneInputs = z.infer<typeof stepOneSchema>;
export type StepTwoInputs = z.infer<typeof stepTwoSchema>;
export type FormInputs = z.infer<typeof formSchema>;
