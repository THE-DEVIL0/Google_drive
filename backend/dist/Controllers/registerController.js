import { CreateAccount } from "../services/registerService.js";
import catcherror from "../utils/catcherror.js";
import z from "zod";
import { setAuthCookies } from "../utils/cookies.js";
const registerSchema = z.object({
    email: z.string().email().min(1).max(255),
    username: z.string().min(3, { message: "Username must be 3 characters long" }).max(255),
    password: z.string().min(6, { message: "Password must be 6 characters long" }).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password mut be same",
    path: ["confirmPassword"]
});
export const registerController = catcherror(async (req, res, next) => {
    const request = registerSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { user, accessToken, refreshToken } = await CreateAccount(request);
    setAuthCookies({ res, accessToken, refreshToken });
    res.locals.user = user; // ✅ Pass user to next handler
    next(); // ✅ Continue to next middleware
});
