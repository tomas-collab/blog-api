export const notFound = (err,req,res,next)=>{
    if(err){
        if(!req.headersSent){
            res
            .status(400)
            .send({message:err.message || 'not found', errors:err.errors || []})

    
        }
    }
    next()
}
export const forbidden = (err,req,res,next)=>{
    if(err && err.status === 403){
        {
            res
            .status(402)
            .send({message:err.message || 'forbidden'})

    
        }
    }
    next()
}



export const catchAllErroHandler = (err,req,res,next)=>{
    if(err){
        if(!req.headersSent){
            res
            .status(err.status|| 500)
            .send({message:err.message || 'something went wrong'})

    
        }
    }
    next()
}