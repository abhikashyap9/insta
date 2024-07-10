import express, {Request, Response} from 'express'
import cors from 'cors'
import middleware from './utils/middleware'
import fs from 'fs'
import morgan from 'morgan'
import path from 'path'
import signrouter from './src/Controller/Auth/auth.route'
import profilerouter from './src/Routes/Userprofile'
import UserUploads from './src/Routes/UserUploads'
import conversationRouter from './src/Routes/Conversation'
import videouploadrouter from './src/Routes/VideoUploads'
// const bodyParser = require('body-parser');

// import config from "./utils/config";
// import initMongodb from "./utils/initMongodb";

const app = express()

app.use(express.json())
// app.use(fileUpload({useTimeFiles:true}))

// .........This is a middleware to parse cors........
app.use(cors())
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

app.use(express.static('build'))

// app.use(express.static(path.join(__dirname,'../client/build')))
// app.get('*',function(req,res){
//     res.sendFile(path.join(__dirname,'../client/build/index.html'))
// })
app.use('/Routes', express.static('Routes'))
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
app.use(morgan('combined', {stream: accessLogStream}))
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/auth/', signrouter)
app.use('', profilerouter)
app.use('', UserUploads)
app.use('', conversationRouter)
app.use('', videouploadrouter)
app.use('/', (req, res) => {
	res.send('welcome')
})

export default app
