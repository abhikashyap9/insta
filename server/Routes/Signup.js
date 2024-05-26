"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signrouter = express_1.default.Router({
    strict: true,
});
const SignupRoutes_1 = require("../Controller/SignupRoutes");
const jwtauthorization_1 = __importDefault(require("../middeware/jwtauthorization"));
// import transporter from `${nodemailer.createTransport(MAIL_SETTINGS)}`;
// export interface configType {
// 	secret_jwt?: String
// 	emailUser?: String
// 	emailPassword?: String
// }
// export type ReqAuthType = {auth: {userId: string}}
signrouter.post('/signup', SignupRoutes_1.SignUpRoutes.Signup);
signrouter.post('/login', SignupRoutes_1.SignUpRoutes.Login);
signrouter.get('/userprofile', SignupRoutes_1.SignUpRoutes.UserProfile);
signrouter.get('/otherprofile/:id', SignupRoutes_1.SignUpRoutes.OtherProfile);
signrouter.put('/follow/:id', jwtauthorization_1.default, SignupRoutes_1.SignUpRoutes.FollowUser);
signrouter.put('/unfollow/:id', jwtauthorization_1.default, SignupRoutes_1.SignUpRoutes.UnfollowUser);
signrouter.post('/resetPassword', SignupRoutes_1.SignUpRoutes.ResetEmail);
signrouter.get('/resetEmail/:email', SignupRoutes_1.SignUpRoutes.ResetPassowrd);
// signrouter.get('/userprofile/i', userAuthentication, async (req: Request, res: Response) => {
// })
// signrouter.get('/otherprofile/:id', async (req: Request, res: Response) => {
// 	const {id} = req.params
// 	console.log('id', id)
// 	try {
// 		let user = await Signupuser.findById(id)
// 		res.status(200).json(user).end()
// 	} catch (err) {
// 		res.status(400).json({error: err})
// 	}
// })
// signrouter.put('/follow/:id', userAuthentication, async (req: RequestAuthType, res: Response) => {
// 	const {id} = req.params
// 	let followingId = req['auth']?.userId
// 	console.log('aryanid', id)
// 	console.log('rakshitid', followingId)
// 	try {
// 		let follower = await Signupuser.findByIdAndUpdate(followingId, {$push: {following: id}}, {new: true})
// 		let following = await Signupuser.findByIdAndUpdate(id, {$push: {followers: followingId}}, {new: true})
// 		res.status(201).json(follower).end()
// 	} catch (err) {
// 		console.log(err)
// 		res.status(400).json({error: err})
// 	}
// })
// export interface RequestAuthType extends Request {
// 	auth?: {userId?: string}
// }
// //   declare module "express" {
// // 	export interface Request {
// // 	  auth: any
// // 	}
// //   }
// signrouter.put('/unfollow/:id', userAuthentication, async (req: RequestAuthType, res: Response) => {
// 	const {id} = req.params
// 	let followingId = req['auth']?.userId
// 	try {
// 		let follower = await Signupuser.findByIdAndUpdate(followingId, {$pull: {following: id}}, {new: true})
// 		let following = await Signupuser.findByIdAndUpdate(id, {$pull: {followers: followingId}}, {new: true})
// 		res.status(201).json(follower).end()
// 		console.log('follower', follower)
// 		console.log('following', following)
// 	} catch (err) {
// 		console.log(err)
// 		res.status(400).json({error: err})
// 	}
// })
// signrouter.post('/resetPassword',async(req:any,res:any)=>{
// 	const token=req.query.token;
// 		console.log(token)
// 		const tokenData=await Signupuser.findOne({password:token})
// 		console.log(tokenData)
// 		const {password}=req.body
// 		console.log(password)
// 		console.log('password',req)
// 	try{
// 		if(tokenData){
// 			const saltRounds = 10
// 			const hashedPassword = await bcrypt.hash(password, saltRounds)
// 			const userData=await Signupuser.findByIdAndUpdate({_id:tokenData?._id},{$set:{password:hashedPassword,token:''}},{new:true})
// 			console.log(userData)
// 			return res.status(200).send({success:true,msg:"User Password has been reset"})
// 		}
// 		else{
// 		return res.status(400).send({success:false,msg:"The link has been expired"})
// 		}
// 	}
// 	catch(err){
// 		return res.status(400).send({err})
// 	}
// })
// signrouter.get('/resetEmail/:email', async (req, res) => {
// 	const {email} = req.params
// 	console.log('EMail',email)
// 	const user = await Signupuser.findOne({email: email})
// 	if (!user) {
// 		return res.status(400).json({err: 'Email Does not Exist'})
// 	}
// 	if (user) {
// 		let otp = otpGenerator.generate(6, {upperCaseAlphabets: false, specialChars: false})
// 		console.log(typeof otp)
// 		try {
// 			const user = await Signupuser.findOneAndUpdate({
// 				"email":email 
// 			  },
// 			  {
// 				"$set": {
// 				  "token": otp
// 				}
// 			  })
// 			console.log(user)
// 			sendResetPasswordMail(user?.userName, user?.email, user?.password)
// 			res.status(200).send({success: true, msg: 'Please Check your inbox',data:user})
// 		} catch (err) {
// 			console.log(err)
// 			res.status(400).send({success: false, msg: 'Request Failed'})
// 		}
// 	}
// })
exports.default = signrouter;
