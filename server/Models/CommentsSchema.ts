import mongoose from 'mongoose';

const Comments = new mongoose.Schema({
	commentedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'signupuser',
	},
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'useruploads',
	},
	comment: {
		type: String,
		ref: 'signupuser',
	},
	likedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'signupuser',
	},
	reply: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'signupuser',
	},
})

Comments.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

process.setMaxListeners(0)

export default mongoose.model('comments', Comments)
