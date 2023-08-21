import db from "../db/database";
import { NextFunction, Request, Response } from "express"
import walletService from "../services/wallet.service";

export default async function verifyBalance(req: Request, res: Response, next: NextFunction){
    try {
        const {user_id} = res.locals.user
        const amount = req.body
        const wallet = await walletService.getWallet(user_id)
        if(amount > wallet.balance){
            return res.status(400).json({
                success:false,
                error:"insufficient funds"

            })
        }
        return next()
        
    } catch (error) {
        return res.status(500).json({error:"an error occurred"})
        
    }

}

