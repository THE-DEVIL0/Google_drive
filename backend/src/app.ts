import express  from "express"
import userRouter from "./routes/user.routes"
import path from "path"
import dotenv from "dotenv"
import connectToDB from "./config/db"
import cookieParser from "cookie-parser"
import indexRouter from "./routes/index.routes"
import cors from "cors"
import getenv from "./constants/env"
import errorHanlder from "./middlewares/errorhandler"


dotenv.config()


const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true})) 

app.use(cors({
    origin: getenv("APP_ORIGIN"),
    credentials: true
}))

app.use(cookieParser())

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "../../backend/src/views"));

app.use(express.static(path.join(__dirname, "../../public")));



app.use('/user', userRouter)

app.use('/', indexRouter)

app.use(errorHanlder)


process.on('uncaughtException',(err)=>{
    console.log(err.name , err.message);
    
})

app.listen(3000, async()=>{
    console.log("Server is running on Port 3000");
    await connectToDB()
    
})


