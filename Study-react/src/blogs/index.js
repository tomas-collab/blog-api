import express from 'express'
import fs from 'fs'
import path,{ dirname, parse } from 'path'
import { fileURLToPath } from 'url'
import uniqid from 'uniqid'
import { checkBlogPostSchema,checkValidationResult,checkSearchSchema, checkCommentSchema } from './validation.js'
import { parseFile,uploadFile } from '../util/upload/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const blogsFilePath = path.join(__dirname,"blogs.json")
const router = express.Router()




//  GET   /////////////////////////   GET /////////////////////////   GET /////////////////////////





router.get('/', async(req,res,next)=>{
    try {
        const fileAsBuffer = fs.readFileSync(blogsFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJSON = JSON.parse(fileAsString)
        res.send(fileAsJSON)
    } catch (error) {
        res.sendStatus(500).send({message:error.message}) 
    }
})


// search 
router.get('/search', checkSearchSchema,checkValidationResult, async(req,res,next)=>{
    try {
        const {title} = req.query
        const fileAsBuffer = fs.readFileSync(blogsFilePath)
        const fileAsString = fileAsBuffer.toString()
        const array = JSON.parse(fileAsString)
        const filtered = array.filter((blog)=>
         blog.title.toLowerCase().includes(title.toLocaleLowerCase)
        )
        res.send(filtered)
    } catch (error) {
        res.sendStatus(500) .send({message:error.message}) 
    }
})



// POST /////////////////////////  POST /////////////////////////  POST
router.post('/', checkBlogPostSchema,checkValidationResult, async(req,res,next)=>{
    try {
        
        const blog = {
            id:uniqid(),
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const fileAsBuffer = fs.readFileSync(blogsFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJSONArray = JSON.parse(fileAsString)
        fileAsJSONArray.push(blog)
        fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray))
        res.send(blog)


    } catch (error) {
        res.sendStatus(500).send({message:error.message})
    }
})




// GET BY ID///////////////////////// GET BY ID /////////////////////////



router.get('/:id', async(req,res,next)=>{
    try {
        const fileAsBuffer = fs.readFileSync(blogsFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJSONArray = JSON.parse(fileAsString)
        const blog = fileAsJSONArray.find(
            (blog)=>blog.id === req.params.id
        )
        if(!blog){
            res
            .status(404)
            .send({message:`blog with ${req.params.id} is not found`})
        }
        res.send(blog)
    } catch (error) {
        res.send(500).send({message:error.message})
    }
})



// DELETE///////////////////////////DELETE////////////////////////////////DELETE



router.delete("/:id", async(req,res,next)=>{
    try {
        const fileAsBuffer = fs.readFileSync(blogsFilePath)
        const fileAsString = fileAsBuffer.toString()
        let fileAsJSONArray = JSON.parse(fileAsString)
        const blog = fileAsJSONArray.find(
            (blog)=>blog.id === req.params.id
        )
        if(!blog){
            res
            .status(404)
            .send({message:`blog with ${req.params.id} is not found`})
        }
        fileAsJSONArray = fileAsJSONArray.filter(
            (blog) => blog.id !== req.params.id
        )
        fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray))
        res.status(204).send()
    } catch (error) {
        res.send(500).send({message:error.message})
    }
})



//PUT/////////////////////////   PUT /////////////////////////   PUT /////////////////////////


router.put('/:id', async(req,res,next)=>{
    try {
        const fileAsBuffer = fs.readFileSync(blogsFilePath)
        const fileAsString = fileAsBuffer.toString()
        let fileAsJSONArray = JSON.parse(fileAsString)
        const blogINDEX = fileAsJSONArray.findIndex(
            (blog)=>blog.id === req.params.id
        )
        if(!blogINDEX== -1){
            res
            .status(404)
            .send({message:`blog with ${req.params.id} is not found`})
        }
        fileAsJSONArray = fileAsJSONArray.filter(
            (blog) => blog.id !== req.params.id
        )
        const previousblogData = fileAsJSONArray[blogINDEX]
        const changedblog = {
            ...previousblogData,
            cover:req.file, 
            updatedAt:new Date(),
            id:req.params.id }
        fileAsJSONArray[blogINDEX] = changedblog

        fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray))
        res.send(changedblog)
    } catch (error) {
        res.sendStatus(500).send({message:error.message})
    }
})
router.put('/:id/comment',checkCommentSchema,checkValidationResult, async(req,res,next)=>{
    try {
        const {text,userName} = req.body
        const comment = {id:uniqid(),text,userName,createdAt:new Date()}
        const fileAsBuffer = fs.readFileSync(blogsFilePath)
        const fileAsString = fileAsBuffer.toString()
        let fileAsJSONArray = JSON.parse(fileAsString)
        const blogINDEX = fileAsJSONArray.findIndex(
            (blog)=>blog.id === req.params.id
        )
        if(!blogINDEX== -1){
            res
            .status(404)
            .send({message:`blog with ${req.params.id} is not found`})
        }
        // fileAsJSONArray = fileAsJSONArray.filter(
        //     (blog) => blog.id !== req.params.id
        // )
        const previousblogData = fileAsJSONArray[blogINDEX]
        previousblogData.comments  = previousblogData.comments || []
        const changedblog = {
            ...previousblogData,
            ...req.body, 
            comments:[...previousblogData.comments,comment],
            updatedAt:new Date(),
            id:req.params.id }
        fileAsJSONArray[blogINDEX] = changedblog

        fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray))
        res.send(changedblog)
    } catch (error) {
        res.sendStatus(500).send({message:error.message})
    }
})




//////upload file///////////////////////////
router.put('/:id/cover',parseFile.single("cover"),uploadFile, async(req,res,next)=>{
    try {
        const fileAsBuffer = fs.readFileSync(blogsFilePath)
        const fileAsString = fileAsBuffer.toString()
        let fileAsJSONArray = JSON.parse(fileAsString)
        const blogINDEX = fileAsJSONArray.findIndex(
            (blog)=>blog.id === req.params.id
        )
        if(!blogINDEX== -1){
            res
            .status(404)
            .send({message:`blog with ${req.params.id} is not found`})
        }
        fileAsJSONArray = fileAsJSONArray.filter(
            (blog) => blog.id !== req.params.id
        )
        const previousblogData = fileAsJSONArray[blogINDEX]
        const changedblog = {...previousblogData,...req.body, updatedAt:new Date(),id:req.params.id }
        fileAsJSONArray[blogINDEX] = changedblog

        fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray))
        res.send(changedblog)
    } catch (error) {
        res.send(500).send({message:error.message})
    }
})

export default router;