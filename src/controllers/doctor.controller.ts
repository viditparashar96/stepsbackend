import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { getPrisma } from "../config/db-config";
import { env_conf } from "../config/env-config";
import { zodErrorFormatter } from "../helpers/errors";
import {
  loginDoctorSchema,
  registerDoctorSchema,
} from "../libs/zod-schemas/doctorzodschema";
import {
  createDoctor,
  findDoctorByEmail,
  findDoctorPatientLink,
  getAllPatients,
  getPatientsByDoctor,
  linkDoctorToPatient,
  unlinkDoctorFromPatient,
} from "../services/doctor.service";
import { assignJwtToken } from "../utils";
export class Doctor {
  constructor() {
    console.log("Doctor controller");
  }
  async RegisterDoctor(req: Request, res: Response) {
    try {
      const { name, email, password, specialty } = req.body;

      const validation = registerDoctorSchema.safeParse(req.body);
      if (!validation.success) {
        const errorMessages = zodErrorFormatter(validation.error);
        return res.status(400).json({ errors: errorMessages });
      }

      const doctorExists = await findDoctorByEmail(email);

      if (doctorExists) {
        return res.status(400).json({ message: "Doctor already exists" });
      }

      const doctor = await createDoctor({ name, email, password, specialty });

      return res
        .status(201)
        .json({ message: "Doctor registered successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  async LoginDoctor(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const validation = loginDoctorSchema.safeParse(req.body);
      if (!validation.success) {
        const errorMessages = zodErrorFormatter(validation.error);
        return res.status(400).json({ errors: errorMessages });
      }

      const doctor = await findDoctorByEmail(email);

      if (!doctor) {
        return res.status(400).json({ message: "Doctor does not exist" });
      }

      const isMatch = await bcrypt.compare(password, doctor.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const payload = {
        id: doctor.id,
      };
      const token = await assignJwtToken(payload);

      return res
        .status(200)
        .cookie("token", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .json({ message: "Doctor logged in successfully", token });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async currentDoctor(req: Request, res: Response) {
    try {
      const prisma = getPrisma(env_conf.database_url);
      const doctor = await prisma.doctor.findUnique({
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
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async linkPatient(req: Request, res: Response) {
    try {
      const { doctorId, patientId } = req.body;

      if (!doctorId || !patientId) {
        return res
          .status(400)
          .json({ message: "Doctor ID and Patient ID are required" });
      }

      const existingLink = await findDoctorPatientLink(doctorId, patientId);

      if (existingLink) {
        await unlinkDoctorFromPatient(doctorId, patientId);
        return res
          .status(200)
          .json({ message: "Patient unlinked from doctor successfully" });
      } else {
        const link = await linkDoctorToPatient(doctorId, patientId);
        return res
          .status(201)
          .json({ message: "Patient linked to doctor successfully", link });
      }
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async getDoctorPatients(req: Request, res: Response) {
    try {
      const { doctorId } = req.params;

      if (!doctorId) {
        return res.status(400).json({ message: "Doctor ID is required" });
      }

      const patients = await getPatientsByDoctor(Number(doctorId));
      res.status(200).json({ patients });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async getAllPatients(req:Request,res:Response){
    try {
      const patients=await getAllPatients()
      
      return res.status(200).json({
        message:"OK",
        patients
      })
    } catch (error:any) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }


}
