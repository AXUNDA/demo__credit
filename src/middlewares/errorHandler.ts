import { Request,Response,NextFunction, } from "express";

export async function errorHandler(err:any, req:Request, res:Response, next:NextFunction){
    return  res.status(500).json({
        msg: err.message,
        success: false,
      });

}