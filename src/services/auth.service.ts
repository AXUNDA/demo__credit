import db from "../db/database";
import * as argon2 from "argon2";
import CustomError from "../errors/custom_error";
import jwtService from "./jwt.service";


type userDetails={
    email:string;
    password:string;

}

export default {

    async createUser(body:userDetails){
        try {
            const hash =  await argon2.hash(body.password)
          
            const response = await db("users").insert({email:body.email.toLowerCase(),password:hash})
            if(response.length > 0){
                const user = await this.getUser({email:body.email})
                delete user.password
           

                const token = await jwtService.sign(user)
          
               
                return {
                    token,
                    user
                }
               
            }
            
            
        } catch (error:any) {
           if(error.code == "ER_DUP_ENTRY"){
            throw new CustomError("user already exists",500)
           }

            
        }
       
      

        

    },

    async login(body:userDetails){
        
            const user = await this.getUser({email:body.email})
            console.log(user)
            const status = await argon2.verify(user.password,body.password)
            console.log(status)
      if(status === true){
        delete user.password
        const token = await jwtService.sign(user)
        return {token}

      }  else{
        throw new CustomError("invalid credentials",400)


      } 
       
        

    },

    async getUser(query:any){
        
            const data = await  db('users').select("*").from("users").where(query)
     
            if(data.length > 0){
                const user = data[0]
              
        

           return user


            }else{
            throw new CustomError("user not found",404)

            }

    }
}