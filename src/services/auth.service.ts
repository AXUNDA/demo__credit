import db from "../db/knexfile";
import * as argon2 from "argon2";


type userDetails={
    email:string;
    password:string;

}

export default {

    async createUser(body:userDetails){
        const hash =  argon2.hash(body.password)
        const response = await db("users").insert({email:body.email.toLowerCase(),password:hash})
        console.log(response)
        return response

        

    },

    async login(body:userDetails){

    }
}