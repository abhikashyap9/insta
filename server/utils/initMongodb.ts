import config from './config'
import mongose from 'mongoose'
import logger from './logger'
import mongoose from 'mongoose'

export default {
	mongoose,
	connect: async () => {
		mongoose.Promise = Promise
		logger.info('connecting to ', config.MONGODB_URI)
		try {
			await mongoose.connect(config.MONGODB_URI!)
			logger.info('connected to Mongodb')
		} catch (error: any) {
			logger.info('error connecting to MongoDb', error.message)
			throw new Error('APP ERRORS: CONNECTION TO MONGODB FAILED')
		}
	},
	disconnect: (done) => {
		mongoose.disconnect(done)
	},
}
