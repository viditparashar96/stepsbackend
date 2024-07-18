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
exports.findDoctorByEmail = findDoctorByEmail;
exports.createDoctor = createDoctor;
exports.linkDoctorToPatient = linkDoctorToPatient;
exports.unlinkDoctorFromPatient = unlinkDoctorFromPatient;
exports.findDoctorPatientLink = findDoctorPatientLink;
exports.getPatientsByDoctor = getPatientsByDoctor;
exports.getAllPatients = getAllPatients;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_config_1 = require("../config/db-config");
const env_config_1 = require("../config/env-config");
const prisma = (0, db_config_1.getPrisma)(env_config_1.env_conf.database_url);
function findDoctorByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.doctor.findUnique({
            where: { email },
        });
    });
}
function createDoctor(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
        return prisma.doctor.create({
            data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
        });
    });
}
function linkDoctorToPatient(doctorId, patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.doctorPatient.create({
            data: {
                doctorId,
                patientId,
            },
        });
    });
}
function unlinkDoctorFromPatient(doctorId, patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.doctorPatient.delete({
            where: {
                doctorId_patientId: {
                    doctorId,
                    patientId,
                },
            },
        });
    });
}
function findDoctorPatientLink(doctorId, patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.doctorPatient.findUnique({
            where: {
                doctorId_patientId: {
                    doctorId,
                    patientId,
                },
            },
        });
    });
}
function getPatientsByDoctor(doctorId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.doctorPatient.findMany({
            where: { doctorId },
            include: {
                patient: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        // return prisma.doctor.findUnique({
        //   where: { id: doctorId },
        //   include: {
        //     patients: {
        //       include: {
        //         patient: true,
        //       },
        //     },
        //   },
        // });
    });
}
function getAllPatients() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.patient.findMany({
            include: {
                doctors: true,
            },
        });
    });
}
