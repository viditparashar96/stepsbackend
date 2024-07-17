import express from "express";
import multer from "multer";
import { PDf } from "../controllers/pdf.controller";
import { authenticate } from "../middlewares/auth.middleware";
const router = express.Router();

const pdf = new PDf();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});
router
  .route("/upload-pdf")
  .post(upload.single("file"), authenticate, pdf.uploadPdf);

router.route("/delete-pdf/:id").delete(authenticate, pdf.deletePdfById);

module.exports = router;
