
import express from  'express'
import {ConnectCloudinary} from './config/cloudinary.js'
import http from 'http'

import {config} from 'dotenv'



import cors from 'cors'
import { ConnectDB } from './config/mongoDB.js'
import { userRouter } from './routes/Authentication.js'
import { bloodR } from './routes/bloodRequest.js'





const app=express()
const server =http.createServer(app)









config()
ConnectCloudinary()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/user/api',userRouter)
app.use('/request/api',bloodR)



ConnectDB()
// creating the connection 

console.log(process.env.MONGO_URL)
app.get('/',(req,res)=>{
    res.json('landing page is here ')
})

server.listen(3000,()=>{
    console.log('http://localhost:3000')
})