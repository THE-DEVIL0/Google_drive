"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const express_validator_1 = require("express-validator");
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', (0, express_validator_1.body)('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'), (0, express_validator_1.body)('email').trim().isEmail().withMessage('Please enter a valid email address'), (0, express_validator_1.body)('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            message: 'Invalid data'
        });
        return;
    }
    res.status(201).json({ message: 'User created' });
});
exports.default = router;
