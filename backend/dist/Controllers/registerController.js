import catcherror from "../utils/catcherror.js";
import z from "zod";
const registerSchema = z.object({
    email: z.string().email().min(1).max(255),
    username: z.string().min(3, { message: "Username must be 3 characters long" }).max(255),
    password: z.string().min(6, { message: "Password must be 6 characters long" }).max(255),
    confirmPassword: z.string().min(6).max(255)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password mut be same",
    path: ["confirmPassword"]
});
export const registerController = catcherror(async (req, res) => {
    const request = registerSchema.parse({
        ...req.body,
    });
});
