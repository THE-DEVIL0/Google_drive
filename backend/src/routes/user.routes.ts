import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import userModel from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/register', (req: Request, res: Response) => {
    res.render('Sign_in/register');
});

router.post('/register',
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').trim().isEmail().withMessage('Please enter a valid email address'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            });
            return;
        }

        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        res.send("User Registered");
    }
);

router.get('/login', (req: Request, res: Response) => {
    res.render('Sign_in/login');
});

router.post('/login',
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    async (req: Request, res: Response) => {
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
            }, process.env.JWT_SECRET as string);

            res.cookie('token', token);

            res.redirect("/home");
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
);

export default router;