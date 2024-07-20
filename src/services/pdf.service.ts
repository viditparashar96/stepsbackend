import { getPrisma } from "../config/db-config";
import { env_conf } from "../config/env-config";

const prisma = getPrisma(env_conf.database_url);

export async function savePdf(data: any) {
  console.log(data);
  return prisma.pDF.create({
    data: {
      doctorId: data.id,
      name: data.name,
      description: data.description,
      filePath: data.filePath,
    },
  });
}

export async function getPdf(id: number) {
  return prisma.pDF.findUnique({
    where: {
      id: id,
    },
  });
}

export async function deletePdf(id: number) {
  return prisma.pDF.delete({
    where: {
      id: id,
    },
  });
}
