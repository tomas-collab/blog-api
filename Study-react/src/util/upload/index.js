import multer from 'multer'

import path,{ dirname,extname } from 'path'

import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const publicDirectory = path.join(__dirname,"../../../public")

export const parseFile = multer()


export const uploadFile = (req,res,next)=>{
    try {
        res.send('ok')
        console.log('req',req.file)
        console.log('public',publicDirectory)
        const {originalname, buffer} = req.file
        const extension = extname(originalname)
        const fileName = `${req.params.id}${extension}`
        const pathToFile = path.join(publicDirectory,fileName) 
        fs.writeFileSync(pathToFile,buffer)
        const link = `http://localhost:3001/${req.params.id}${extension}`
   
        req.file = link
        next()
    } catch (error) {
        next(error)
    }
}