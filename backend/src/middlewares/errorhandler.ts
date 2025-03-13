import { ErrorRequestHandler } from "express";
import { BadRequest, InternalServerError } from "../constants/https";
import { z } from "zod";

const handleZodError = (error:z.ZodError ,res)=>{
    const errors = error.errors.map(err=>({
        path:err.path.join("."),
        message: err.message
    }))
return res.status(BadRequest).json({
    message: error.message,
    errors
})
}


const errorHanlder: ErrorRequestHandler= (error, req, res, next , errorType?) => {

    console.log(`Path: ${req.path} , Error ${error.name} , Message: ${error.message}`);
    if(error instanceof z.ZodError){
        return handleZodError(error,res)
    }
    res.status(errorType||InternalServerError)

}

export default errorHanlder