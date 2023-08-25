import jwt  from "jsonwebtoken";
import CustomError from "../errors/custom_error";



export default {

    async sign(data :any){
        return await jwt.sign(data,process.env.jwt_key as string,{expiresIn:"3d"})


    },

    async verify(token:string){
        try {
            return await jwt.verify(token,process.env.jwt_key as string)
            
        } catch (error:any) {
          throw new CustomError('un-authorized',409)
            
        }

    }
}