import mongoose from 'mongoose'

const SavedMessages = new mongoose.Schema({
	messages: {
		type: Array,
	},
	chat: {
		type: String,
	},
})

SavedMessages.set('toJSON', {
	transform: (document: any, returnedObject: any) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject._vs
	},
})
export default mongoose.model('savedmessages', SavedMessages)
