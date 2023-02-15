import logger from './logger'

const requestLogger = (req: any, res: any, next: any) => {
	logger.info('Method', req.method)
	logger.info('Path', req.path)
	logger.info('Body:', req.body)
	logger.info('....')
	next()
}

// const unknownendPoints = (request: any, response: any, next: any) => {
// 	response.status(404).send({error: 'unknown endpoints'})
// }

const errorHandler = (error: any, request: any, response: any, next: any) => {
	if (error.name === 'CastError') {
		return response.status(400).send({error: 'malformatted id'})
	}
	if (error.name === 'Validation Error') {
		return response.status(400).json({error: error.message, numb: ''})
	}
	if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({error: error.message})
	}
	// if(error.name ==='TokenExpiredError'){
	//     return response.status(401).json({ error: error.message });
	// }
	next(error)
}
export default {errorHandler, requestLogger}
