import express from 'express'
const router = express.Router()




router.get('/', (req, res)=>{
    res.render('index')
} )

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register', (req, res)=>{
    
})

export default router
