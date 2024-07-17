"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodErrorFormatter = void 0;
const zodErrorFormatter = (error) => {
    return error.errors.map((err) => {
        return {
            field: err.path.join("."),
            message: err.message,
        };
    });
};
exports.zodErrorFormatter = zodErrorFormatter;
