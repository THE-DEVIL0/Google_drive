import mongoose from "mongoose";
const VerificatoinCodeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: true
    },
    type: {
        type: String,
        required: true,
    },
    createdat: {
        type: Date,
        required: true,
        default: Date.now()
    },
    expiresat: {
        type: Date,
        required: true,
    }
});
const VerificatoinCodeModel = mongoose.model("VerificationCode", VerificatoinCodeSchema, "Verificatoin_codes");
export default VerificatoinCodeModel;
