"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env-config");
const assignJwtToken = (payload) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, env_config_1.env_conf.jwt_secret, { expiresIn: "7d" }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
};
exports.assignJwtToken = assignJwtToken;
