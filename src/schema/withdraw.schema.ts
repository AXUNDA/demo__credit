import { object,string,number } from "zod";


export const createUserSchema = object({

body:object({
   
      amount:number({
            required_error:" amount is required"
      }).min(10, "minimum amount is 10")
})   
})