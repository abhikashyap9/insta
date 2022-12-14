import app from './app'
import http from 'http'
import config from './utils/config'
import logger from './utils/logger'
import initMongodb from './utils/initMongodb'

async function main() {
	await initMongodb.connect()

	const server = http.createServer(app)
	server.listen(config.PORT, () => {
		logger.info(`Server rununing on port ${config.PORT}`)
	})
}

main()
// mongodb+srv://abhishek:<password>@insta.bpmz0tv.mongodb.net/?retryWrites=true&w=majority
