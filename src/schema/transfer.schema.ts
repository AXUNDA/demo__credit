import { object,string,number } from "zod";


export const createUserSchema = object({

body:object({
    recipient_email:string({
        required_error:" recipient email is required"
  }).email("a valid email is required"),

      amount:number({
            required_error:"transfer amount is required"
      }).min(10, "minimum amount is 10")
})   
})