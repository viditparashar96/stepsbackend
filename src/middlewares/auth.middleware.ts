import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env_conf } from "../config/env-config";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.header("Authorization") ||
      req.header("x-access-token") ||
      req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(token, env_conf.jwt_secret);
    req.body.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "something went wrong while authenticating",
    });
  }
};
