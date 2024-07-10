import jwt from 'jsonwebtoken'
import express, {Request, Response} from 'express'
export const conversationRouter = express.Router({
	strict: true,
})
import userAuthentication from '../middeware/jwtauthorization'
import Conversation from '../Models/ConversationSchema'
import Signupuser from '../Models/Signupschema'
export interface RequestAuthType extends Request {
	auth?: {userId?: string}
}

conversationRouter.post('/createConversation/:id', userAuthentication, async (req: RequestAuthType, res: Response) => {
	const {id} = req.params //otheruser
	let senderId = req['auth']?.userId // person who uses id auth

	let user = await Signupuser.findById(senderId)
	console.log('Signupuser', user)

	let conversation = new Conversation({
		chatMembers: [{userId: id, messangerId: senderId}],
		createdBy: `${user?.userName} created this chat`,
	})

	try {
		let userRoomExits = await Conversation.find({
			chatMembers: {
				$elemMatch: {
					userId: id,
					messangerId: senderId,
				},
			},
		})

		let userChatExits = await Conversation.find({
			chatMembers: {
				$elemMatch: {
					userId: senderId,
					messangerId: id,
				},
			},
		})
		console.log(userRoomExits)
		console.log(userChatExits)

		// let userChatRoom =await Conversation.find({
		//   chatMembers: {
		//     $elemMatch: {
		//       userId: senderId,
		//     },
		//   },
		// });

		if (userRoomExits.length > 0) {
			return res.status(401).json(userRoomExits)
		}
		if (userChatExits.length > 0) {
			return res.status(401).json(userRoomExits)
		}

		let savedConversation = await conversation.save()
		res.status(201).json(savedConversation)
	} catch (err) {
		console.log(err)
		res.status(400).json({error: err})
	}
})
conversationRouter.get('/getConversation/:id', userAuthentication, async (req: RequestAuthType, res: Response) => {
	const {id} = req.params
	let senderId = req['auth']?.userId

	try {
		// let savedConversation = await Conversation.find({
		//   "chatMembers.userId": id,

		// })
		let userRoomExits = await Conversation.find({
			chatMembers: {
				$elemMatch: {
					userId: id, //other user
					messangerId: senderId, //auth
				},
			},
		})
			.populate({
				path: 'chatMembers',
				populate: {
					path: 'userId',
					model: 'signupuser',
				},
			})
			.exec()

		let userChatExits = await Conversation.find({
			chatMembers: {
				$elemMatch: {
					userId: senderId, //auth
					messangerId: id, //otheruser
				},
			},
		})
			.populate({
				path: 'chatMembers',
				populate: {
					path: 'messangerId',
					model: 'signupuser',
				},
			})
			.exec()
		// let savedConversation1 = await Conversation.find({
		//   "chatMembers.messangerId": id,

		// });
		// console.log('SavedConversation',savedConversation)
		// console.log('SavedConversation1',savedConversation1)
		if (userRoomExits.length > 0) {
			return res.status(200).json(userRoomExits)
		}
		if (userChatExits.length > 0) {
			return res.status(200).json(userChatExits)
		}
	} catch (err) {
		res.status(400).json({error: err})
	}
})

conversationRouter.get('/getUserRoom', userAuthentication, async (req: RequestAuthType, res: Response) => {
	let userId = req['auth']?.userId

	try {
		let savedConversation = await Conversation.find({
			chatMembers: {
				$elemMatch: {
					messangerId: userId,
				},
			},
		})
			.populate({
				path: 'chatMembers',
				populate: {
					path: 'userId',
					model: 'signupuser',
				},
			})
			.exec()

		let savedConversation1 = await Conversation.find({
			chatMembers: {
				$elemMatch: {
					userId: userId,
				},
			},
		})
			.populate({
				path: 'chatMembers',
				populate: {
					path: 'messangerId',
					model: 'signupuser',
				},
			})
			.exec()
		let allConversation = savedConversation.concat(savedConversation1)

		if (savedConversation) {
			return res.status(200).json(allConversation)
		}
	} catch (err) {
		console.log(err)
		return res.status(400).json({error: err})
	}
})

conversationRouter.post('/savedMessages/:id', userAuthentication, async (req: any, res: Response) => {
	const {messageData} = req.body //otheruser
	console.log(req.body)
	const {id} = req.params
	console.log('my', messageData)

	try {
		let userRoomExits = await Conversation.findByIdAndUpdate(id, {$push: {messages: messageData}}, {new: true})
		// console.log("userrrooommmm", userRoomExits);
		res.status(201).json(userRoomExits)
	} catch (err) {
		console.log(err)
		res.status(400).json({error: err})
	}
})

conversationRouter.get('/getMessages/:id', userAuthentication, async (req: any, res: Response) => {
	const {id} = req.params
	try {
		let conversation = await Conversation.findById(id).populate('userId')
		res.status(200).json(conversation)
	} catch (err) {
		console.log(err)
		res.status(400).json({error: err})
	}
})

export default conversationRouter
