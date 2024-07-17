import { z } from "zod";
export const registerDoctorSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must be at most 255 characters")
    .trim(),
  email: z.string().email("Invalid email address").trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .trim(),
  specialty: z
    .string()
    .min(3, "Specialty must be at least 3 characters")
    .max(255, "Specialty must be at most 255 characters")
    .trim(),
});

export const loginDoctorSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(6).max(20).trim(),
});
