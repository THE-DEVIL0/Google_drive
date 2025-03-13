"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getenv = (constant, defaultValue) => {
    const value = process.env[constant] || defaultValue;
    if (!value) {
        throw new Error(`Environment variable ${constant}  is not set`);
    }
    return value;
};
exports.default = getenv;
