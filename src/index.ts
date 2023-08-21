import express,{Application} from "express";
const app:Application = express();
import { errorHandler } from "./middlewares/errorHandler";
import routes from './routes/index.routes'
import morgan from "morgan"
import dotenv from "dotenv"
dotenv.config()

app.use(express.json())
app.use(morgan("dev"))
app.use('/',routes)
app.use(errorHandler)



app.listen(3000,async ()=>{
    console.log("listening")
  

})