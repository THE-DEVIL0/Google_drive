import { ErrorRequestHandler, Response } from "express";
import { BadRequest, InternalServerError } from "../constants/https.js";
import { z } from "zod";
import AppError from "../utils/appError.js";

const handleZodError = (error:z.ZodError ,res:any)=>{
    const errors = error.errors.map(err=>({
        path:err.path.join("."),
        message: err.message
    }))
return res.status(BadRequest).json({
    message: error.message,
    errors
})
}
const handleAppError = (res: Response, error: AppError)=>{
    
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    })
}


const errorHandler: ErrorRequestHandler= (error, req, res, next , errorType?:any) => {

    console.log(`Path: ${req.path} , Error ${error.name} , Message: ${error.message}`);
    console.log("🔴 normal Error caught:", error.constructor.name, error.message);

    if(error instanceof z.ZodError){
        console.log("🔴 App Error caught:", error.constructor.name, error.message);
        
        return handleZodError(error,res)
    }
    if(error instanceof AppError){
        console.log("🔴 App Error caught:", error.constructor.name, error.message);

        return handleAppError(res, error);
    }
    res.status(errorType||InternalServerError)

}

export default errorHandler