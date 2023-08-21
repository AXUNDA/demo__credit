import db from "../db/database";
import CustomError from "../errors/custom_error";
import authService from "./auth.service";

export default {
    async getWallet(user_id:string){
        const data = await db('wallet').select("*").from("wallet").where({user_id})
        if(data.length > 0){
          
            return data[0]
        }else{
            throw new CustomError("wallet not found",404)
        }
    },
    async createWallet(user_id:string){
        const data = await db('wallet').insert({user_id})
        if(data.length > 0){
            const wallet = await this.getWallet(user_id)
            console.log(wallet)

            return wallet

        }else{
            throw new CustomError("unable to create wallet",500)

        }

    },

    async topUp(user_id:string,amount:number){
         await db('wallets').where({user_id}).increment("balance",amount)
        const wallet =  await this.getWallet(user_id)
        return wallet
    },

    async withdraw(user_id:string,amount:number){
         await db('wallets').where({user_id}).decrement("balance",amount)
         const wallet =  await this.getWallet(user_id)
         return wallet

    },
    async transfer(user_id:string,amount:number,recipient_email:string){
        const recipient = await authService.getUser({emails:recipient_email})
        await db('wallets').where({user_id}).decrement("balance",amount)
        await db('wallets').where({user_id:recipient.user_id}).increment("balance",amount)
        const wallet = await this.getWallet(user_id)
        return wallet

    }

}
