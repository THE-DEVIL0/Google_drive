"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("../constants/https");
const zod_1 = require("zod");
const handleZodError = (error, res) => {
    const errors = error.errors.map(err => ({
        path: err.path.join("."),
        message: err.message
    }));
    return res.status(https_1.BadRequest).json({
        message: error.message,
        errors
    });
};
const errorHanlder = (error, req, res, next) => {
    console.log(`Path: ${req.path} , Error ${error.name} , Message: ${error.message}`);
    if (error instanceof zod_1.z.ZodError) {
        return handleZodError(error, res);
    }
    res.status(500).send(`${https_1.InternalServerError}`);
};
exports.default = errorHanlder;
