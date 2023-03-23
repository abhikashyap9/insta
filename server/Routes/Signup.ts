import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator';
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
// import transporter from `${nodemailer.createTransport(MAIL_SETTINGS)}`;

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
		profilePicture:user.profilePicture,
		isStorie:user.isStorie
	}

	const token = jwt.sign(useForToken, process.env.SECRET!, {
		expiresIn: 600 * 600,
	})
	res.status(200).send({
		token,
		username: user.userName,
		userfullname: user.fullName,
		id: user._id,
		isStorie:user?.isStorie,
		userProfilePicture:user?.profilePicture
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
	console.log('aryanid',id)
	console.log('rakshitid',followingId)



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

signrouter.post('/resetEmail/:email',userAuthentication,async(req,res)=>{
	const {email}=req.params
	const user = await User.findOne({"email":email})
	if(!user){
		return res.status(400).json({err:"Email Does not Exist"})
	}
	if(user){
        // try {
		// 	let info = await transporter.sendMail({
		// 	  from: MAIL_SETTINGS.auth.user,
		// 	  to: params.to, // list of receivers
		// 	  subject: 'Hello ✔', // Subject line
		// 	  html: `
		// 	  <div
		// 		class="container"
		// 		style="max-width: 90%; margin: auto; padding-top: 20px"
		// 	  >
		// 		<h2>Welcome to the club.</h2>
		// 		<h4>You are officially In ✔</h4>
		// 		<p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
		// 		<h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
		// 		<p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
		// 	  </div>
		// 	`,
		// 	});
		// 	return info;
		//   } catch (error) {
		// 	console.log(error);
		// 	return false;
		//   }
	}

})

export default signrouter
