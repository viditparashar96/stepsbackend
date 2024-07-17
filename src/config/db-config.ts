import { PrismaClient } from "@prisma/client";
export const getPrisma = (database_url: string) => {
  const prisma = new PrismaClient({
    datasourceUrl: database_url,
    log: ["query"],
  });
  return prisma;
};
