"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const env_config_1 = require("./config/env-config");
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
// https://stepsfrontend.vercel.app
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/doctor", require("./routes/doctor.route"));
app.use("/api/v1/pdf", require("./routes/pdf.route"));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
const start = () => {
    try {
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at ${env_config_1.env_conf.node_env == "dev" ? `http://localhost:${port}` : port}`);
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
start();
