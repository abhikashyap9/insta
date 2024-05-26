import app from './app'
import http from 'http'
const server = http.createServer(app);
import config from "./utils/config";
import initMongodb from "./utils/initMongodb";
import { Server } from "socket.io";
import logger from './utils/logger'

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

async function main() {
  await initMongodb.connect();

  server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
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
    // console.log('typing')
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
  // socket.on('sdp',(data:any)=>{
  //   console.log(data)
  //   socket.to(data).emit("sdp",data)
  // })
  socket.on('sdp',(data:any)=>{
    // console.log(data)
    socket.broadcast.emit('sdp',data)
  })

  socket.on('candidate',(data:any)=>{
    console.log(data)
    socket.broadcast.emit('candidate',data)
  })

  socket.on("ping", (data: any) => {
    console.log("data", data.room);
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });
  socket.on("join_rooms",(room:any)=>{
    console.log('joinRoom',room);
    socket.join(room);
    socket.to(room).emit("join", "User joined the room");
  })


  
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    socket.broadcast.emit("callEnded")
  });

  
});