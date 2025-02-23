import express from 'express';

const router = express.Router()

router.get('/', (req, res)=>{
    res.render('index')
} )

router.get('/home', (req,res)=>{
    res.render('Home')
})

export default router  