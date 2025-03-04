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
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePdf = savePdf;
exports.getPdf = getPdf;
exports.deletePdf = deletePdf;
const db_config_1 = require("../config/db-config");
const env_config_1 = require("../config/env-config");
const prisma = (0, db_config_1.getPrisma)(env_config_1.env_conf.database_url);
function savePdf(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        return prisma.pDF.create({
            data: {
                doctorId: data.id,
                name: data.name,
                description: data.description,
                filePath: data.filePath,
            },
        });
    });
}
function getPdf(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.pDF.findUnique({
            where: {
                id: id,
            },
        });
    });
}
function deletePdf(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.pDF.delete({
            where: {
                id: id,
            },
        });
    });
}
