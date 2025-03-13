"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const catcherror_1 = __importDefault(require("../utils/catcherror"));
const zod_1 = __importDefault(require("zod"));
const registerSchema = zod_1.default.object({
    email: zod_1.default.string().email().min(1).max(255),
    username: zod_1.default.string().min(3, { message: "Username must be 3 characters long" }).max(255),
    password: zod_1.default.string().min(6, { message: "Password must be 6 characters long" }).max(255),
    confirmPassword: zod_1.default.string().min(6).max(255)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password mut be same",
    path: ["confirmPassword"]
});
exports.registerController = (0, catcherror_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = registerSchema.parse(Object.assign({}, req.body));
}));
