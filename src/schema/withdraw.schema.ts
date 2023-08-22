import { object,string,number } from "zod";


export const withdrawSchema = object({

body:object({
   
      amount:number({
            
            required_error:" amount is required",
            
      }).min(10, "minimum amount is 10").max(1000,"maximum amount is 1000")
})   
})