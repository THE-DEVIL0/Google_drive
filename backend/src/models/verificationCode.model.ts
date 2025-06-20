import mongoose from "mongoose";
import VerificatoinCodeType from "../constants/verificationCodetype";


export interface verificationCodeDocument extends mongoose.Document{
    userId: mongoose.Types.ObjectId;
    type:  VerificatoinCodeType;
    createdat : Date;
    expiresat: Date;

}

const VerificatoinCodeSchema = new mongoose.Schema<verificationCodeDocument>({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: true
    },
    type : {
        type: String,
        required : true, 
    },
    createdat:{
        type: Date,
        required: true,
        default: Date.now()
    },
    expiresat:{
        type: Date,
        required: true,
    }
})

const VerificatoinCodeModel = mongoose.model<verificationCodeDocument>(
    "VerificationCode",
    VerificatoinCodeSchema,
    "Verificatoin_codes"

)

export default VerificatoinCodeModel