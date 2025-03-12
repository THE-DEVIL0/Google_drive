import { ErrorRequestHandler } from "express";


const errorHanlder: ErrorRequestHandler= (error, req, res, next) => {

    console.log(`Path: ${req.path} , Error ${error.name} , Message: ${error.message}`);
    res.status(500).send("Internal server error")

}

export default errorHanlder