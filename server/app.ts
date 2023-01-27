import express, {Request, Response} from 'express'
import cors from 'cors'
import http from 'http'
import middleware from './utils/middleware'
import logger from './utils/logger'
import fs from 'fs'
import morgan from 'morgan'
import path from 'path'
import signrouter from './Routes/Signup'
import profilerouter from './Routes/Userprofile'
import UserUploads from './Routes/UserUploads'
import conversationRouter from './Routes/Conversation'

import config from "./utils/config";

import initMongodb from "./utils/initMongodb";

const app = express()
const server = http.createServer(app);
app.use(express.json())
// .........This is a middleware to parse cors........
app.use(cors())
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
console.log('accessLogStream',accessLogStream)
app.use(express.static('build'))
app.use('/Routes', express.static('Routes'))
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
app.use(morgan('combined', { stream: accessLogStream }))

app.use('', signrouter)
app.use('', profilerouter)
app.use('', UserUploads)
app.use('',conversationRouter)
console.log('path',path.join)



import { Server } from "socket.io";

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
console.log("ax", server);

async function main() {
  await initMongodb.connect();

  server.listen(config.PORT, () => {
    logger.info(`Server rununing on port ${config.PORT}`);
  });
}
main();
io.on("connection", (socket: any) => {
  console.log("Connection Established");

  socket.on("join_room", (data: any) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  socket.on('typing', (room:any) => {
    socket.to(room).emit("typing",room);
    console.log('typing')
  });
  socket.on('stoptyping', (room:any) => {
    socket.to(room).emit("stoptyping",room);
    console.log('stoptyping');
  });

  console.log(socket.id)
  
  socket.emit('connection-success',{
    status:'connection-success',
    socketId:socket.id
  })

  // socket.on('disconnect',()=>{
  //    console.log(`${socket.id} has disconnected`)
  // })
  socket.on('sdp',(data:any)=>{
    console.log(data)
    socket.broadcast.emit('sdp',data)
  })

  socket.on('candidate',(data:any)=>{
    socket.broadcast.emit('candidate',data)
  })

  socket.on("ping", (data: any) => {
    console.log("data", data);
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    socket.broadcast.emit("callEnded")
  });
});

export default app
