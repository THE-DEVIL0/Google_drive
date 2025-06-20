import express from "express";
import userRouter from "./routes/user.routes.js"; // Add `.js` if using ES Modules
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url"; // Required for ES Modules
import connectToDB from "./config/db.js";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index.routes.js"; // Add `.js` if using ES Modules
import cors from "cors";
import getenv from "./constants/env.js";
import errorHandler from "./middlewares/errorhandler.js";
import favicon from "serve-favicon"

// Configuring environment variables
dotenv.config();

// Manually define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: getenv("APP_ORIGIN"),
    credentials: true,
  })
);

app.use(cookieParser());

// View engine setup







app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../backend/src/views"));

app.use(express.static(path.join(__dirname, "../../public")));
app.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')));



// Routes
app.use("/user", userRouter);
app.use("/", indexRouter);

// Error handling middleware
app.use(errorHandler);

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
});

// Start the server
app.listen(3000, async () => {
  console.log("Server is running on Port 3000");
  await connectToDB();
});
