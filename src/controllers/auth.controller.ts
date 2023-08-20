import authService from "../services/auth.service"
import { Request,Response,NextFunction, } from "express";


export default {

    async signUp(req:Request,res:Response,next:NextFunction){
        try {
            const response = await  authService.createUser(req.body)
            return res.status(201).json(response)
            
        } catch (error:any) {
            next(error)
            
        }

    }
}