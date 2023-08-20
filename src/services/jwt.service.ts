import jwt  from "jsonwebtoken";



export default {

    async sign(data :any){
        return await jwt.sign(data,process.env.jwt_key as string)


    },

    async verify(token:string){
        try {
            return await jwt.verify(token,process.env.jwt_key as string)
            
        } catch (error:any) {
            return false
            
        }

    }
}