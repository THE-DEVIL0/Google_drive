import mongoose from "mongoose";
import { thirtyDaysFromNow } from "../utils/date.js";
const sessionSchema = new mongoose.Schema({
    userId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        index: true,
    },
    userAgent: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    expiresAt: {
        type: Date, default: thirtyDaysFromNow
    }
});
const sessionModel = mongoose.model("Session", sessionSchema);
export default sessionModel;
