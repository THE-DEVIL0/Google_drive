import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request{
    user?: any
}



function auth(req:CustomRequest, res:any, next:any){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unathorized"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;

        return next()
    }
    catch(error){
        return res.status(401).json({
            message:"Unathorized"
        })
    }
}

export default auth