import { Router } from "express";
import * as authorsHandlers from "./handlers.js";


const route = Router()

route.get("/", authorsHandlers.getAll)
route.get('/:author_id',authorsHandlers.single)
route.post("/",authorsHandlers.create)
route.put("/:author_id",authorsHandlers.updtate)
route.delete("/:author_id",authorsHandlers.deleteOne)

export default route
