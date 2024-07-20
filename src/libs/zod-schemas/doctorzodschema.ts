import { z } from "zod";
export const registerDoctorSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must be at most 255 characters" })
    .trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be at most 20 characters" })
    .trim(),
  specialty: z
    .string()
    .min(3, { message: "Specialty must be at least 3 characters" })
    .max(255, { message: "Specialty must be at most 255 characters" })
    .trim(),
});

export const loginDoctorSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be at most 20 characters" })
    .trim(),
});
