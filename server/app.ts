import express, {Request, Response} from 'express'
import cors from 'cors'
import http from 'http'
import middleware from './utils/middleware'
import logger from './utils/logger'
import signrouter from './Routes/Signup'
import profilerouter from './Routes/Userprofile'
import UserUploads from './Routes/UserUploads'
import ConversationSchema from './Schemas/ConversationSchema'
import conversationRouter from './Routes/Conversation'
const app = express()
// import {Server} from "socket.io"
// import {server} from './index'

// const io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//     },
//   });
// console.log('ax',server);
  
//     // io.on("connection",(socket:any)=>{
//     //       console.log('Connection Established')
//     //       socket.on('ping', (msg:any) => {
//     //           console.log('message: ' + msg);
//     //         });
//     //   })
 

// console.log('Helllllooo world')
// ...........This is a middleware to parse json.....

app.use(express.json())
// .........This is a middleware to parse cors........
app.use(cors())
app.use(express.static('build'))
app.use('/Routes', express.static('Routes'))
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
app.use('', signrouter)
app.use('', profilerouter)
app.use('', UserUploads)
app.use('',conversationRouter)

export default app
