import express from "express";
import { Doctor } from "../controllers/doctor.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();
const doctor = new Doctor();
router.route("/register").post(doctor.RegisterDoctor);
router.route("/login").post(doctor.LoginDoctor);
router.route("/currentDoctor").get(authenticate, doctor.currentDoctor);
router.route("/link-patient").post(authenticate, doctor.linkPatient);
router.route("/:doctorId/patients").get(authenticate, doctor.getDoctorPatients);
router.route("/get-all-patients").get(authenticate, doctor.getAllPatients);
router.route("/get-all-pdfs").get(authenticate, doctor.getAllpdfs);
router.route("/logout").post(authenticate, doctor.logout);
module.exports = router;
