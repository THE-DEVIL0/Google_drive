import jwt from "jsonwebtoken";
import sessionModel from "../models/session.model.js";
import userModel from "../models/user.model.js";
import VerificatoinCodeModel from "../models/verificationCode.model.js";
import { oneDayFromNow } from "../utils/date.js";
import getenv from "../constants/env.js";
import appAssert from "../utils/appAssert.js";
import { Conflict } from "../constants/https.js";
export const CreateAccount = async (data) => {
    const existingUser = await userModel.findOne({
        $or: [{ email: data.email }, { username: data.username }]
    });
    appAssert(!existingUser, Conflict, "username or email already exists");
    const user = await userModel.create({
        username: data.username,
        email: data.email,
        password: data.password
    });
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const verificationCode = await VerificatoinCodeModel.create({
        userId: user._id,
        code: otpCode,
        type: "email-verification" /* VerificatoinCodeType.EmailVerification */,
        expiresat: oneDayFromNow(),
        attemptsLeft: 3
    });
    const session = await sessionModel.create({
        userId: user._id,
        sessionId: data.userAgent,
    });
    const refreshToken = jwt.sign({ sessionId: session._id }, getenv("JWT_SECRET"), { audience: "user",
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
