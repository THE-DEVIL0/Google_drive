
import mongoose from "mongoose";
import getenv from "../constants/env.js"; // Added .js for ES Module compatibility

const connectToDB = async () => {
    const mongoUri = getenv('MONGO_URI')
try{
    await  mongoose.connect(mongoUri)
}
        catch(error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        };
      console.log("Connected to MongoDB");
        
};

export default connectToDB;


