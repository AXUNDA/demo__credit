import { Request,Response,NextFunction, } from "express";
import walletService from "../services/wallet.service";

export default {
    async topUp(req:Request,res:Response,next:NextFunction){
        try {
            const {user_id} = res.locals.user
            const response = await walletService.topUp(user_id,req.body.amount)
            return res.status(200).json({...response})

            
        } catch (error) {
            next(error)
            
        }

    },
    async withdraw(req:Request,res:Response,next:NextFunction){

    },
    async transfer(req:Request,res:Response,next:NextFunction){

    },
    async getBalance(req:Request,res:Response,next:NextFunction){

    }
}