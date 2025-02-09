"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDB = () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error('MONGO_URI environment variable is not set');
        process.exit(1);
    }
    mongoose_1.default.connect(mongoUri)
        .then(() => {
        console.log('Connected to MongoDB');
    })
        .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });
};
exports.default = connectToDB;
