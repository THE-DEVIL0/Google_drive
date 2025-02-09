import mongoose from "mongoose";

const connectToDB = () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error('MONGO_URI environment variable is not set');
        process.exit(1);
    }

    mongoose.connect(mongoUri)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        });
};

export default connectToDB;