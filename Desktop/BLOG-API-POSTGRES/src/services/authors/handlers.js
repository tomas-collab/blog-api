import db from "../../db/connection.js"


///////////////////////////////get all authors///////////////////////////////////////////////


export const getAll  =async (req,res,next)=> {
    try {
        const author =await  db.query(`SELECT * FROM public.authors`)
        res.send(author.rows)
    } catch (error) {
        res.status(500).send(error)
    }
}


///////////////////////////////post authors///////////////////////////////////////////////


export const create  =async (req,res,next)=> {
    try {
        const {name,last_name,avatar} = req.body;
        const author =await  db.query(`INSERT INTO authors(name,last_name,avatar) VALUES('${name}','${last_name}','${avatar}')RETURNING *`)
        res.send(author.rows[0])
    } catch (error) {
        res.status(500).send(error)
    }
}




///////////////////////////////get single author///////////////////////////////////////////////


export const single  = async (req,res,next)=> {
    try {
        const {author_id} = req.params;
        const author =await  db.query(`SELECT * FROM authors WHERE author_id=${author_id} `)
        const[found,...rest] = author.rows
        res.status(found? 200:404).send(found)
    } catch (error) {
        res.status(500).send(error)
    }
}

//////////////////////////////update single author///////////////////////////////////////////////
export const updtate = async (req,res,next)=> {
    try {
        const {author_id} = req.params;
        const {name, last_name,avatar} = req.body
        const author =await  db.query(`
            UPDATE authors 
            SET name='${name}', last_name='${last_name}',avatar= '${avatar}' updated_at = NOW() WHERE author_id=${author_id} RETURNING *`)
        const[found,...rest] = author.rows
        res.status(found? 200:400).send(found)
    } catch (error) {
        res.status(500).send(error)
    }
}



///////////////////////////////delete single author///////////////////////////////////////////////


export const deleteOne = async (req,res,next)=> {
    try {
        const {author_id} = req.params;
        const {name, last_name,avatar} = req.body
        const author =await  db.query(`
            DELETE FROM authors WHERE author_id=${author_id} `)
        
        res.status(author.rowCount? 200:400).send()
    } catch (error){
         res.status(500).send(error)
    }
    }

