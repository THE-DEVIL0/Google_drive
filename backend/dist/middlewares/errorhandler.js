"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHanlder = (error, req, res, next) => {
    console.log(`Path: ${req.path} , Error ${error.name} , Message: ${error.message}`);
    res.status(500).send("Internal server error");
};
exports.default = errorHanlder;
