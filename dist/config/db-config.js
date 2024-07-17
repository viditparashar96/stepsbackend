"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrisma = void 0;
const client_1 = require("@prisma/client");
const getPrisma = (database_url) => {
    const prisma = new client_1.PrismaClient({
        datasourceUrl: database_url,
        log: ["query"],
    });
    return prisma;
};
exports.getPrisma = getPrisma;
