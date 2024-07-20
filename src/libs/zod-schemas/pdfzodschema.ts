import { z } from "zod";

export const pdfUploadSchema = z.object({
  name: z
    .string()
    .min(3, { message: "pdf name must contain 3 words" })
    .max(255),
  description: z
    .string()
    .min(10, {
      message: "pdf description must contain 10 words",
    })
    .max(255),
});
