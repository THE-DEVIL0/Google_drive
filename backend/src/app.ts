import express  from "express"
import userRouter from "./routes/user.routes"
import path from "path"
import dotenv from "dotenv"
import connectToDB from "./config/db"
import cookieParser from "cookie-parser"
import indexRouter from "./routes/index.routes"
import { log } from "console"

dotenv.config()
connectToDB()

const app = express()

app.use(cookieParser())

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "../../backend/src/views"));

app.use(express.json())
app.use(express.urlencoded({extended: true})) 

app.use(express.static(path.join(__dirname, "../../public")));

app.use('/user', userRouter)

app.use('/', indexRouter)


process.on('uncaughtException',(err)=>{
    console.log(err.name , err.message);
    
})

app.listen(3000, ()=>{
    console.log("Server is running on Port 3000");
    
})