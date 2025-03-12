"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("../constants/https");
const errorHanlder = (error, req, res, next) => {
    console.log(`Path: ${req.path} , Error ${error.name} , Message: ${error.message}`);
    res.status(500).send(`${https_1.InternalServerError}`);
};
exports.default = errorHanlder;
