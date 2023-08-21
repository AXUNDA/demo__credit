import express,{ Router, } from "express";
import auth from "./auth.routes"
import wallet from "./wallet.routes"





const router:Router = express.Router()

router.use('/auth',auth)
router.use('/wallet',wallet)



export default router


