import app from './app'
import http from 'http'
import config from './utils/config'
import logger from './utils/logger'
import initMongodb from './utils/initMongodb'
const server = http.createServer(app)
import {Server} from "socket.io"


const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
console.log('ax',server);
  
  
async function main() {
	await initMongodb.connect()

	server.listen(config.PORT, () => {
		logger.info(`Server rununing on port ${config.PORT}`)
	})
}
main()
  io.on("connection",(socket:any)=>{
          console.log('Connection Established')
          socket.on('ping', (msg:any) => {
              console.log('message: ' + msg)
            });
      })

// const server = http.createServer(app)
	
// mongodb+srv://abhishek:<password>@insta.bpmz0tv.mongodb.net/?retryWrites=true&w=majority
