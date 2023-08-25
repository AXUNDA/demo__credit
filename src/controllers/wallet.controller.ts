import { Request,Response,NextFunction, } from "express";
import walletService from "../services/wallet.service";

export default {
    async topUp(req:Request,res:Response,next:NextFunction){
        try {
            const {user_id} = res.locals.user
            const response = await walletService.topUp(user_id,req.body.amount)
            return res.status(200).json({status:"top up successful",...response})

            
        } catch (error:any) {
            next(error)
            
        }

    },
    async withdraw(req:Request,res:Response,next:NextFunction){
        try {
            const {user_id} = res.locals.user
            const response = await walletService.withdraw(user_id,req.body.amount)
            return res.status(200).json({status:"withdrawal successful",...response})

            
        } catch (error:any) {
            next(error)

            
        }

    },
    async transfer(req:Request,res:Response,next:NextFunction){
        try {
            const {user_id} = res.locals.user
            const response = await walletService.transfer(user_id,req.body.amount,req.body.email)
            return res.status(200).json({status:"transfer successful",...response})


            
        } catch (error:any) {
            next(error)

            
        }

    },
    async getBalance(req:Request,res:Response,next:NextFunction){
        try {
            const {user_id} = res.locals.user
            const response = await walletService.getWallet(user_id)
            return res.status(200).json({...response})


            
        } catch (error) {
            next(error)

            
        }

    },
    async getHistory(req:Request,res:Response,next:NextFunction){
        try {
            const {user_id} = res.locals.user
            const response = await walletService.getTransactionHistory(user_id)
            return res.status(200).json({...response})

            
        } catch (error) {
            next(error)

            
        }
    }
}