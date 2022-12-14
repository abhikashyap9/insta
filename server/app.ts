import express, {Request, Response} from 'express'
import cors from 'cors'
import middleware from './utils/middleware'
import logger from './utils/logger'

// const notesRouter = require('./notes/maintrail')
// const blogRouter = require('./notes/secontrail.js')
// const logRouter = require('./notes/loggingtrail.js')
import signrouter from './Routes/Signup'
import profilerouter from './Routes/Userprofile'
import UserUploads from './Routes/UserUploads'
const app = express()
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

export default app
