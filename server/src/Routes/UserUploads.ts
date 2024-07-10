import jwt from 'jsonwebtoken'
import express, {Request, Response} from 'express'
import multer from 'multer'
import UserUploads from '../Models/UserUploadSchema'
import CommentReplies from '../Models/RepliesSchema'

import UserVideo from '../Models/UserVideosSchema'

import userAuthentication from '../middeware/jwtauthorization'
import {UserType} from '../types/userType'
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
const upload = multer({storage: fileStorageEngine})

const getTokenFrom = (request: Request) => {
	const authorization = request.get('authorization')

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.split(' ')[1]
	}
	return null
}

useruploadsrouter.post('/single', upload.single('image'), async (req, res) => {
	const {caption, location} = req.body

	const token = getTokenFrom(req)
	console.log(token)

	const decodedToken = jwt.verify(token!, process.env.SECRET!) as UserType
	console.log('decoded', decodedToken)
	if (!decodedToken.id) {
		return res.status(401).json({error: 'token missing or invalid token'})
	}

	if (!req.body) {
		return res.status(400).json({error: 'content missing'})
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
		res.status(400).json({err})
	}
})
export interface RequestAuthType extends Request {
	auth?: {userId?: string}
}
useruploadsrouter.get('/userpost', async (req, res) => {
	let uploads = await UserUploads.find()
		.populate('userId', 'userName profilePicture')
		.populate('comment.postedBy')
		.populate('likedBy')
		.populate('comment.replies.postedBy')
	//
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

useruploadsrouter.put('/likedby/:id', userAuthentication, async (req: RequestAuthType, res) => {
	const {id} = req.params
	console.log(id)
	let userId = req['auth']?.userId
	console.log(userId)
	try {
		let post = await UserUploads.findByIdAndUpdate(id, {$push: {likedBy: userId}}, {new: true})
		res.status(201).json(post).end()
	} catch (err) {
		res.status(400).json({error: err})
	}
})

useruploadsrouter.put('/unlikedby/:id', userAuthentication, async (req: RequestAuthType, res) => {
	const {id} = req.params
	console.log(id)
	let userId = req['auth']?.userId
	console.log(userId)
	try {
		let post = await UserUploads.findByIdAndUpdate(id, {$pull: {likedBy: userId}}, {new: true})
		res.status(204).json(post).end()
	} catch (err) {
		res.status(400).json({error: err})
	}
})

useruploadsrouter.put('/addcomment/:id', userAuthentication, async (req: RequestAuthType, res) => {
	const {id} = req.params
	console.log(id)
	let userId = req['auth']?.userId
	console.log(userId)
	const {comment} = req.body
	console.log(comment)
	let comments = {
		comments: comment,
		postedBy: userId,
	}

	try {
		let posted = await UserUploads.findByIdAndUpdate(id, {$push: {comment: comments}}, {new: true})
			.populate('comment.postedBy', '_id userName profilePicture')
			.exec()
		console.log('post', posted)
		res.json(posted).end()
	} catch (err) {
		res.status(400).json({error: err})
	}
})

useruploadsrouter.put('/addcommentreply/:id', userAuthentication, async (req: RequestAuthType, res) => {
	const {id} = req.params
	console.log(id)
	let userId = req['auth']?.userId
	console.log(userId)
	const {comment, postId} = req.body
	console.log('BBBB', comment)
	const generateMongoObjectId = () => {
		const thousand = 1000
		const sixteen = 16
		const timestamp = ((new Date().getTime() / thousand) | 0).toString(sixteen)

		return (
			timestamp +
			'xxxxxxxxxxxxxxxx'
				.replace(/[x]/g, function () {
					return ((Math.random() * sixteen) | 0).toString(sixteen)
				})
				.toLowerCase()
		)
	}
	let uniqueId = generateMongoObjectId()

	let commentreplies = {
		reply: comment,
		postedBy: userId,
		id: uniqueId,
	}

	try {
		let posted = await UserUploads.updateOne(
			{
				id: postId,
				'comment._id': id,
			},
			{
				$push: {
					'comment.$.replies': commentreplies,
				},
			},
			{new: true}
		)

		// .populate('comment.postedBy', '_id userName profilePicture')

		console.log('post', posted)
		return res.status(200).json(posted)
	} catch (err) {
		return res.status(400).json({error: err})
	}
})

useruploadsrouter.delete('/deleteComment/:id', userAuthentication, async (req: RequestAuthType, res) => {
	const {id} = req.params
	const {postId} = req.query

	console.log('id', id)
	let userId = req['auth']?.userId

	console.log('userId', userId)
	console.log('postId', postId)
	try {
		let deleted = await UserUploads.updateOne(
			{
				_id: postId,
			},
			{
				$pull: {
					comment: {
						_id: id,
					},
				},
			}
		)
		console.log(deleted)
		return res.status(204).json(deleted)
	} catch (err) {
		return res.status(404).json({error: err})
	}
})

useruploadsrouter.delete('/deleteCommentReply/:id', userAuthentication, async (req: RequestAuthType, res) => {
	const {id} = req.params
	const {postId} = req.query

	console.log('id', id)
	let userId = req['auth']?.userId
	console.log('userId', userId)
	console.log('postId', postId)
	try {
		let deleted = await UserUploads.findOneAndUpdate(
			{comment: {$elemMatch: {'replies.id': id}}},
			{$pull: {'comment.$.replies': {id: id}}}
		)
		console.log(deleted)
		return res.status(204).json(deleted)
	} catch (err) {
		return res.status(404).json({error: err})
	}
})

useruploadsrouter.get('/userPosts', userAuthentication, async (req, res) => {
	let userId = req['auth']?.userId

	let uploads = await UserUploads.find({userId: userId})
		.populate('userId', 'userName profilePicture')
		.populate('comment.postedBy')
		.populate('likedBy')
		.populate('comment.replies.postedBy')
	//
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

useruploadsrouter.get('/otherUsersPosts/:id', async (req, res) => {
	let {id} = req.params

	let uploads = await UserUploads.find({userId: id})
		.populate('userId', 'userName profilePicture')
		.populate('comment.postedBy')
		.populate('likedBy')
		.populate('comment.replies.postedBy')
	//
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

export default useruploadsrouter
