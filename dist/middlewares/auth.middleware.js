"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env-config");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("Authorization") ||
            req.header("x-access-token") ||
            req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.env_conf.jwt_secret);
        req.body.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "something went wrong while authenticating",
        });
    }
});
exports.authenticate = authenticate;
