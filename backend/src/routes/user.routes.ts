import express from 'express'
const router = express.Router()
import {body, validationResult} from 'express-validator'




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
(req,res)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
         res.status(400).json({
            errors: errors.array(),
            message: 'Invalid data'
            
        })
        return
    }
    res.status(201).json({message: 'User created'})
    
})

export default router
