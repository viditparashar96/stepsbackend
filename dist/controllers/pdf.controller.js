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
exports.PDf = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = __importDefault(require("crypto"));
const env_config_1 = require("../config/env-config");
const s3_config_1 = __importDefault(require("../config/s3-config"));
const errors_1 = require("../helpers/errors");
const pdfzodschema_1 = require("../libs/zod-schemas/pdfzodschema");
const pdf_service_1 = require("../services/pdf.service");
class PDf {
    constructor() {
        console.log("PDF controller");
    }
    uploadPdf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description } = req.body;
                const file = req.file;
                console.log(file);
                if (!file) {
                    return res.status(400).json({
                        message: "No file uploaded or file size exceeds the limit.",
                    });
                }
                const validation = pdfzodschema_1.pdfUploadSchema.safeParse({
                    name,
                    description,
                });
                if (!validation.success) {
                    const errorMessages = (0, errors_1.zodErrorFormatter)(validation.error);
                    return res.status(400).json({ errors: errorMessages });
                }
                let ramdomBytes = crypto_1.default.randomBytes(16).toString("hex");
                const params = {
                    Bucket: env_config_1.env_conf.bucket_name,
                    Key: ramdomBytes,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };
                const command = new client_s3_1.PutObjectCommand(params);
                yield s3_config_1.default.send(command);
                const data = {
                    id: req.body.user.id,
                    name,
                    description,
                    filePath: ramdomBytes,
                };
                const savedPdf = yield (0, pdf_service_1.savePdf)(data);
                return res
                    .status(200)
                    .json({ message: "PDF uploaded successfully", savedPdf });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        });
    }
    deletePdfById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(id);
                const pdf = yield (0, pdf_service_1.getPdf)(parseInt(id));
                if (!pdf) {
                    return res.status(404).json({ message: "PDF not found" });
                }
                const params = {
                    Bucket: env_config_1.env_conf.bucket_name,
                    Key: pdf.filePath,
                };
                yield s3_config_1.default.send(new client_s3_1.DeleteObjectCommand(params));
                yield (0, pdf_service_1.deletePdf)(parseInt(id));
                return res.status(200).json({ message: "PDF deleted successfully" });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.PDf = PDf;
