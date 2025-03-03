import express from 'express';
import uploadFile from '../config/upload';
import multer from 'multer';
import fileModel from '../models/file.model';

const uploader = multer({
    storage: multer.diskStorage({}),
    limits: {fileSize: 1000000},
})

const router = express.Router()

router.get('/', (req, res)=>{
    res.render('index')
} )

router.get('/home', (req,res)=>{
    res.render('Home')
})

router.post('/upload-file', uploader.single('file'), async (req,res)=>{
    try{
        const file = req.file
        if(!file){
            res.status(400).json({
                errors: 'Please provide a file'
            })
            return
        }
    const result = await uploadFile(file.path)

    const newFile = await fileModel.create({
        file_url: result?.secure_url
    })
    res.send({success: true, msg: "File uploaded successfully", url: newFile})
    
    }
    catch(error){
console.log(error.message);

    }
})




export default router  