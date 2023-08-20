import express,{Application} from "express";
const app:Application = express();
import { errorHandler } from "./middlewares/errorHandler";

app.use(express.json())
app.use(errorHandler)


app.listen(3000,async ()=>{
    console.log("listening")
  

})