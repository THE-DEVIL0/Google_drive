import express, { response } from "express"
import userRouter from "./routes/user.routes"
import path from "path"
import dotenv from "dotenv"
import connectToDB from "./config/db"

dotenv.config()
connectToDB()

const app = express()

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "../../backend/src/views"));

app.use(express.json())
app.use(express.urlencoded({extended: true})) 

app.use(express.static(path.join(__dirname, "../../public")));

app.use('', userRouter)



app.listen(3000, ()=>{
    console.log("Server is running on Port 3000");
    
})