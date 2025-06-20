import express from 'express';
import { body, validationResult } from 'express-validator';
import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerController } from '../Controllers/registerController.js';
const router = express.Router();
router.get('/auth', (req, res) => {
    res.render('auth');
});
router.post('/register', registerController, async (req, res) => {
    res.send("User Registered");
});
router.post('/login', body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'), body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            });
            return;
        }
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user) {
            res.status(400).json({
                message: "username or password is incorrect"
            });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                message: "username or password is incorrect"
            });
            return;
        }
        const token = jwt.sign({
            userId: user.id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET);
        res.cookie('token', token);
        res.redirect("/home");
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});
export default router;
