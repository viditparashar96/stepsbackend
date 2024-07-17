"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_config_1 = require("../config/db-config");
const env_config_1 = require("../config/env-config");
const errors_1 = require("../helpers/errors");
const doctorzodschema_1 = require("../libs/zod-schemas/doctorzodschema");
const doctor_service_1 = require("../services/doctor.service");
const utils_1 = require("../utils");
class Doctor {
    constructor() {
        console.log("Doctor controller");
    }
    RegisterDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, specialty } = req.body;
                const validation = doctorzodschema_1.registerDoctorSchema.safeParse(req.body);
                if (!validation.success) {
                    const errorMessages = (0, errors_1.zodErrorFormatter)(validation.error);
                    return res.status(400).json({ errors: errorMessages });
                }
                const doctorExists = yield (0, doctor_service_1.findDoctorByEmail)(email);
                if (doctorExists) {
                    return res.status(400).json({ message: "Doctor already exists" });
                }
                const doctor = yield (0, doctor_service_1.createDoctor)({ name, email, password, specialty });
                return res
                    .status(201)
                    .json({ message: "Doctor registered successfully" });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    LoginDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const validation = doctorzodschema_1.loginDoctorSchema.safeParse(req.body);
                if (!validation.success) {
                    const errorMessages = (0, errors_1.zodErrorFormatter)(validation.error);
                    return res.status(400).json({ errors: errorMessages });
                }
                const doctor = yield (0, doctor_service_1.findDoctorByEmail)(email);
                if (!doctor) {
                    return res.status(400).json({ message: "Doctor does not exist" });
                }
                const isMatch = yield bcryptjs_1.default.compare(password, doctor.password);
                if (!isMatch) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }
                const payload = {
                    id: doctor.id,
                };
                const token = yield (0, utils_1.assignJwtToken)(payload);
                return res
                    .status(200)
                    .cookie("token", token, {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                })
                    .json({ message: "Doctor logged in successfully", token });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    currentDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, db_config_1.getPrisma)(env_config_1.env_conf.database_url);
                const doctor = yield prisma.doctor.findUnique({
                    where: {
                        id: req.body.user.id,
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        specialty: true,
                    },
                });
                return res.status(200).json({ doctor });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    linkPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { doctorId, patientId } = req.body;
                if (!doctorId || !patientId) {
                    return res
                        .status(400)
                        .json({ message: "Doctor ID and Patient ID are required" });
                }
                const existingLink = yield (0, doctor_service_1.findDoctorPatientLink)(doctorId, patientId);
                if (existingLink) {
                    yield (0, doctor_service_1.unlinkDoctorFromPatient)(doctorId, patientId);
                    return res
                        .status(200)
                        .json({ message: "Patient unlinked from doctor successfully" });
                }
                else {
                    const link = yield (0, doctor_service_1.linkDoctorToPatient)(doctorId, patientId);
                    return res
                        .status(201)
                        .json({ message: "Patient linked to doctor successfully", link });
                }
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ message: "Internal server error", error: error.message });
            }
        });
    }
    getDoctorPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { doctorId } = req.params;
                if (!doctorId) {
                    return res.status(400).json({ message: "Doctor ID is required" });
                }
                const patients = yield (0, doctor_service_1.getPatientsByDoctor)(Number(doctorId));
                res.status(200).json({ patients });
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ message: "Internal server error", error: error.message });
            }
        });
    }
}
exports.Doctor = Doctor;
