import express from 'express'
import {body, validationResult} from 'express-validator'
import userModel from '../models/user.model'
import bcrypt from 'bcrypt'



const router = express.Router()
router.get('/', (req, res)=>{
    res.render('index')
} )

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',
body('username').trim().isLength({min: 3}).withMessage('Username must be at least 3 characters long'),  
body('email').trim().isEmail().withMessage('Please enter a valid email address'), 
body('password').trim().isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
async (req,res)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
         res.status(400).json({
            errors: errors.array(),
            message: 'Invalid data'
            
        })
        return
    }
    const {username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    })
    
    
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',
 body('username').trim().isLength({min: 3}).withMessage('Username must be atleast 3 charaters long'),
 body('password').trim().isLength({min:6}).withMessage('Password must be atleast 6 chatacters long'),

     async (req,res)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
            return}
            
    const {username,password}=req.body 

    const user = await userModel.findOne({
        username : username
    })

    if(!user){
         res.status(400).json({
            message: "username or password is incorrect"
        })
        return
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        res.status(400).json({
            message: "username or password is incorrect"
        })
        return
    }

})

export default router
