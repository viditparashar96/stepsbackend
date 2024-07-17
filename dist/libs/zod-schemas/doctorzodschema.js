"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDoctorSchema = exports.registerDoctorSchema = void 0;
const zod_1 = require("zod");
exports.registerDoctorSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(255, "Name must be at most 255 characters")
        .trim(),
    email: zod_1.z.string().email("Invalid email address").trim(),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be at most 20 characters")
        .trim(),
    specialty: zod_1.z
        .string()
        .min(3, "Specialty must be at least 3 characters")
        .max(255, "Specialty must be at most 255 characters")
        .trim(),
});
exports.loginDoctorSchema = zod_1.z.object({
    email: zod_1.z.string().email().trim(),
    password: zod_1.z.string().min(6).max(20).trim(),
});
