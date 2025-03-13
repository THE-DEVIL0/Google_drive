import {Request, NextFunction,Response } from "express"

type AssyncController = ( 
    req: Request, 
    res: Response, 
    next: NextFunction) => Promise<void>



const catcherror=(controller : AssyncController) : AssyncController =>
    async (res,req,next)=>{
        try{
            await controller(res,req,next)
        }catch(error){
            next(error)
        }
    }

export default catcherror    