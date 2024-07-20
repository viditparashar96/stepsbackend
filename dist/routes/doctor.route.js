"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctor_controller_1 = require("../controllers/doctor.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const doctor = new doctor_controller_1.Doctor();
router.route("/register").post(doctor.RegisterDoctor);
router.route("/login").post(doctor.LoginDoctor);
router.route("/currentDoctor").get(auth_middleware_1.authenticate, doctor.currentDoctor);
router.route("/link-patient").post(auth_middleware_1.authenticate, doctor.linkPatient);
router.route("/:doctorId/patients").get(auth_middleware_1.authenticate, doctor.getDoctorPatients);
router.route("/get-all-patients").get(auth_middleware_1.authenticate, doctor.getAllPatients);
router.route("/get-all-pdfs").get(auth_middleware_1.authenticate, doctor.getAllpdfs);
router.route("/logout").post(auth_middleware_1.authenticate, doctor.logout);
module.exports = router;
