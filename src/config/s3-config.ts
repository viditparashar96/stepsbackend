import { S3Client } from "@aws-sdk/client-s3";
import { env_conf } from "./env-config";

const s3 = new S3Client({
  region: env_conf.bucket_region,
  credentials: {
    secretAccessKey: env_conf.aws_secret_key,
    accessKeyId: env_conf.aws_access_key,
  },
});

export default s3;
