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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', (0, express_validator_1.body)('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'), (0, express_validator_1.body)('email').trim().isEmail().withMessage('Please enter a valid email address'), (0, express_validator_1.body)('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            message: 'Invalid data'
        });
        return;
    }
    const { username, email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = yield user_model_1.default.create({
        username,
        email,
        password: hashedPassword
    });
}));
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', (0, express_validator_1.body)('username').trim().isLength({ min: 3 }).withMessage('Username must be atleast 3 charaters long'), (0, express_validator_1.body)('password').trim().isLength({ min: 6 }).withMessage('Password must be atleast 6 chatacters long'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            message: 'Invalid data'
        });
        return;
    }
    const { username, password } = req.body;
}));
exports.default = router;
