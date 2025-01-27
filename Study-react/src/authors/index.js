import express from 'express'
import fs from 'fs'
import path,{ dirname } from 'path'
import { fileURLToPath } from 'url'
import {parseFile,uploadFile} from "../util/upload/index.js"

import uniqid from 'uniqid'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const authorsFilePath = path.join(__dirname,"authors.json")
const router = express.Router()




//  GET   /////////////////////////   GET /////////////////////////   GET /////////////////////////





router.get('/', async(req,res,next)=>{
    try {
        const fileAsBuffer = fs.readFileSync(authorsFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJSON = JSON.parse(fileAsString)
        res.send(fileAsJSON)
    } catch (error) {
        res.sendStatus(500).send({message:error.message}) 
    }
})



// POST /////////////////////////  POST /////////////////////////  POST
router.post('/', async(req,res,next)=>{
    try {
        const {name,surname,email,dateOfBirth} = req.body
        const author = {
            id:uniqid(),
            name,
            surname,
            email,
            dateOfBirth,
            avatar:`https://ui-avatars.com/api/?name=${name}+${surname}`,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const fileAsBuffer = fs.readFileSync(authorsFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJSONArray = JSON.parse(fileAsString)
        fileAsJSONArray.push(author)
        fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray))
        res.send(author)


    } catch (error) {
        res.sendStatus(500).send({message:error.message})
    }
})



// GET BY ID///////////////////////// GET BY ID /////////////////////////



router.get('/:id', async(req,res,next)=>{
    try {
        const fileAsBuffer = fs.readFileSync(authorsFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJSONArray = JSON.parse(fileAsString)
        const author = fileAsJSONArray.find(
            (author)=>author.id === req.params.id
        )
        if(!author){
            res
            .status(404)
            .send({message:`author with ${req.params.id} is not found`})
        }
        res.send(author)
    } catch (error) {
        res.send(500).send({message:error.message})
    }
})



// DELETE///////////////////////////DELETE////////////////////////////////DELETE



router.delete("/:id", async(req,res,next)=>{
    try {
        const fileAsBuffer = fs.readFileSync(authorsFilePath)
        const fileAsString = fileAsBuffer.toString()
        let fileAsJSONArray = JSON.parse(fileAsString)
        const author = fileAsJSONArray.find(
            (author)=>author.id === req.params.id
        )
        if(!author){
            res
            .status(404)
            .send({message:`author with ${req.params.id} is not found`})
        }
        fileAsJSONArray = fileAsJSONArray.filter(
            (author) => author.id !== req.params.id
        )
        fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray))
        res.status(204).send()
    } catch (error) {
        res.send(500).send({message:error.message})
    }
})



//PUT/////////////////////////   PUT /////////////////////////   PUT /////////////////////////


router.put('/:id', async(req,res,next)=>{
    try {
        const fileAsBuffer = fs.readFileSync(authorsFilePath)
        const fileAsString = fileAsBuffer.toString()
        let fileAsJSONArray = JSON.parse(fileAsString)
        const authorINDEX = fileAsJSONArray.findIndex(
            (author)=>author.id === req.params.id
        )
        if(!authorINDEX== -1){
            res
            .status(404)
            .send({message:`author with ${req.params.id} is not found`})
        }
        fileAsJSONArray = fileAsJSONArray.filter(
            (author) => author.id !== req.params.id
        )
        const previousAuthorData = fileAsJSONArray[authorINDEX]
        const changedAuthor = {...previousAuthorData,...req.body, updatedAt:new Date(),id:req.params.id }
        fileAsJSONArray[authorINDEX] = changedAuthor

        fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray))
        res.send(changedAuthor)
    } catch (error) {
        res.send(500).send({message:error.message})
    }
})
router.put('/:id/avatar',parseFile.single("avatar"), async(req,res,next)=>{
    try {
        const fileAsBuffer = fs.readFileSync(authorsFilePath)
        const fileAsString = fileAsBuffer.toString()
        let fileAsJSONArray = JSON.parse(fileAsString)
        const authorINDEX = fileAsJSONArray.findIndex(
            (author)=>author.id === req.params.id
        )
        if(!authorINDEX== -1){
            res
            .status(404)
            .send({message:`author with ${req.params.id} is not found`})
        }
        fileAsJSONArray = fileAsJSONArray.filter(
            (author) => author.id !== req.params.id
        )
        const previousAuthorData = fileAsJSONArray[authorINDEX]

        const changedAuthor = {
            ...previousAuthorData,
            avatar:req.file.path, 
            updatedAt:new Date(),
            id:req.params.id  
        }
        fileAsJSONArray[authorINDEX] = changedAuthor

        fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray))
       
        res.send(changedAuthor)
    } catch (error) {
        res.send(500).send({message:error.message})
    }
})

export default router;