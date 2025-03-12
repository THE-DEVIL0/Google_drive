import { ErrorRequestHandler } from "express";
import { InternalServerError } from "../constants/https";


const errorHanlder: ErrorRequestHandler= (error, req, res, next) => {

    console.log(`Path: ${req.path} , Error ${error.name} , Message: ${error.message}`);
    res.status(500).send(`${InternalServerError}`)

}

export default errorHanlder