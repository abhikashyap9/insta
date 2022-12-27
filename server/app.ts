import express, {Request, Response} from 'express'
import cors from 'cors'
import http from 'http'
import middleware from './utils/middleware'
import logger from './utils/logger'
import signrouter from './Routes/Signup'
import profilerouter from './Routes/Userprofile'
import UserUploads from './Routes/UserUploads'
import conversationRouter from './Routes/Conversation'
const app = express()

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
