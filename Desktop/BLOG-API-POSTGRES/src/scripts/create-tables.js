import fs from 'fs-extra'
import {join} from 'path'
import db from '../db/connection.js'

const sqlFilePath = join(process.cwd(),"src/sql/create-table.sql")


const createDefaultTables = async ()=>{
    try {
        const sqlCommandsBuffer = await fs.readFile(sqlFilePath )
        const sqlCommands = sqlCommandsBuffer.toString()
        const result = await db.query(sqlCommands)
        console.log(result)
        console.log(`✅default tables are created`)
    } catch (error) {
        console.log(`x default tables are not created`)
        console.log(error)
    }
}

export default createDefaultTables