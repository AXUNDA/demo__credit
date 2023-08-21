import db from "../db/database";
import CustomError from "../errors/custom_error";

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

    }

}
