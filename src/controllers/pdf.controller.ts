import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { Request, Response } from "express";
import { env_conf } from "../config/env-config";
import s3 from "../config/s3-config";
import { deletePdf, getPdf, savePdf } from "../services/pdf.service";
export class PDf {
  constructor() {
    console.log("PDF controller");
  }

  async uploadPdf(req: Request, res: Response) {
    try {
      const file = req.file;
      console.log(file);
      if (!file) {
        return res.status(400).json({
          message: "No file uploaded or file size exceeds the limit.",
        });
      }

      let ramdomBytes = crypto.randomBytes(16).toString("hex");

      const params = {
        Bucket: env_conf.bucket_name,
        Key: ramdomBytes,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const command = new PutObjectCommand(params);

      await s3.send(command);

      const savedPdf = await savePdf(req.body.user.id, ramdomBytes);

      return res
        .status(200)
        .json({ message: "PDF uploaded successfully", savedPdf });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async deletePdfById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);
      const pdf = await getPdf(parseInt(id));
      if (!pdf) {
        return res.status(404).json({ message: "PDF not found" });
      }
      const params = {
        Bucket: env_conf.bucket_name,
        Key: pdf.filePath,
      };
      await s3.send(new DeleteObjectCommand(params));
      await deletePdf(parseInt(id));
      return res.status(200).json({ message: "PDF deleted successfully" });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
}
