import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'
import express, {Request, Response} from 'express'
export const signrouter = express.Router({
	strict: true,
})
import bcrypt from 'bcrypt'
import Signupuser from '../Schemas/Signupschema'
import Profile from '../Schemas/Profile'
import userAuthentication from '../middeware/jwtauthorization'
import {ReqAuthType, UserType} from '../types/userType'
import nodemailer from 'nodemailer'
import {MAIL_SETTINGS} from './mailsetting'
import config from './config'
// import transporter from `${nodemailer.createTransport(MAIL_SETTINGS)}`;
// export interface configType {
// 	secret_jwt?: String
// 	emailUser?: String
// 	emailPassword?: String
// }

// export type ReqAuthType = {auth: {userId: string}}

const sendResetPasswordMail = async (name: any, email: any, token: any) => {
	try {
		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true, // true for 465, false for other ports
			// requireTLS: true,
			auth: {
				user: config.emailUser, // generated ethereal user
				pass: config.emailPassword, // generated ethereal password
			},
		})

		let info = await transporter.sendMail({
			from: 'config.emailUser', // sender address
			to: email, // list of receivers
			subject: 'For Reset Password', // Subject line
			text: 'Hello world?', // plain text body
			html: '<b>Hello world?</b>' + name + 'Please copy the link and reset password', // html body
		})

		transporter.sendMail(info, function (err, info) {
			if (err) {
				console.log(err)
			} else {
				console.log('Mail has sended')
			}
		})
	} catch (err) {
		console.log(err)
	}
	// catch(err:any)=>{
	// // console.log(err)
	// }
}

signrouter.post('/signup', async (req: Request, res: Response) => {
	const {email, fullName, userName, password} = req.body
	console.log('reqBody', req.body)

	const userEmailExist = await Signupuser.findOne({email})
	const userNameExist = await Signupuser.findOne({fullName})
	console.log(userEmailExist)
	console.log(userNameExist)

	if (userEmailExist) {
		return res.status(409).json({error: 'User Email Already Exist'})
	}

	if (userNameExist) {
		return res.status(409).json({error: 'User Name Already Exist'})
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
	const {email, password} = req.body
	console.log('req', req.body)

	const user = await Signupuser.findOne({email})
	console.log('user', user)
	const passwordCorrect = await bcrypt.compare(password, user?.password!)
	console.log(passwordCorrect)

	if (!(user && passwordCorrect)) {
		return res.status(401).json({error: 'Invalid Password'})
	}
	const useForToken = {
		username: user.userName,
		id: user._id,
		profilePicture: user.profilePicture,
		isStorie: user.isStorie,
	}

	const token = jwt.sign(useForToken, process.env.SECRET!, {
		expiresIn: 600 * 600,
	})
	res.status(200).send({
		token,
		username: user.userName,
		userfullname: user.fullName,
		id: user._id,
		isStorie: user?.isStorie,
		userProfilePicture: user?.profilePicture,
	})
})

const getTokenFrom = (request: Request) => {
	const authorization = request.get('authorization')

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.split(' ')[1]
	}
	return null
}

signrouter.get('/userprofile/i', userAuthentication, async (req: Request, res: Response) => {
	let decodedToken = req['auth']?.userId

	try {
		let user = await Signupuser.findById(decodedToken)

		if (user) {
			return res.status(200).json(user)
		}
	} catch (err) {
		// console.log(''merr);
		res.status(400).json({err: err})
	}
})

signrouter.get('/otherprofile/:id', async (req: Request, res: Response) => {
	const {id} = req.params
	console.log('id', id)
	try {
		let user = await Signupuser.findById(id)
		res.status(200).json(user).end()
	} catch (err) {
		res.status(400).json({error: err})
	}
})

signrouter.put('/follow/:id', userAuthentication, async (req: RequestAuthType, res: Response) => {
	const {id} = req.params
	let followingId = req['auth']?.userId
	console.log('aryanid', id)
	console.log('rakshitid', followingId)

	try {
		let follower = await Signupuser.findByIdAndUpdate(followingId, {$push: {following: id}}, {new: true})
		let following = await Signupuser.findByIdAndUpdate(id, {$push: {followers: followingId}}, {new: true})
		res.status(201).json(follower).end()
	} catch (err) {
		console.log(err)
		res.status(400).json({error: err})
	}
})
export interface RequestAuthType extends Request {
	auth?: {userId?: string}
}
//   declare module "express" {
// 	export interface Request {
// 	  auth: any
// 	}
//   }
signrouter.put('/unfollow/:id', userAuthentication, async (req: RequestAuthType, res: Response) => {
	const {id} = req.params
	let followingId = req['auth']?.userId

	try {
		let follower = await Signupuser.findByIdAndUpdate(followingId, {$pull: {following: id}}, {new: true})
		let following = await Signupuser.findByIdAndUpdate(id, {$pull: {followers: followingId}}, {new: true})

		res.status(201).json(follower).end()
		console.log('follower', follower)
		console.log('following', following)
	} catch (err) {
		console.log(err)
		res.status(400).json({error: err})
	}
})

signrouter.get('/resetEmail/:email', async (req, res) => {
	const {email} = req.params
	console.log(email)
	const user = await Signupuser.findOne({email: email})
	if (!user) {
		return res.status(400).json({err: 'Email Does not Exist'})
	}
	if (user) {
		let otp = otpGenerator.generate(6, {upperCaseAlphabets: false, specialChars: false})
		console.log(otp)
		try {
			const user = await Signupuser.findOneAndUpdate({email: email}, {$set: {token: otp}})
			sendResetPasswordMail(user?.userName, user?.email, user?.password)
			res.status(200).send({success: true, msg: 'Please Check your inbox'})
		} catch (err) {
			console.log(err)
			res.status(400).send({success: false, msg: 'Request Failed'})
		}
	}
})

export default signrouter
