import jwt from "jsonwebtoken";
import { env_conf } from "../config/env-config";

export const assignJwtToken = (payload: any) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      env_conf.jwt_secret,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token as string);
      }
    );
  });
};
