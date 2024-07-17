"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const env_config_1 = require("./env-config");
const s3 = new client_s3_1.S3Client({
    region: env_config_1.env_conf.bucket_region,
    credentials: {
        secretAccessKey: env_config_1.env_conf.aws_secret_key,
        accessKeyId: env_config_1.env_conf.aws_access_key,
    },
});
exports.default = s3;
