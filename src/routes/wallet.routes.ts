import walletController from "../controllers/wallet.controller";
import express,{ Router, } from "express";
const router:Router = express.Router()
import checkToken from "../middlewares/checkToken";
import verifyBalance from "../middlewares/verifyBalance";

router.use(checkToken)

router.get('/',walletController.getBalance)
router.post('/transfer',verifyBalance,walletController.transfer)
router.post('/withdraw',verifyBalance,walletController.withdraw)
router.post('/topup',walletController.topUp)

export default router
