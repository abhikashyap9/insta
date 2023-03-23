import jwt from 'jsonwebtoken'
import express, { Request, Response } from 'express'
import { UserType } from '../types/userType'

const getTokenFrom = (request: Request) => {
	const authorization = request.get('authorization')

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.split(' ')[1]
	}
	return null
}
export interface RequestAuthType extends Request {
	auth?: { userId?: any }
}
const userAuthentication = (req: RequestAuthType, res: Response, next: any) => {
	const token = getTokenFrom(req)
	console.log(token)
	const decodedToken = jwt.verify(token!, process.env.SECRET!) as UserType
	console.log('decoded', decodedToken)
	if (!decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid token' })
	}

	if (!req.body) {
		return res.status(400).json({ error: 'content missing' })
	}
	req['auth'] = {
		userId: decodedToken.id,
	}

	next()
}

export default userAuthentication
