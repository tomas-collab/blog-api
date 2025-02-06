import { Router } from "express";
import authorsRoutes from './authors/routes.js'
import blogsRoutes from './blogs/routes.js'


const route = Router()

route.use('/authors',authorsRoutes,)
route.use('/blogs',blogsRoutes)
export default route