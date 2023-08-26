import express,{Application} from "express";
const app:Application = express();
import { errorHandler } from "./middlewares/errorHandler";
import routes from './routes/index.routes'
import morgan from "morgan"
import dotenv from "dotenv"
import http from "http"
import { notFound } from "./middlewares/notFound";
dotenv.config()


app.use(express.json())
app.use(morgan("dev"))
app.use('/',routes)
app.use(errorHandler)
app.use(notFound)

const server = http.createServer(app);
const port =  process.env.port || 3000


    server.listen(port,()=>{
        console.log(`Servidor rodando na porta ${port}`)
       
    
    
    })


    export default server


 


