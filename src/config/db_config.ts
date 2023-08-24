
import dotenv from "dotenv"
dotenv.config()


export default {
    db:process.env.db,
    password:process.env.db_pass,
    db_user:process.env.db_user,
    host:process.env.db_host,
    port:Number(process.env.db_port)
}