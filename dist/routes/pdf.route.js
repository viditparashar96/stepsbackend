"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const pdf_controller_1 = require("../controllers/pdf.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const pdf = new pdf_controller_1.PDf();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});
router
    .route("/upload-pdf")
    .post(upload.single("file"), auth_middleware_1.authenticate, pdf.uploadPdf);
router.route("/delete-pdf/:id").delete(auth_middleware_1.authenticate, pdf.deletePdfById);
module.exports = router;
