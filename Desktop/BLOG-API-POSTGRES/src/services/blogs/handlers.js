import db from "../../db/connection.js"



// export const list  = async (req,res,next)=> {
//     try {
//         const result = await db.query((`SELECT NOW()`))
//         res.send(result)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }






///////////////////////////////get all blogs///////////////////////////////////////////////


export const getAll  =async (req,res,next)=> {
    try {
        const blog =await  db.query(`SELECT * FROM public.blogs`)
        res.send(blog.rows)
    } catch (error) {
        res.status(500).send(error)
    }
}


///////////////////////////////post blogs///////////////////////////////////////////////


export const create  =async (req,res,next)=> {
    try {
        const {title,category,content,read_time_unit, read_time_value,author_id} = req.body;
        const blog =await  db.query(`INSERT INTO blogs(title,category,content,read_time_unit, read_time_value,author_id) VALUES('${title}','${category}','${content}','${read_time_unit}','${read_time_value}','${author_id}' )RETURNING *`)
        res.send(blog.rows[0])
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}




///////////////////////////////get single blog///////////////////////////////////////////////


export const single  = async (req,res,next)=> {
    try {
        const {blog_id} = req.params;
        const blog =await  db.query(`SELECT * FROM blogs WHERE blog_id=${blog_id} `)
        const[found,...rest] = blog.rows
        res.status(found? 200:404).send(found)
    } catch (error) {
        res.status(500).send(error)
    }
}

//////////////////////////////update single blog///////////////////////////////////////////////
export const updtate = async (req,res,next)=> {
    try {
        const {blog_id} = req.params;
        const {title, category,content,read_time_unit,read_time_value,author_id} = req.body
        const blog =await  db.query(`
            UPDATE blogs 
            SET title='${title}', category='${category}',content= '${content}',read_time_unit='${read_time_unit}', read_time_value= '${read_time_value}',author_id= '${author_id}', updated_at = NOW() WHERE blog_id=${blog_id} RETURNING *`)
        const[found,...rest] = blog.rows
        res.status(found? 200:400).send(found)
    } catch (error) {
        res.status(500).send(error)
    }
}



///////////////////////////////delete single blog///////////////////////////////////////////////


export const deleteOne = async (req,res,next)=> {
    try {
        const {blog_id} = req.params;
        // const {name, last_name,avatar} = req.body
        const blog =await  db.query(`
            DELETE FROM blogs WHERE blog_id=${blog_id} `)
        
        res.status(blog.rowCount? 200:400).send()
    } catch (error){
         res.status(500).send(error)
    }
    }





