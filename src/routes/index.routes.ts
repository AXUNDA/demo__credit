import express,{ Router, } from "express";
import auth from "./auth.routes"
import wallet from "./wallet.routes"
import { Request,Response,NextFunction, } from "express";





const router:Router = express.Router()

router.use('/auth',auth)
router.use('/wallet',wallet)

router.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json({
        status:"active",
        docs:"https://github.com/AXUNDA/demo__credit"
    })

})




export default router


