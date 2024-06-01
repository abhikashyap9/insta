"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const config_1 = __importDefault(require("./utils/config"));
const initMongodb_1 = __importDefault(require("./utils/initMongodb"));
const socket_io_1 = require("socket.io");
const logger_1 = __importDefault(require("./utils/logger"));
const server = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield initMongodb_1.default.connect();
    });
}
main();
io.on("connection", (socket) => {
    console.log("Connection Established");
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
    socket.on('typing', (room) => {
        socket.to(room).emit("typing", room);
        // console.log('typing')
    });
    socket.on('stoptyping', (room) => {
        socket.to(room).emit("stoptyping", room);
        console.log('stoptyping');
    });
    console.log(socket.id);
    socket.emit('connection-success', {
        status: 'connection-success',
        socketId: socket.id
    });
    // socket.on('disconnect',()=>{
    //    console.log(`${socket.id} has disconnected`)
    // })
    // socket.on('sdp',(data:any)=>{
    //   console.log(data)
    //   socket.to(data).emit("sdp",data)
    // })
    socket.on('sdp', (data) => {
        // console.log(data)
        socket.broadcast.emit('sdp', data);
    });
    socket.on('candidate', (data) => {
        console.log(data);
        socket.broadcast.emit('candidate', data);
    });
    socket.on("ping", (data) => {
        console.log("data", data.room);
        socket.to(data.room).emit("receive_message", data);
        console.log(data);
    });
    socket.on("join_rooms", (room) => {
        console.log('joinRoom', room);
        socket.join(room);
        socket.to(room).emit("join", "User joined the room");
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
        socket.broadcast.emit("callEnded");
    });
});
server.listen(config_1.default.PORT, () => {
    logger_1.default.info(`Server running on port ${config_1.default.PORT}`);
});
