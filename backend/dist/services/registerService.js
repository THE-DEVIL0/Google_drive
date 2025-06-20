import jwt from "jsonwebtoken";
import sessionModel from "../models/session.model.js";
import userModel from "../models/user.model.js";
import VerificatoinCodeModel from "../models/verificationCode.model.js";
import { oneDayFromNow } from "../utils/date.js";
import getenv from "../constants/env.js";
export const CreateAccount = async (data) => {
    const existingUser = await userModel.exists({
        email: data.email,
        username: data.username
    });
    if (existingUser) {
        throw new Error("This email or username is already in use");
    }
    const user = await userModel.create({
        username: data.username,
        email: data.email,
        password: data.password
    });
    const verificationCode = await VerificatoinCodeModel.create({
        userId: user._id,
        type: "email-verification" /* VerificatoinCodeType.EmailVerification */,
        expiresat: oneDayFromNow(),
    });
    const session = await sessionModel.create({
        userId: user._id,
        sessionId: data.userAgent,
    });
    const refreshToken = jwt.sign({ sessionId: session._id }, getenv("JWT_SECRET"), { audience: ["user"],
        expiresIn: "30d"
    });
    const accessToken = jwt.sign({ userId: user.id,
        sessionId: session.id
    }, getenv("JWT_SECRET"), { audience: "user",
        expiresIn: "15m"
    });
    return {
        user,
        accessToken,
        refreshToken
    };
};
