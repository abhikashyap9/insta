import app from "./app";
import http from "http";
import config from "./utils/config";
import logger from "./utils/logger";
import initMongodb from "./utils/initMongodb";
const server = http.createServer(app);

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
console.log(config.PORT)
// const server = http.createServer(app)

// mongodb+srv://abhishek:<password>@insta.bpmz0tv.mongodb.net/?retryWrites=true&w=majority
