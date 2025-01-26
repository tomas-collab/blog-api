import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import authorsRouter from './authors/index.js'
import blogsRouter from './blogs/index.js'
import {notFound, forbidden, catchAllErroHandler} from './errorHandlers.js'

import path,{ dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const publicDirectory = path.join(__dirname,"../public")

const server = express();
const {PORT } = process.env

 
server.use(cors())
server.use(express.json())
server.use(express.static(publicDirectory))

server.use('/authors', authorsRouter)
server.use('/blogs',blogsRouter)

server.use(notFound)
server.use(catchAllErroHandler)
server.use(forbidden)

console.log(listEndpoints(server))

server.listen(PORT, () => console.log("✅ server is running on port:", PORT))

server.on('error',(error)=> console.log(`server is not runnig due to: ${error}`))