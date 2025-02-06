import { Router } from "express";
import * as blogsHandlers from "./handlers.js";


const route = Router()

route.get("/", blogsHandlers.getAll)
route.get('/:blog_id',blogsHandlers.single)
route.post("/",blogsHandlers.create)
route.put("/:blog_id",blogsHandlers.updtate)
route.delete("/:blog_id",blogsHandlers.deleteOne)


export default route
