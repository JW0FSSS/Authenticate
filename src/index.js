import express from 'express'
import './config/enviroment.js'
import { connection } from './config/db.js'

const app = express()

app.use((req, res)=>{
 res.send('error 404')
})

async function server() {
    try {
        await connection.authenticate()
        console.log('Database turn on...');
        app.listen(3000,()=>console.log('server on.. http://localhost:3000'))
        
    } catch (error) {
        throw new Error(`error ${error}`)
    }
}

server()

