import jwt from 'jsonwebtoken'
import express, { Request, Response } from 'express'
import multer from 'multer'
import UserUploads from '../Schemas/UserUploadSchema'
import userAuthentication from '../middeware/jwtauthorization'
import { UserType } from '../types/userType'
const useruploadsrouter = express.Router({
	strict: true,
})
// const Profile =require('../Schemas/Signupschema')

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './Routes/image')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '--' + file.originalname)
	},
})
const upload = multer({ storage: fileStorageEngine })

const getTokenFrom = (request) => {
	const authorization = request.get('authorization')

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.split(' ')[1]
	}
	return null
}

useruploadsrouter.post('/single', upload.single('image'), async (req, res) => {
	const { caption, location } = req.body

	const token = getTokenFrom(req)

	const decodedToken = jwt.verify(token!, process.env.SECRET!) as UserType
	console.log('decoded', decodedToken)
	if (!decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid token' })
	}

	if (!req.body) {
		return res.status(400).json({ error: 'content missing' })
	}

	const useruploads = new UserUploads({
		userId: decodedToken.id,
		caption: caption,
		location: location,
		image: req['file']?.path,
	})

	try {
		let savedUser = await useruploads.save()
		res.status(201).json(savedUser).end()
	} catch (err) {
		console.log(err)
		res.status(400).json({ err })
	}
})

useruploadsrouter.get('/userpost', async (req, res) => {
	let uploads = await UserUploads.find().populate('userId', 'userName profilePicture')
	console.log(uploads)
	//    .populate('commentedBy')
	//    .exec()
	// let profileImage = await UserUploads.aggregate([
	//     {$lookup:{
	//     from:'userprofilepicture',
	//     localField:'userId',
	//     foreignField:'userId',
	//     as:'anything'
	// }}])
	// console.log(profileImage)
	//    .populate()
	//    .populate('profilePicture','image')

	// let userId = await UserProfilePicture.findById()
	if (uploads) {
		console.log(uploads)
		res.json(uploads).status(200)
	} else {
		res.status(400).json('error')
	}
})

useruploadsrouter.put('/likedby/:id', userAuthentication, async (req, res) => {
	const { id } = req.params
	console.log(id)
	let userId = req['auth']?.userId
	console.log(userId)
	try {
		let post = await UserUploads.findByIdAndUpdate(id, { likedBy: userId }, { new: true })
		res.status(201).json(post).end()
	} catch (err) {
		res.status(400).json({ error: err })
	}
})

useruploadsrouter.put('/unlikedby/:id', userAuthentication, async (req, res) => {
	const { id } = req.params
	console.log(id)
	let userId = req['auth']?.userId
	console.log(userId)
	try {
		let post = await UserUploads.findByIdAndUpdate(id, { $pull: { likedBy: userId } }, { new: true })
		res.status(204).json(post).end()
	} catch (err) {
		res.status(400).json({ error: err })
	}
})

useruploadsrouter.put('/addcomment/:id', userAuthentication, async (req, res) => {
	const { id } = req.params
	console.log(id)
	let userId = req['auth']?.userId
	console.log(userId)
	const { comment } = req.body
	console.log(comment)
	let comments = {
		comments: comment,
		postedBy: userId,
	}

	try {
		let posted = await UserUploads.findByIdAndUpdate(id, { $push: { comment: comments } }, { new: true })
			.populate('comment.postedBy', '_id userName profilePicture')
			.exec()
		console.log('post', posted)
		res.json(posted).end()
	} catch (err) {
		res.status(400).json({ error: err })
	}
})

export default useruploadsrouter
