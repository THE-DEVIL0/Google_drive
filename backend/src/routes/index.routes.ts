import express from 'express';
import uploadFile from '../config/upload';
import fileModel from '../models/file.model';

const router = express.Router()

router.get('/', (req, res)=>{
    res.render('index')
} )

router.get('/home', (req,res)=>{
    res.render('Home')
})




export default router  