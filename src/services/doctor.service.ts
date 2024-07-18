import bcrypt from "bcryptjs";
import { getPrisma } from "../config/db-config";
import { env_conf } from "../config/env-config";

const prisma = getPrisma(env_conf.database_url);

export async function findDoctorByEmail(email: string) {
  return prisma.doctor.findUnique({
    where: { email },
  });
}

export async function createDoctor(data: {
  name: string;
  email: string;
  password: string;
  specialty: string;
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.doctor.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
}

export async function linkDoctorToPatient(doctorId: number, patientId: number) {
  return prisma.doctorPatient.create({
    data: {
      doctorId,
      patientId,
    },
  });
}

export async function unlinkDoctorFromPatient(
  doctorId: number,
  patientId: number
) {
  return prisma.doctorPatient.delete({
    where: {
      doctorId_patientId: {
        doctorId,
        patientId,
      },
    },
  });
}

export async function findDoctorPatientLink(
  doctorId: number,
  patientId: number
) {
  return prisma.doctorPatient.findUnique({
    where: {
      doctorId_patientId: {
        doctorId,
        patientId,
      },
    },
  });
}

export async function getPatientsByDoctor(doctorId: number) {
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
}

export async function getAllPatients(){
  return prisma.patient.findMany({
    
    include:{
      doctors:true,
      
    },
  })
}
