import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import logger from "morgan";
import { env_conf } from "./config/env-config";
require("dotenv").config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: "https://stepsfrontend.vercel.app/",
    credentials: true,
  })
);
app.use(logger("dev"));

app.use(cookieParser());

app.use("/api/v1/doctor", require("./routes/doctor.route"));
app.use("/api/v1/pdf", require("./routes/pdf.route"));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const start = (): void => {
  try {
    app.listen(port, () => {
      console.log(
        `⚡️[server]: Server is running at ${
          env_conf.node_env == "dev" ? `http://localhost:${port}` : port
        }`
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
start();
