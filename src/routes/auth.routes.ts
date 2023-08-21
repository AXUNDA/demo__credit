import express,{ Router, } from "express";
import authController from "../controllers/auth.controller";
import validate from "../middlewares/validateJson";
import { createUserSchema } from "../schema/user.schema";



const router:Router = express.Router()

router.post('/',validate(createUserSchema),authController.signUp)
router.post('/signin',validate(createUserSchema),authController.signIn)


export default router
