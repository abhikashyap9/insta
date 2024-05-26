const mongoose = require('mongoose')
// const { string } = require('yargs')

const UserPost = new mongoose.Schema({
	userupload: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'useruploads',
	},
	likedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'signupuser',
	},
	comments: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'signupuser',
		comment: {
			type: String,
		},
	},
	// {
	//     type:String
	// },
})

UserPost.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject._v
	},
})

module.exports = mongoose.model('userpost', UserPost)
