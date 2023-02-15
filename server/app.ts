import express, {Request, Response} from 'express'
import cors from 'cors'

import middleware from './utils/middleware'

import fs from 'fs'
import morgan from 'morgan'
import path from 'path'
import signrouter from './Routes/Signup'
import profilerouter from './Routes/Userprofile'
import UserUploads from './Routes/UserUploads'
import conversationRouter from './Routes/Conversation'
import videouploadrouter from './Routes/VideoUploads'
// const bodyParser = require('body-parser');


// import config from "./utils/config";
// import initMongodb from "./utils/initMongodb";

const app = express()

app.use(express.json())
// app.use(fileUpload({useTimeFiles:true}))

// .........This is a middleware to parse cors........
app.use(cors())
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
console.log('accessLogStream',accessLogStream)

app.use(express.static('build'))

// app.use(express.static(path.join(__dirname,'../client/build')))
// app.get('*',function(req,res){
//     res.sendFile(path.join(__dirname,'../client/build/index.html'))
// })
app.use('/Routes', express.static('Routes'))
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
app.use(morgan('combined', { stream: accessLogStream }))
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('', signrouter)
app.use('', profilerouter)
app.use('', UserUploads)
app.use('',conversationRouter)
app.use('',videouploadrouter)

export default app
