
import db from "../db/database";
import CustomError from "../errors/custom_error";
import authService from "./auth.service";
import uuid from 'uuid-random';







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
        const data = await db('wallet').insert({user_id,wallet_id:uuid()})
        if(data.length > 0){
            const wallet = await this.getWallet(user_id)
            console.log(wallet)
            return wallet
        }else{
            throw new CustomError("unable to create wallet",500)
        }

    },

    async topUp(user_id:string,amount:number){
       const  amountInFloat= this.toFloat(amount)
       const {email} =  await authService.getUser({user_id})
       await db.transaction(async(trx)=>{
        await trx('wallet').where({user_id}).increment("balance",amountInFloat)
        await trx('transaction_history').insert({
            transaction_id:uuid(),
            sender:email,
            amount:amountInFloat,
            transaction_type:"deposit",
            beneficiary:'self_',
            sender_user_id:user_id,
            recipient_user_id:"same as sender_user_id"
        })

      
    })
      
        const wallet =  await this.getWallet(user_id)
        return wallet
    },

    async withdraw(user_id:string,amount:number){
        const  amountInFloat= this.toFloat(amount)
        const {email} =  await authService.getUser({user_id})
        await db.transaction(async(trx)=>{
         await trx('wallet').where({user_id}).decrement("balance",amountInFloat)
         await trx('transaction_history').insert({
            transaction_id:uuid(),
            sender:email,
            amount:amountInFloat,
            transaction_type:"withdrawal",
            beneficiary:'self_',
            sender_user_id:user_id,
            recipient_user_id:"same as sender_user_id"
        })


        })
        
        
         const wallet =  await this.getWallet(user_id)
         return wallet
    },

    async transfer(user_id:string,amount:number,recipient_email:string){
        const sender = await authService.getUser({user_id})
        if(sender.email == recipient_email ){
            throw new CustomError(" you can not send money to yourself",400)


        }
        const  amountInFloat= this.toFloat(amount)
        const recipient = await authService.getUser({email:recipient_email})
        


        await db.transaction(async(trx)=>{
            await trx('wallet').where({user_id}).decrement("balance",amountInFloat)
            await trx('wallet').where({user_id:recipient.user_id}).increment("balance",amountInFloat)
            await trx('transaction_history').insert({
                transaction_id:uuid(),
                sender:sender.email,
                amount:amountInFloat,
                transaction_type:"transfer",
                beneficiary:recipient.email,
                sender_user_id:user_id,
                recipient_user_id:recipient.user_id
            })
        })
        
        const wallet = await this.getWallet(user_id)
        return wallet
    },
    toFloat(amount: number):number {
        return parseFloat(amount.toFixed(2));
      },

      async getTransactionHistory(user_id:string){
        const history = await db('transaction_history').select("*").from("transaction_history").where({sender_user_id:user_id}).orWhere({recipient_user_id:user_id})
        return history

      }

}
