import jwt from 'jsonwebtoken'
import express, { Request, Response } from 'express'
export const signrouter = express.Router({
	strict: true,
})
import bcrypt from 'bcrypt'
import Signupuser from '../Schemas/Signupschema'
import Profile from '../Schemas/Profile'
import userAuthentication from '../middeware/jwtauthorization'
import { ReqAuthType, UserType } from '../types/userType'

signrouter.post('/signup', async (req: Request, res: Response) => {
	const { email, fullName, userName, password } = req.body
	console.log('reqBody', req.body)

	const userEmailExist = await Signupuser.findOne({ email })
	const userNameExist = await Signupuser.findOne({ fullName })
	console.log(userEmailExist)
	console.log(userNameExist)

	if (userEmailExist) {
		return res.status(409).json({ error: 'User Email Already Exist' })
	}

	if (userNameExist) {
		return res.status(409).json({ error: 'User Name Already Exist' })
	}

	const saltRounds = 10

	const hashedPassword = await bcrypt.hash(password, saltRounds)

	const signupuser = new Signupuser({
		email: email,
		fullName: fullName,
		userName: userName,
		password: hashedPassword,
	})

	try {
		let savedUser = await signupuser.save()
		res.status(201).json(savedUser).end()
	} catch (err) {
		res.status(400).send(err)
	}
})

signrouter.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body
	console.log('req', req.body)

	const user = await Signupuser.findOne({ email })
	console.log('user',user)
	const passwordCorrect = await bcrypt.compare(password, user?.password!)
    
	if (!(user && passwordCorrect)) {
		return res.status(401).json({ error: 'Invalid Password' })
	}
	const useForToken = {
		username: user.userName,
		id: user._id,
	}

	const token = jwt.sign(useForToken, process.env.SECRET!, {
		expiresIn: 600 * 600,
	})
	res.status(200).send({
		token,
		username: user.fullName,
		userfullname: user.userName,
		id: user._id,
	})
})

const getTokenFrom = (request: Request) => {
	const authorization = request.get('authorization')

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.split(' ')[1]
	}
	return null
}

signrouter.get('/userprofile/i', async (req: Request, res: Response, next) => {
	console.log(req)
	const token = getTokenFrom(req)
	const decodedToken = jwt.verify(token!, process.env.SECRET!) as UserType

	if (!decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid token' })
	}

	try {
		let user = await Signupuser.findById(decodedToken.id)
		res.status(200).json(user).end()
	} catch (err) {
		console.log(err)
	}
})

signrouter.get('/otherprofile/:id', async (req: Request, res: Response, next) => {
	const { id } = req.params
	console.log('id', id)
	try {
		let user = await Signupuser.findById(id)
		res.status(200).json(user).end()
	} catch (err) {
		res.status(400).json({ error: err })
	}
	next()
})

signrouter.put('/follow/:id', userAuthentication, async (req: RequestAuthType, res: Response) => {
	const { id } = req.params
	let followingId = req['auth']?.userId
	// console.log('request',req)

	try {
		let follower = await Signupuser.findByIdAndUpdate(followingId, { $push: { following: id } }, { new: true })
		let following = await Signupuser.findByIdAndUpdate(id, { $push: { followers: followingId } }, { new: true })
		res.status(201).json(follower).end()

	} catch (err) {
		console.log(err)
		res.status(400).json({ error: err })
	}
})
export interface RequestAuthType extends Request {
	auth?: { userId?: string }
}
//   declare module "express" { 
// 	export interface Request {
// 	  auth: any
// 	}
//   }
signrouter.put('/unfollow/:id', userAuthentication, async (req: RequestAuthType, res: Response) => {
	const { id } = req.params
	let followingId = req['auth']?.userId

	try {
		let follower = await Signupuser.findByIdAndUpdate(followingId, { $pull: { following: id } }, { new: true })
		let following = await Signupuser.findByIdAndUpdate(id, { $pull: { followers: followingId } }, { new: true })

		res.status(201).json(follower).end()
		console.log('follower', follower)
		console.log('following', following)
	} catch (err) {
		console.log(err)
		res.status(400).json({ error: err })
	}
})
export default signrouter
