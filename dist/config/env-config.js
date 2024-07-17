"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env_conf = void 0;
require("dotenv").config();
exports.env_conf = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    client_url: process.env.CLIENT_URL || "",
    database_url: process.env.DATABASE_URL || "",
    jwt_secret: process.env.SECRET || "",
    jwt_expiry: process.env.JWT_EXPIRY || "1h",
    bucket_name: process.env.BUCKET_NAME || "",
    bucket_region: process.env.BUCKET_REGION || "",
    aws_access_key: process.env.AWS_ACCESS_KEY || "",
    aws_secret_key: process.env.AWS_SECRET_KEY || "",
};
