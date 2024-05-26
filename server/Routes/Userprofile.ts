import express, {Request, Response} from 'express'
import UserProfilePicture from '../Models/UserProfilePictureSchema'
import multer from 'multer'
import jwt from 'jsonwebtoken'
import userAuthentication from '../middeware/jwtauthorization'
import ProfileDetails from '../Models/ProfileDetailSchema'
import Profile from '../Models/Profile'
import Signupuser from '../Models/Signupschema'
import {UserType} from '../types/userType'
const profilerouter = express.Router({
	strict: true,
})
export interface RequestAuthType extends Request {
	auth?: {userId?: string}
}
profilerouter.post('/userdetails', userAuthentication, async (req: RequestAuthType, res: Response) => {
	const {bio, website, phoneNumber, gender, birthday} = req.body

	let id = req['auth']?.userId
	console.log(bio, website, phoneNumber, gender, birthday)
	const profiledetails = new ProfileDetails({
		bio: bio,
		website: website,
		phoneNumber: phoneNumber,
		gender: gender,
		birthday: birthday,
		user: id,
	})

	try {
		let savedprofileDetails = await profiledetails.save()
		console.log('savdedProfile', savedprofileDetails)
		res.status(201).json(savedprofileDetails).end()
	} catch (err) {
		res.status(400).send(err)
	}
})

profilerouter.get('/otherprofiles', async (req, res) => {
	let users = await Profile.find().populate('user').populate('userDetails')
	console.log(users)
	try {
		res.status(200).json(users)
	} catch (err) {
		res.status(400).end()
	}
})

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './Routes/profileimage')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '--' + file.originalname)
	},
})
const upload = multer({storage: fileStorageEngine})

const getTokenFrom = (request: Request) => {
	const authorization = request.get('authorization')

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.split(' ')[1]
	}
	return null
}

profilerouter.put('/profileimage', upload.single('image'), async (req, res) => {
	const token = getTokenFrom(req)

	const decodedToken = jwt.verify(token!, process.env.SECRET!) as UserType
	if (!decodedToken.id) {
		return res.status(401).json({error: 'token missing or invalid token'})
	}

	if (!req.body) {
		return res.status(400).json({error: 'content missing'})
	}
	const userId = decodedToken.id

	try {
		let deleteProfilePicture = await Signupuser.findByIdAndUpdate(userId, {$set: {profilePicture: []}})
		console.log('deletd', deleteProfilePicture)
		let profileUpdate = await Signupuser.findByIdAndUpdate(
			userId,
			{$push: {profilePicture: req['file']?.path}},
			{new: true}
		)
		res.status(201).json(profileUpdate).end()
	} catch (err) {
		console.log(err)
		res.status(400).json({err})
	}
})

profilerouter.get('/searchUser', async (req:any,res:any)=>{
  const {search}=req.query
  console.log(search)

  if(!search){
	return res.status(400).json({err:'No Search Found'})
  }

 
    try{
		
		let searchResults=await Signupuser.find({"userName":{$regex:".*"+search+".*",$options:"i"}})
	    console.log(searchResults)
		return res.status(200).json(searchResults)
	}
	catch(err){
	return res.status(400).json({err:'No User Found'})

	}
})

export default profilerouter
