"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfUploadSchema = void 0;
const zod_1 = require("zod");
exports.pdfUploadSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, { message: "pdf name must contain 3 words" })
        .max(255),
    description: zod_1.z
        .string()
        .min(10, {
        message: "pdf description must contain 10 words",
    })
        .max(255),
});
