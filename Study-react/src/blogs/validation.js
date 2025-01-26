import { checkSchema,validationResult } from "express-validator";

const schema = {
    title:{
        in:['body'],
        isString:{
            errorMessage:' title validation failed, types must be string'
        }
    },
    category:{
        in:['body'],
        isString:{
            errorMessage:' category validation failed, types must be string'
        }
    },
    content:{
        in:['body'],
        isString:{
            errorMessage:'content validation failed, types must be string'
        }
    },
    "author.name":{
        in:['body'],
        isString:{
            errorMessage:'author.name validation failed, types must be string'
        }
    },
    "author.avatar":{
        in:['body'],
        isString:{
            errorMessage:'author.avatar validation failed, types must be string'
        }
    },
    "readTime.value":{
        in:['body'],
        isString:{
            errorMessage:' readTime validation failed, types must be numeric'
        }
    },
    "readTime.unit":{
        in:['body'],
        isString:{
            errorMessage:' readUnite validation failed, types must be string'
        }
    },
    cover:{
        in:['body'],
        isString:{
            errorMessage:"cover validation failed, type must be string"
        }
    }
}
 const searchSchema = {
    title:{
        in:["query"],
        isString:{
            errorMessage: "title must be in query and type must be string to search",
        }
    }
 }

 const commentSchema = {
    text:{
        isString:{
            errorMessage:'text filed is required for comment'
        }
    },
    userName:{
        isString:{
            errorMessage:'user name is required for comment '
        }
    }
 }

 export const checkCommentSchema = checkSchema(commentSchema)
export const checkSearchSchema = checkSchema(searchSchema)
export const checkBlogPostSchema = checkSchema(schema)
export const checkValidationResult = (req,res,next)=>{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                const error = new Error('Blog post validation is failed')
                error.status = 400
                error.errors = errors.array()
                next(error)
            }
            next()
}